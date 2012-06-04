var 
// 100865637751900889493360573523580351244825875925872349940572720152740244701523
prime = "deffed876c7125dbfa8caed733cd7d03c2cd4336c6b748aac0b3f5a37e3f4153",
// 43764076406474720543067364425888944917267787872751525387965086938403979940847
pubKey = "60c196e5dc49ebe98663eeeb6fea0ec0550cbd567d733fc024997d31db6453ef",
// 37341428768311708519895022617468414074813802428796398161668605148158681044322
privKey = "528e7feca0f7bbbbc03c18216617e63e3207b8072802bd75cd1e9fddc43a5562",
// 65772852572080955813314734417728231668156185229568225952323655241976835080565
clientPublicKey = "916a1d851610fbd351d88be52b0969a0cc60e89507c2fcb08276401dce5a0175";


var crypto = require('crypto');

var serverDH = crypto.createDiffieHellman(prime,'hex');
serverDH.setPrivateKey(privKey,'hex');
serverDH.setPublicKey(pubKey,'hex');


var secret = serverDH.computeSecret(clientPublicKey,'hex','hex');	// is: 04d6461ce9edab059752aabd42941829ae4405ca0a0a8a8da323723339a5ae75

console.log(secret);
