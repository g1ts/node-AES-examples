var connect = require('connect'),
	urlparser = require('url'),
	http = require('http'),
	crypto = require('crypto');

var _key = randomString(16);

var api = function(req, res, next){
	url = req.urlp = urlparser.parse(req.url, true);

	if(url.pathname == "/key/get"){
		res.end(JSON.stringify({success: true, key:_key}));
		return;
	}
	if(url.pathname == "/key/set"){
		if(url.query.key){
			_key = decodeURIComponent(url.query.key);
			res.end(JSON.stringify({success: true, key:_key}));
		}
		return;
	}
	if(url.pathname == "/reflect"){
		if(url.query.data){
			var data = decodeURIComponent(url.query.data);
			data = decrypt(data, _key);
			data = 'data obtained: "'+data+'"';
			data = {data: encrypt(data, _key), success: true};
			res.end(JSON.stringify(data));
		}
		return;
	}
	res.writeHead(404);
	res.end(JSON.stringify('Path not found...'));
	return;
}

var app = connect()
  .use(connect.favicon())
  .use(connect.logger('dev'))
  .use(connect.static('public'))
  .use(api)
  .listen(3000);


function decrypt(data, pass){
	var pass = new Buffer(pass,'utf8');
	var data = new Buffer(data, 'base64');
	var salt = '';
	if(data.toString('utf8',0,8) == 'Salted__'){
		salt = new Buffer(8);
		data.copy(salt,0,8,16);
		var b = new Buffer(data.length-16);
		data.copy(b,0,16);
		data = b;
	}
	var opt = genKeyAndIv(pass, salt);
	var decipher = crypto.createDecipheriv('aes-256-cbc',opt.key.toString('binary'),opt.iv.toString('binary'));
	data = decipher.update(data,'binary') + decipher.final('binary');
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
	var encData = 'Salted__'+salt+cipher.update(data, 'binary') + cipher.final('binary');
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


