var crypto = require('crypto');


if(process.argv.length < 4 || process.argv.length > 4 ){
	var fname = process.argv[1].split('/');
	fname = fname[fname.length-1];
	toLog("\n\tusage:\n\t\t"+process.argv[0]+" "+fname+" <text> <pass>\n");
	process.exit();
}

var data = process.argv[2];
var pass = process.argv[3];

toLog("");
toLog("\tdata:\t"+data+"\t(hex: "+new Buffer(data,'utf8').toString('hex')+")");
toLog("\tpass:\t"+pass+"\t(hex: "+new Buffer(pass,'utf8').toString('hex')+")");
toLog("");

var encData = encrypt(data, pass);
toLog("encrypted data (base64): "+encData);
var decData = decrypt(encData, pass);
toLog("decrypted data: "+decData);

function decrypt(data, pass){
	var pass = new Buffer(pass,'utf8');
	var data = new Buffer(data, 'base64');
	var salt = '';
	if(data.toString().indexOf('Salted__') == 0){
		salt = new Buffer(8);
		data.copy(salt,0,8,16);
		var b = new Buffer(data.length-16);
		data.copy(b,0,16);
		data = b;
	}
	var opt = genKeyAndIv(pass, salt);
	var decipher = crypto.createDecipheriv('aes-256-cbc',opt.key.toString('binary'),opt.iv.toString('binary'));
	data = decipher.update(data,'binary')+decipher.final('binary');
	if(data.charCodeAt(data.length-1) == 10){
		data = data.substr(0,data.length-1);
	}
	return data;
}

function encrypt(data, key){
	var data = data;
	if(data.charCodeAt(data.length-1) != 10){
		data+=String.fromCharCode(10);
	}
	var salt = randomString(8);
	var cipher = crypto.createCipher('aes-256-cbc',key+salt);
	var encData = 'Salted__'+salt+cipher.update(data, 'binary');
	encData += cipher.final('binary');
	encData = new Buffer(encData,'binary').toString('base64');
	return encData;
}


function genKeyAndIv(pass, salt){
	var h = crypto.createHash('md5').update(pass,'binary').update(salt,'binary').digest('binary');
	var h1 = crypto.createHash('md5').update(h,'binary').update(pass,'binary').update(salt,'binary').digest('binary');
	var h2 = crypto.createHash('md5').update(h1,'binary').update(pass,'binary').update(salt,'binary').digest('binary');
	return {key: new Buffer(h+h1,'binary'), iv: new Buffer(h2,'binary')};
}

function randomString(l) {
        var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz'.split('');
        var l = l || Math.floor(Math.random() * chars.length);
        var str = ''; 
        for (var i = 0; i < l; i++) {
                str += chars[Math.floor(Math.random() * chars.length)];
        }   
        return str;
}

function toLog(text){
	console.log(text);
}
