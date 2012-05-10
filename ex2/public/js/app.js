var bits = 256;
var aes = new pidCrypt.AES.CBC();


function initApp(){
	loadKey();
	$('#setKeyBtn').click(setKey);
	$('#sendData').click(sendData);
	$('#srcData').change(encodeSrcData);
	$('#srcData').keypress(encodeSrcData);
}



function sendData(){
	var data = $('#encSrcData').val();
	data = encodeURIComponent(data);
	$.getJSON('/reflect?data='+data, function(resp) {
		if(resp && resp.success && resp.data){
			$('#encDataFromServer').val(resp.data);
			decodeDataFromServer();
		}
	});
}

function loadKey(){
	$.getJSON('/key/get', function(resp) {
		if(resp && resp.success && resp.key){
			$('#key').text(resp.key);
			encodeSrcData();
		}
	});
}

function setKey(){
	var key = $('#newKey').val();
	$.getJSON('/key/set?key='+key, function(resp) {
		if(resp && resp.success && resp.key){
			$('#key').text(resp.key);
			encodeSrcData();
		}
	});
}

function decodeDataFromServer(){
	var data = $('#encDataFromServer').val();
	var key = $('#key').text();
	$('#decDataFromServer').val(decrypt(data, key));
}

function encodeSrcData(){
	var data = $('#srcData').val();
	var key = $('#key').text();
	$('#encSrcData').val(encrypt(data, key));
}


function decrypt(data, key){
	return aes.decryptText(data,key,{nBits:bits});
}

function encrypt(data, key){
	return aes.encryptText(data,key,{nBits:bits});
}
