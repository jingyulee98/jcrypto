(function() {
    'use strict';

    var fs = require('fs'),
        esprima = require('esprima'),
        escodegen = require('escodegen'),
        mangle = require('./mangler.js'),
        wrapper = require('./wrapper.js'),
        path = require('path');

    var aes = {};

    aes.sBox =  [
        0x63, 0x7c, 0x77, 0x7b, 0xf2, 0x6b, 0x6f, 0xc5, 0x30, 0x01, 0x67, 0x2b, 0xfe, 0xd7, 0xab, 0x76,
        0xca, 0x82, 0xc9, 0x7d, 0xfa, 0x59, 0x47, 0xf0, 0xad, 0xd4, 0xa2, 0xaf, 0x9c, 0xa4, 0x72, 0xc0,
        0xb7, 0xfd, 0x93, 0x26, 0x36, 0x3f, 0xf7, 0xcc, 0x34, 0xa5, 0xe5, 0xf1, 0x71, 0xd8, 0x31, 0x15,
        0x04, 0xc7, 0x23, 0xc3, 0x18, 0x96, 0x05, 0x9a, 0x07, 0x12, 0x80, 0xe2, 0xeb, 0x27, 0xb2, 0x75,
        0x09, 0x83, 0x2c, 0x1a, 0x1b, 0x6e, 0x5a, 0xa0, 0x52, 0x3b, 0xd6, 0xb3, 0x29, 0xe3, 0x2f, 0x84,
        0x53, 0xd1, 0x00, 0xed, 0x20, 0xfc, 0xb1, 0x5b, 0x6a, 0xcb, 0xbe, 0x39, 0x4a, 0x4c, 0x58, 0xcf,
        0xd0, 0xef, 0xaa, 0xfb, 0x43, 0x4d, 0x33, 0x85, 0x45, 0xf9, 0x02, 0x7f, 0x50, 0x3c, 0x9f, 0xa8,
        0x51, 0xa3, 0x40, 0x8f, 0x92, 0x9d, 0x38, 0xf5, 0xbc, 0xb6, 0xda, 0x21, 0x10, 0xff, 0xf3, 0xd2,
        0xcd, 0x0c, 0x13, 0xec, 0x5f, 0x97, 0x44, 0x17, 0xc4, 0xa7, 0x7e, 0x3d, 0x64, 0x5d, 0x19, 0x73,
        0x60, 0x81, 0x4f, 0xdc, 0x22, 0x2a, 0x90, 0x88, 0x46, 0xee, 0xb8, 0x14, 0xde, 0x5e, 0x0b, 0xdb,
        0xe0, 0x32, 0x3a, 0x0a, 0x49, 0x06, 0x24, 0x5c, 0xc2, 0xd3, 0xac, 0x62, 0x91, 0x95, 0xe4, 0x79,
        0xe7, 0xc8, 0x37, 0x6d, 0x8d, 0xd5, 0x4e, 0xa9, 0x6c, 0x56, 0xf4, 0xea, 0x65, 0x7a, 0xae, 0x08,
        0xba, 0x78, 0x25, 0x2e, 0x1c, 0xa6, 0xb4, 0xc6, 0xe8, 0xdd, 0x74, 0x1f, 0x4b, 0xbd, 0x8b, 0x8a,
        0x70, 0x3e, 0xb5, 0x66, 0x48, 0x03, 0xf6, 0x0e, 0x61, 0x35, 0x57, 0xb9, 0x86, 0xc1, 0x1d, 0x9e,
        0xe1, 0xf8, 0x98, 0x11, 0x69, 0xd9, 0x8e, 0x94, 0x9b, 0x1e, 0x87, 0xe9, 0xce, 0x55, 0x28, 0xdf,
        0x8c, 0xa1, 0x89, 0x0d, 0xbf, 0xe6, 0x42, 0x68, 0x41, 0x99, 0x2d, 0x0f, 0xb0, 0x54, 0xbb, 0x16
    ];

    // rCon is Round Constant used for the Key Expansion [1st col is 2^(r-1) in GF(2^8)] [§5.2]
    aes.rCon = [
        [0x00, 0x00, 0x00, 0x00],
        [0x01, 0x00, 0x00, 0x00],
        [0x02, 0x00, 0x00, 0x00],
        [0x04, 0x00, 0x00, 0x00],
        [0x08, 0x00, 0x00, 0x00],
        [0x10, 0x00, 0x00, 0x00],
        [0x20, 0x00, 0x00, 0x00],
        [0x40, 0x00, 0x00, 0x00],
        [0x80, 0x00, 0x00, 0x00],
        [0x1b, 0x00, 0x00, 0x00],
        [0x36, 0x00, 0x00, 0x00]
    ];


    // Tables for field multiplication in AES GF
    aes.multGF = [];

    aes.multGF[2] = [
        0x00, 0x02, 0x04, 0x06, 0x08, 0x0a, 0x0c, 0x0e, 0x10, 0x12, 0x14, 0x16, 0x18, 0x1a, 0x1c, 0x1e,
        0x20, 0x22, 0x24, 0x26, 0x28, 0x2a, 0x2c, 0x2e, 0x30, 0x32, 0x34, 0x36, 0x38, 0x3a, 0x3c, 0x3e,
        0x40, 0x42, 0x44, 0x46, 0x48, 0x4a, 0x4c, 0x4e, 0x50, 0x52, 0x54, 0x56, 0x58, 0x5a, 0x5c, 0x5e,
        0x60, 0x62, 0x64, 0x66, 0x68, 0x6a, 0x6c, 0x6e, 0x70, 0x72, 0x74, 0x76, 0x78, 0x7a, 0x7c, 0x7e,
        0x80, 0x82, 0x84, 0x86, 0x88, 0x8a, 0x8c, 0x8e, 0x90, 0x92, 0x94, 0x96, 0x98, 0x9a, 0x9c, 0x9e,
        0xa0, 0xa2, 0xa4, 0xa6, 0xa8, 0xaa, 0xac, 0xae, 0xb0, 0xb2, 0xb4, 0xb6, 0xb8, 0xba, 0xbc, 0xbe,
        0xc0, 0xc2, 0xc4, 0xc6, 0xc8, 0xca, 0xcc, 0xce, 0xd0, 0xd2, 0xd4, 0xd6, 0xd8, 0xda, 0xdc, 0xde,
        0xe0, 0xe2, 0xe4, 0xe6, 0xe8, 0xea, 0xec, 0xee, 0xf0, 0xf2, 0xf4, 0xf6, 0xf8, 0xfa, 0xfc, 0xfe,
        0x1b, 0x19, 0x1f, 0x1d, 0x13, 0x11, 0x17, 0x15, 0x0b, 0x09, 0x0f, 0x0d, 0x03, 0x01, 0x07, 0x05,
        0x3b, 0x39, 0x3f, 0x3d, 0x33, 0x31, 0x37, 0x35, 0x2b, 0x29, 0x2f, 0x2d, 0x23, 0x21, 0x27, 0x25,
        0x5b, 0x59, 0x5f, 0x5d, 0x53, 0x51, 0x57, 0x55, 0x4b, 0x49, 0x4f, 0x4d, 0x43, 0x41, 0x47, 0x45,
        0x7b, 0x79, 0x7f, 0x7d, 0x73, 0x71, 0x77, 0x75, 0x6b, 0x69, 0x6f, 0x6d, 0x63, 0x61, 0x67, 0x65,
        0x9b, 0x99, 0x9f, 0x9d, 0x93, 0x91, 0x97, 0x95, 0x8b, 0x89, 0x8f, 0x8d, 0x83, 0x81, 0x87, 0x85,
        0xbb, 0xb9, 0xbf, 0xbd, 0xb3, 0xb1, 0xb7, 0xb5, 0xab, 0xa9, 0xaf, 0xad, 0xa3, 0xa1, 0xa7, 0xa5,
        0xdb, 0xd9, 0xdf, 0xdd, 0xd3, 0xd1, 0xd7, 0xd5, 0xcb, 0xc9, 0xcf, 0xcd, 0xc3, 0xc1, 0xc7, 0xc5,
        0xfb, 0xf9, 0xff, 0xfd, 0xf3, 0xf1, 0xf7, 0xf5, 0xeb, 0xe9, 0xef, 0xed, 0xe3, 0xe1, 0xe7, 0xe5
    ];

    aes.multGF[3] = [
        0x00, 0x03, 0x06, 0x05, 0x0c, 0x0f, 0x0a, 0x09, 0x18, 0x1b, 0x1e, 0x1d, 0x14, 0x17, 0x12, 0x11,
        0x30, 0x33, 0x36, 0x35, 0x3c, 0x3f, 0x3a, 0x39, 0x28, 0x2b, 0x2e, 0x2d, 0x24, 0x27, 0x22, 0x21,
        0x60, 0x63, 0x66, 0x65, 0x6c, 0x6f, 0x6a, 0x69, 0x78, 0x7b, 0x7e, 0x7d, 0x74, 0x77, 0x72, 0x71,
        0x50, 0x53, 0x56, 0x55, 0x5c, 0x5f, 0x5a, 0x59, 0x48, 0x4b, 0x4e, 0x4d, 0x44, 0x47, 0x42, 0x41,
        0xc0, 0xc3, 0xc6, 0xc5, 0xcc, 0xcf, 0xca, 0xc9, 0xd8, 0xdb, 0xde, 0xdd, 0xd4, 0xd7, 0xd2, 0xd1,
        0xf0, 0xf3, 0xf6, 0xf5, 0xfc, 0xff, 0xfa, 0xf9, 0xe8, 0xeb, 0xee, 0xed, 0xe4, 0xe7, 0xe2, 0xe1,
        0xa0, 0xa3, 0xa6, 0xa5, 0xac, 0xaf, 0xaa, 0xa9, 0xb8, 0xbb, 0xbe, 0xbd, 0xb4, 0xb7, 0xb2, 0xb1,
        0x90, 0x93, 0x96, 0x95, 0x9c, 0x9f, 0x9a, 0x99, 0x88, 0x8b, 0x8e, 0x8d, 0x84, 0x87, 0x82, 0x81,
        0x9b, 0x98, 0x9d, 0x9e, 0x97, 0x94, 0x91, 0x92, 0x83, 0x80, 0x85, 0x86, 0x8f, 0x8c, 0x89, 0x8a,
        0xab, 0xa8, 0xad, 0xae, 0xa7, 0xa4, 0xa1, 0xa2, 0xb3, 0xb0, 0xb5, 0xb6, 0xbf, 0xbc, 0xb9, 0xba,
        0xfb, 0xf8, 0xfd, 0xfe, 0xf7, 0xf4, 0xf1, 0xf2, 0xe3, 0xe0, 0xe5, 0xe6, 0xef, 0xec, 0xe9, 0xea,
        0xcb, 0xc8, 0xcd, 0xce, 0xc7, 0xc4, 0xc1, 0xc2, 0xd3, 0xd0, 0xd5, 0xd6, 0xdf, 0xdc, 0xd9, 0xda,
        0x5b, 0x58, 0x5d, 0x5e, 0x57, 0x54, 0x51, 0x52, 0x43, 0x40, 0x45, 0x46, 0x4f, 0x4c, 0x49, 0x4a,
        0x6b, 0x68, 0x6d, 0x6e, 0x67, 0x64, 0x61, 0x62, 0x73, 0x70, 0x75, 0x76, 0x7f, 0x7c, 0x79, 0x7a,
        0x3b, 0x38, 0x3d, 0x3e, 0x37, 0x34, 0x31, 0x32, 0x23, 0x20, 0x25, 0x26, 0x2f, 0x2c, 0x29, 0x2a,
        0x0b, 0x08, 0x0d, 0x0e, 0x07, 0x04, 0x01, 0x02, 0x13, 0x10, 0x15, 0x16, 0x1f, 0x1c, 0x19, 0x1a
    ];

    /*
     * Rotate 4-byte word w left by one byte
     */
    aes.rotWord = function(w) {
        var tmp = w[0], i;
        for (i = 0; i < 3; i++) {
            w[i] = w[i + 1];
        }
        w[3] = tmp;
        return w;
    };

    /*
     * Apply SBox to 4-byte word w
     */
    aes.subWord = function(w) {
        for (var i = 0; i < 4; i++) {
            w[i] = aes.sBox[w[i]];
        }
        return w;
    };

    /*
     * Perform key expansion to generate a key schedule from a cipher key [§5.2].
     * @param   {number[]}   key - Cipher key as 16/24/32-byte array.
     * @returns {number[][]} Expanded key schedule as 2D byte-array (Nr+1 x Nb bytes).
     */
    aes.keyExpansion = function(key) {
        // block size (in words): no of columns in state (fixed at 4 for AES)
        var Nb = 4;

        // key length (in words): 4/6/8 for 128/192/256-bit keys
        var Nk = key.length / 4;

        // no of rounds: 10/12/14 for 128/192/256-bit keys
        var Nr = Nk + 6;

        var w = new Array(Nb * (Nr + 1));
        var temp = new Array(4);
        var i, r, t;

        // initialise first Nk words of expanded key with cipher key
        for (i = 0; i < Nk; i++) {
            r = [key[4 * i], key[(4 * i) + 1], key[(4 * i) + 2], key[(4 * i) + 3]];
            w[i] = r;
        }

        // expand the key into the remainder of the schedule
        for (i = Nk; i < (Nb * (Nr + 1)); i++) {
            w[i] = new Array(4);
            for (t = 0; t < 4; t++) {
                temp[t] = w[i - 1][t];
            }
            // each Nk'th word has extra transformation
            if (i % Nk === 0) {
                temp = aes.subWord(aes.rotWord(temp));
                for (t = 0; t < 4; t++) {
                    temp[t] ^= aes.rCon[i / Nk][t];
                }
            // 256-bit key has subWord applied every 4th word
            } else if (Nk > 6 && i % Nk === 4) {
                temp = aes.subWord(temp);
            }
            // xor w[i] with w[i-1] and w[i-Nk]
            for (t = 0; t < 4; t++) {
                w[i][t] = w[i - Nk][t] ^ temp[t];
            }
        }

        return aes.formKeyState(w);
    };

    /*
     * Allign keySchedule into AES-state arrays
     */
    aes.formKeyState = function(keySchedule) {
        var i, j, k, m = [];
        for(i = 0; i < 11; i++) {
            m[i] = [];
            for(j = 0; j < 4; j++) {
                m[i][j] = [];
            }
        }
        for(i = 0; i < 11; i++) {
            for(j = 0; j < 4; j++) {
                for(k = 0; k < 4; k++) {
                    m[i][k][j] = keySchedule[(i * 4) + j][k];
                }
            }
        }
        return m;
    };

    /*
     * Shift row r of state S left by r bytes [§5.1.2]
     */
    aes.shiftRows = function(state) {
        // see asmaes.sourceforge.net/rijndael/rijndaelImplementation.pdf
        var rows = new Array(4);
        for (var i = 0; i < rows.length; i++) {
            rows[i] = state[i].slice(i).concat(state[i].slice(0, i));
        }
        return rows;
    };


    aes.mergeRoundKey = function(key) {
        var k = key[0];
        for(var i = 1; i < 4; i++) {
            k = k.concat(key[i]);
        }
        return k;
    };

    aes.generateBoxes = function(key) {
        key = aes.keyExpansion(key);
        var TBox = [];
        for(var i = 1; i < 11; i++) {
            key[i - 1] = aes.shiftRows(key[i - 1]);
            key[i - 1] = aes.mergeRoundKey(key[i - 1]);
            if(i === 10) {
                key[i] = aes.mergeRoundKey(key[i]);
            }
            TBox[i] = [];
            for(var j = 0; j < 16; j++) {
                TBox[i][j] = [];
                for(var x = 0; x < 256; x++) {
                    if(i === 10) {
                        TBox[i][j][x] = aes.sBox[x ^ key[i - 1][j]] ^ key[i][j];
                    } else {
                        TBox[i][j][x] = aes.sBox[x ^ key[i - 1][j]];
                    }
                }
            }
        }
        return TBox;
    };

    aes.generateTyTable = function() {
        var TyTable = [], t = [], x;

        t[0] = [0x02, 0x01, 0x01, 0x03];
        t[1] = [0x03, 0x02, 0x01, 0x01];
        t[2] = [0x01, 0x03, 0x02, 0x01];
        t[3] = [0x01, 0x01, 0x03, 0x02];

        var gfMultiply = function(y) {
            return (y === 0x01) ? x : aes.multGF[y][x];
        };

        for(var i = 0; i < 4; i++) {
            TyTable[i] = [];
            for(x = 0; x < 256; x++) {
                TyTable[i][x] = t[i].map(gfMultiply);
            }
        }
        return TyTable;
    };

    // Generate whitebox-aes code and write it in a file
    aes.generateAlgorithm = function(key, options) {
        var code, mixing, tree, body, TBoxes, TyTables, i, len;
                
        options = options || {};

        if (options.encoding === 'hex') {
            key = new Buffer(key, 'hex');
        } else {
            key = new Buffer(key);
        }
        
        if(key.length !== 16) {
            throw Error('Improper key length');
        }

        TBoxes = aes.generateBoxes(key);
        TyTables = aes.generateTyTable();
        
        code = fs.readFileSync(path.join(__dirname, '/fixtures/aes-template.js'), 'utf8');
        tree = esprima.parse(code);
        // Get module's body
        body = tree.body;
        // Delete original Aes declaration
        body.splice(0, 1);
        // Get parse tree for added code
        mixing =  esprima.parse(
            'var Aes = {};\n' +
            'var preTBoxes = ' + '\'' + JSON.stringify(TBoxes).replace('null', null) + '\'' + ';\n' +
            'var preTyTables = ' + '\'' + JSON.stringify(TyTables) + '\'' + ';\n' +
            'Aes.TBoxes =  JSON.parse(preTBoxes);\n' +
            'Aes.TyTables = JSON.parse(preTyTables);\n'
        );
        // Add Aes declarations to tree
        
        for(i = 0, len = mixing.body.length; i < len; i++) {
            body.splice(i, 0, mixing.body[i]);
        }
        
        code = escodegen.generate(tree);

        if(options.wrapper) {
            options.returnValue = '{encrypt: Aes.encrypt, decrypt: Aes.decrypt}';
            options.windowObject = 'aes';
            code = wrapper(code, options);
        }

        if(options.mangle) {
            options.mangle.filename = 'aes-cache.json';
            code = mangle(code, options.mangle);
        }

        return code;
    };
    module.exports = aes.generateAlgorithm;
}());
