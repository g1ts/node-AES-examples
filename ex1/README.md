About this demo
=================

This demo illustrates AES encryption/decryption on node by using it's crypto module.

NodeJS demo running:

	`node ex1.js <text> <pass>`
	or
	`node ex1_mini.js <text> <pass>`

OpenSSL equivalent:

	`echo '<text>' | openssl enc -aes-256-cbc -p -a -pass pass:<pass>`
	(for example: echo 'text' | openssl enc -aes-256-cbc -p -a -pass pass:p)
	
	`echo '<encrypted data (in base64)>' | openssl enc -aes-256-cbc -p -a -d -pass pass:<pass>`
	(for example: echo 'U2FsdGVkX19WG8r7Iy74zv5dCt6L8pB9d7a5hAn+0Ks=' | openssl enc -aes-256-cbc -p -a -d -pass pass:p)

Example of the output data:

	$ node demo.js "long text" myPasZw0D
	
		data:	long text	(hex: 6c6f6e672074657874)
		pass:	myPasZw0D	(hex: 6d795061735a773044)
	
		--- encrypt ---
	salt:				eKMSNJrv (hex: 654b4d534e4a7276)
	encrypted data (base64):	U2FsdGVkX19lS01TTkpydtZDP2XxCl/nDrgLzIbyb/c=
	
	you can decrypt it using openssl: echo 'U2FsdGVkX19lS01TTkpydtZDP2XxCl/nDrgLzIbyb/c=' | openssl enc -aes-256-cbc -a -d -p -pass pass:myPasZw0D
		---------------
	
		--- decrypt ---
	encrypted data (base64):	U2FsdGVkX19lS01TTkpydtZDP2XxCl/nDrgLzIbyb/c=
	salt from encrypted data:	eKMSNJrv (hex: 654b4d534e4a7276)
	iv from encrypted data (hex):	7f74e87b2610cced6e19a0b6692e1e2c
	key from encrypted data (hex):	3b761b5f50b1a5c6bb50ff631257c31ff251f93bf41de540ece20faa4a000bfb
	decrypted data (base64):	long text
		---------------
