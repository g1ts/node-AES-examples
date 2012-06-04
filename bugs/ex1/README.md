IMHO bug in node_crypto.cc in line 3942

	    int dataSize = DH_size(diffieHellman->dh);
	    char* data = new char[dataSize];
	
	    int size = DH_compute_key(reinterpret_cast<unsigned char*>(data),
	      key, diffieHellman->dh);

(ComputeSecret: https://github.com/joyent/node/blob/master/src/node_crypto.cc#L3897)

(DH_generate_key: http://www.openssl.org/docs/crypto/DH_generate_key.html)




