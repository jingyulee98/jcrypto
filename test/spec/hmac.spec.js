module.exports = [
    {
    // https://tools.ietf.org/html/rfc4231
        name: 'RFC 4231 Test case 1',
        params: {
            key: '0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b',
            keyEncoding: 'hex',
            data: '4869205468657265',
            dataEncoding: 'hex',
            hash: 'b0344c61d8db38535ca8afceaf0bf12b881dc200c9833da726e9376c2e32cff7',
            fileName: 'hmac-rfc-1.js'
        }
    },
    {
        name: 'RFC 4231 Test case 2',
        params: {
            key: '4a656665',
            keyEncoding: 'hex',
            data: '7768617420646f2079612077616e7420666f72206e6f7468696e673f',
            dataEncoding: 'hex',
            hash: '5bdcc146bf60754e6a042426089575c75a003f089d2739839dec58b964ec3843',
            fileName: 'hmac-rfc-2.js'
        }
    },
    {
        name: 'RFC 4231 Test case 3',
        params: {
            key: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
            keyEncoding: 'hex',
            data: 'dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd',
            dataEncoding: 'hex',
            hash: '773ea91e36800e46854db8ebd09181a72959098b3ef8c122d9635514ced565fe',
            fileName: 'hmac-rfc-3.js'
        }
    },
    {
        name: 'RFC 4231 Test case 4',
        params: {
            key: '0102030405060708090a0b0c0d0e0f10111213141516171819',
            keyEncoding: 'hex',
            data: 'cdcdcdcdcdcdcdcdcdcdcdcdcdcdcdcdcdcdcdcdcdcdcdcdcdcdcdcdcdcdcdcdcdcdcdcdcdcdcdcdcdcdcdcdcdcdcdcdcdcd',
            dataEncoding: 'hex',
            hash: '82558a389a443c0ea4cc819899f2083a85f0faa3e578f8077a2e3ff46729665b',
            fileName: 'hmac-rfc-4.js'
        }
    },
    {
        name: 'RFC 4231 Test case 5',
        params: {
            key: '0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c',
            keyEncoding: 'hex',
            data: '546573742057697468205472756e636174696f6e',
            dataEncoding: 'hex',
            hash: 'a3b6167473100ee06e0c796c2955552bfa6f7c0a6a8aef8b93f860aab0cd20c5',
            fileName: 'hmac-rfc-5.js'
        }
    },
    {
        name: 'RFC 4231 Test case 6',
        params: {
            key: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
            keyEncoding: 'hex',
            data: '54657374205573696e67204c6172676572205468616e20426c6f636b2d53697a65204b6579202d2048617368204b6579204669727374',
            dataEncoding: 'hex',
            hash: '60e431591ee0b67f0d8a26aacbf5b77f8e0bc6213728c5140546040f0ee37f54',
            fileName: 'hmac-rfc-6.js'
        }
    },
    {
        name: 'RFC 4231 Test case 7',
        params: {
            key: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
            keyEncoding: 'hex',
            data: '5468697320697320612074657374207573696e672061206c6172676572207468616e20626c6f636b2d73697a65206b657920616e642061206c6172676572207468616e20626c6f636b2d73697a6520646174612e20546865206b6579206e6565647320746f20626520686173686564206265666f7265206265696e6720757365642062792074686520484d414320616c676f726974686d2e',
            dataEncoding: 'hex',
            hash: '9b09ffa71b942fcb27635fbcd5b0e944bfdc63644f0713938a7f51535c3a35e2',
            fileName: 'hmac-rfc-7.js'
        }
    },
    {
    // http://www.nco.ncep.noaa.gov/pmb/codes/nwprod/decoders/decod_shared/lib/polarssl/tests/suites/test_suite_hmac_shax.data
        name: 'HMAC-SHA-256 Test Vector NIST CAVS #1',
        params: {
            key: 'cdffd34e6b16fdc0',
            keyEncoding: 'hex',
            data: 'd83e78b99ab61709608972b36e76a575603db742269cc5dd4e7d5ca7816e26b65151c92632550cb4c5253c885d5fce53bc47459a1dbd5652786c4aac0145a532f12c05138af04cbb558101a7af5df478834c2146594dd73690d01a4fe72545894335f427ac70204798068cb86c5a600b40b414ede23590b41e1192373df84fe3',
            dataEncoding: 'hex',
            hash: 'c6f0dde266cb4a26d41e8259d33499cc7fd82385cfa644178d281262ff92c2d6',
            fileName: 'hmac-nist-1.js'
        }
    },
    {
        name: 'HMAC-SHA-256 Test Vector NIST CAVS #2',
        params: {
            key: '6d97bb5892245be2',
            keyEncoding: 'hex',
            data: '13c2b391d59c0252ca5d2302beaaf88c4bcd779bb505ad9a122003dfae4cc123ad2bd036f225c4f040021a6b9fb8bd6f0281cf2e2631a732bdc71693cc42ef6d52b6c6912a9ef77b3274eb85ad7f965ae6ed44ac1721962a884ec7acfb4534b1488b1c0c45afa4dae8da1eb7b0a88a3240365d7e4e7d826abbde9f9203fd99d7',
            dataEncoding: 'hex',
            hash: '31588e241b015319a5ab8c4527296498fab3d72751c60610f2c4a70353418438',
            fileName: 'hmac-nist-2.js'
        }
    },
    {
        name: 'HMAC-SHA-256 Test Vector NIST CAVS #3',
        params: {
            key: '3c7fc8a70b49007a',
            keyEncoding: 'hex',
            data: '60024e428a39c8b8bb2e9591bad9dc2115dfbfd716b6eb7af30a6eb34560caccbbfa47b710fa8d523aca71e9e5ba10fc1feb1a43556d71f07ea4f33496f093044e8caf1d02b79e46eb1288d5964a7a7494f6b92574c35784eece054c6151281d80822f7d47b8231c35d07f5cb5cf4310ddc844845a01c6bfab514c048eccaf9f',
            dataEncoding: 'hex',
            hash: '1c98c94a32bec9f253c21070f82f8438753e1b69ba648c087e24c4839a297960',
            fileName: 'hmac-nist-3.js'
        }
    },
    {
        name: 'HMAC-SHA-256 Test Vector NIST CAVS #4',
        params: {
            key: '369f33f85b927a07',
            keyEncoding: 'hex',
            data: 'ae8e2a94ca386d448cbacdb0e9040ae3cb297c296363052cc157455da29a0c95897315fc11e3f12b81e2418da1ec280bccbc00e847584ce9d14deeba7b3c9b8dba958b04bba37551f6c9ba9c060be1a4b8cf43aa62e5078b76c6512c5619b71a6a7cf5727180e1ff14f5a1a3c1691bf8b6ebad365c151e58d749d57adb3a4986',
            dataEncoding: 'hex',
            hash: '60b90383286533d309de46593e6ce39fc51fb00a8d88278c5206fef67ad91398',
            fileName: 'hmac-nist-4.js'
        }
    },
    {
        name: 'HMAC-SHA-256 Test Vector NIST CAVS #5',
        params: {
            key: 'e5179687582b4dc4',
            keyEncoding: 'hex',
            data: 'ce103bdacdf32f614f6727bcb31ca1c2824a850d00f5585b016fb234fe1ef2cd687f302d3c6b738ed89a24060d65c36675d0d96307c72ef3e8a83bfa8402e226de9d5d1724ba75c4879bf41a4a465ce61887d9f49a34757849b48bae81c27ebed76faae2ad669bca04747d409148d40812776e0ae2c395b3cb9c89981ce72d5c',
            dataEncoding: 'hex',
            hash: '509581f6816df4b8cc9f2cf42b7cc6e6a5a1e375a16f24128a6193ad6e104906',
            fileName: 'hmac-nist-5.js'
        }
    },
    {
        // https://github.com/Caligatio/jsSHA/blob/master/test/test.html
        name: 'jsSHA Original Test Vector #1',
        params: {
            key: '000102030405060708090A0B0C0D0E0F101112131415161718191A1B1C1D1E1F202122232425262728292A2B2C2D2E2F303132333435363738393A3B3C3D3E3F',
            keyEncoding: 'hex',
            data: '53616D706C65206D65737361676520666F72206B65796C656E3D626C6F636B6C656E',
            dataEncoding: 'hex',
            hash: '8bb9a1db9806f20df7f77b82138c7914d174d59e13dc4d0169c9057b133e1d62',
            fileName: 'hmac-jssha-1.js'
        }
    },
    {
        name: 'jsSHA Original Test Vector #2',
        params: {
            key: '000102030405060708090A0B0C0D0E0F101112131415161718191A1B1C1D1E1F',
            keyEncoding: 'hex',
            data: '53616D706C65206D65737361676520666F72206B65796C656E3C626C6F636B6C656E',
            dataEncoding: 'hex',
            hash: 'a28cf43130ee696a98f14a37678b56bcfcbdd9e5cf69717fecf5480f0ebdf790',
            fileName: 'hmac-jssha-2.js'
        }
    },
    {
        name: 'jsSHA Original Test Vector #3',
        params: {
            key: '000102030405060708090A0B0C0D0E0F101112131415161718191A1B1C1D1E1F202122232425262728292A2B2C2D2E2F303132333435363738393A3B3C3D3E3F404142434445464748494A4B4C4D4E4F505152535455565758595A5B5C5D5E5F60616263',
            keyEncoding: 'hex',
            data: '53616D706C65206D65737361676520666F72206B65796C656E3D626C6F636B6C656E',
            dataEncoding: 'hex',
            hash: 'bdccb6c72ddeadb500ae768386cb38cc41c63dbb0878ddb9c7a38a431b78378d',
            fileName: 'hmac-jssha-3.js'
        }
    },
    {
        name: 'Empty key HMAC',
        params: {
            key: '',
            keyEncoding: 'hex',
            data: '53616d706c65206d65737361676520666f7220656d707479206b6579',
            dataEncoding: 'hex',
            hash: '02a59501d789c97618ee379a29b67db900f6761cb13f961ddde9d0cfa636fd04',
            fileName: 'hmac-emptyKey.js'

        }
    },
    {
        name: 'Empty input and empty key HMAC',
        params: {
            key: '',
            keyEncoding: 'hex',
            data: '',
            dataEncoding: 'hex',
            hash: 'b613679a0814d9ec772f95d778c35fc5ff1697c493715653c6c712144292c5ad',
            fileName: 'hmac-all-empty.js'
        }
    },
    {
        // Tests with text input
        name: 'Text jsSHA-based Test #1',
        params: {
            key: '000102030405060708090A0B0C0D0E0F101112131415161718191A1B1C1D1E1F',
            keyEncoding: 'hex',
            data: 'abcdefABCDEFaAbBcCdDeEfF1234567890',
            dataEncoding: 'str',
            hash: '75d33cb96af397922df77618aad9d97d6e2e4f214e776bddb7d8aec067a533c6',
            fileName: 'hmac-text-input-1.js'
        }
    },
    {
        name: 'Text jsSHA-based Test #2',
        params: {
            key: '010203040506',
            keyEncoding: 'hex',
            data: 'a',
            dataEncoding: 'str',
            hash: 'bf832c5684f946ffec322235d43437e4eef19b08404e558f34824275b5a21022',
            fileName: 'hmac-text-input-2.js'
        }
    },
    {
        name: 'Text jsSHA-based Test #3',
        params: {
            key: '',
            keyEncoding: 'hex',
            data: 'a',
            dataEncoding: 'str',
            hash: '9615a95d4a336118c435b9cd54c5e8644ab956b573aa2926274a1280b6674713',
            fileName: 'hmac-text-input-3.js'
        }
    },
    {
        name: 'Text jsSHA-based Test #4',
        params: {
            key: '',
            keyEncoding: 'hex',
            data: '',
            dataEncoding: 'str',
            hash: 'b613679a0814d9ec772f95d778c35fc5ff1697c493715653c6c712144292c5ad',
            fileName: 'hmac-text-input-4.js'
        }
    },
    {
        name: 'Text jsSHA-based Test #5',
        params: {
            key: '000102030405060708090A0B0C0D0E0F',
            keyEncoding: 'hex',
            data: 'фывапролджэФЫВАПРОЛДЖЭ',
            dataEncoding: 'str',
            hash: '82ab2762c4ce2dbaad4af907b0f009ff6e2efe6b4899a897fad89fd880936804',
            fileName: 'hmac-text-input-5.js'
        }
    },
    {
        name: 'Text jsSHA-based Test #6',
        params: {
            key: '000102030405060708090A0B0C0D0E0F',
            keyEncoding: 'hex',
            data: 'фывапролджэФЫВАПРОЛДЖЭ!@#$%^&*()_+',
            dataEncoding: 'str',
            hash: '1df90083e7b9d4bc736de833c30b42999eabb071fd05391ad818b2a5e332eeea',
            fileName: 'hmac-text-input-6.js'
        }
    },
    {
        name: 'Text jsSHA-based Test #7',
        params: {
            key: '000102030405060708090A0B0C0D0E0F',
            keyEncoding: 'hex',
            data: '',
            dataEncoding: 'str',
            hash: '07eff8b326b7798c9ccfcbdbe579489ac785a7995a04618b1a2813c26744777d',
            fileName: 'hmac-text-input-7.js'
        }
    },
    {
        // Tests with text key and text data
        name: 'Text key jsSHA-based Test #1',
        params: {
            key: 'a',
            keyEncoding: 'str',
            data: 'abcdefABCDEFaAbBcCdDeEfF1234567890',
            dataEncoding: 'str',
            hash: 'bbdae96039d3baf8ebf78c8b2624e2937f466f30f4244630fbd6e63781116e9b',
            fileName: 'hmac-text-input-text-key-1.js'
        }
    },
    {
        name: 'Text key jsSHA-based Test #2',
        params: {
            key: '010203040506',
            keyEncoding: 'str',
            data: 'a',
            dataEncoding: 'str',
            hash: '271e948668d2db84050ac2a331753da28e0a9eb1601de24b322d97ab6b3894d8',
            fileName: 'hmac-text-input-text-key-2.js'
        }
    },
    {
        name: 'Text key jsSHA-based Test #3',
        params: {
            key: '',
            keyEncoding: 'str',
            data: 'a',
            dataEncoding: 'str',
            hash: '9615a95d4a336118c435b9cd54c5e8644ab956b573aa2926274a1280b6674713',
            fileName: 'hmac-text-input-text-key-3.js'
        }
    },
    {
        name: 'Text key jsSHA-based Test #4',
        params: {
            key: '',
            keyEncoding: 'str',
            data: '',
            dataEncoding: 'str',
            hash: 'b613679a0814d9ec772f95d778c35fc5ff1697c493715653c6c712144292c5ad',
            fileName: 'hmac-text-input-text-key-4.js'
        }
    },
    {
        name: 'Text key jsSHA-based Test #5',
        params: {
            key: '000102030405060708090A0B0C0D0E0F',
            keyEncoding: 'hex',
            data: 'фывапролджэФЫВАПРОЛДЖЭ',
            dataEncoding: 'str',
            hash: '82ab2762c4ce2dbaad4af907b0f009ff6e2efe6b4899a897fad89fd880936804',
            fileName: 'hmac-text-input-text-key-5.js'
        }
    },
    {
        name: 'Text key jsSHA-based Test #6',
        params: {
            key: '000102030405060708090A0B0C0D0E0F',
            keyEncoding: 'hex',
            data: 'фывапролджэФЫВАПРОЛДЖЭ!@#$%^&*()_+',
            dataEncoding: 'str',
            hash: '1df90083e7b9d4bc736de833c30b42999eabb071fd05391ad818b2a5e332eeea',
            fileName: 'hmac-text-input-text-key-6.js'
        }
    },
    {
        name: 'Text key jsSHA-based Test #7',
        params: {
            key: '000102030405060708090A0B0C0D0E0F',
            keyEncoding: 'hex',
            data: '',
            dataEncoding: 'str',
            hash: '07eff8b326b7798c9ccfcbdbe579489ac785a7995a04618b1a2813c26744777d',
            fileName: 'hmac-text-input-text-key-7.js'
        }
    },
    {
        name: 'Text key jsSHA-based Test #8',
        params: {
            key: '',
            keyEncoding: 'str',
            data: '',
            dataEncoding: 'str',
            hash: 'b613679a0814d9ec772f95d778c35fc5ff1697c493715653c6c712144292c5ad',
            fileName: 'hmac-text-input-text-key-8.js'
        }
    }
];
