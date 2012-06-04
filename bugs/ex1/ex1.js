// tested in node v0.6.11

var crypto = require("crypto");

var server = crypto.createDiffieHellman(256);
var prime = server.getPrime();
var c = 0;

do {
	c++;
	var alice = crypto.createDiffieHellman(prime);
	alice.generateKeys();
	var alicePub = alice.getPublicKey();

	var bob = crypto.createDiffieHellman(prime);
	bob.generateKeys();
	var bobPub = bob.getPublicKey();

	var bobAliceSecret = new Buffer(bob.computeSecret(alicePub)).toString('hex');
	var aliceBobSecret = new Buffer(alice.computeSecret(bobPub)).toString('hex');

} while (bobAliceSecret == aliceBobSecret)
console.log('c: '+c);
console.log('A: '+bobAliceSecret);
console.log('B: '+aliceBobSecret);
