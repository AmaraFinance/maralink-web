var config, debug = true;
// if (window.ethereum && window.ethereum.chainId == 56) {
//   debug = false
// }
//let chainId =  1287;
let chainId =  1285;
switch (chainId) {
  case 56:
    config = {
      VUE_APP_NETWORK_ID: '0x38',
      VUE_APP_HTTP_PROVIDER: 'https://bsc-dataseed1.binance.org/',
      VUE_APP_WS_PROVIDER: 'wss://bsc-dataseed1.binance.org/',
      VUE_APP_UNICONTROLLER: '0x139152f1459d320299124DD089bd9F3B23C8C5a6',
      VUE_APP_TOKEN: '0x91bFFd19C92C85cA52D499c9edbbCBa002A7afA2',
      VUE_LP_TOKEN: '0x28a6e04a1f693411fc3d3768b7b6243391391839',
      VUE_LENDHUBLENS: '0x1D6E571358f072871485A5351eEC8b5CA1CabCA8',
      VUE_SVLPOOL: '0x061c2B8A296Cad9FD845c8742F340246F3CeF740',
      VUE_UNLOCK: '0x88B829F2B6C6B8f7Bfaa388D24FcA31275c2e702',
      VUE_LPPOOL: '0x7477b65DFa4aA40BF7cd5EcD28E577597617742A',
      VUE_AIRDROP: '0x6C60149f4e151533281086De0BaE7168c76e3Dd0'
    };
    break;
  case 97:
    config = {
      VUE_APP_NETWORK_ID: '0x61',
      VUE_APP_HTTP_PROVIDER: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
      VUE_APP_WS_PROVIDER: 'wss://data-seed-prebsc-1-s1.binance.org:8545/',
      VUE_APP_UNICONTROLLER: '0x43735852dA0BAC6e28071AE0C6375fFe570A2a23',
      VUE_APP_TOKEN: '0x301Cc0689e18D478642A47431c9efCb19De12F7d',
      VUE_LP_TOKEN: '0x301Cc0689e18D478642A47431c9efCb19De12F7d',
      VUE_LENDHUBLENS: '0x5103DAaD84BBF7654E2E8A67dce6A686f8570F51',
      VUE_SVLPOOL: '0x7A6dCC64B9359810bC726Efd5AbD6cF87b163f4c',
      VUE_UNLOCK: '0x4048637311e496daC4289Ff0a1d52Fa6952D9E1A',
      VUE_LPPOOL: '0x5866f0e43F3DB93C52a6efE6292A72e74F36939b',
      VUE_AIRDROP: '0xCDCbd1dc490781207A147768319E5ef8852C5a4d'
    }
    break;
  case 1287:
    config = {
      VUE_APP_NETWORK_ID: '0x507',
      VUE_APP_HTTP_PROVIDER: 'https://rpc.testnet.moonbeam.network',
      VUE_APP_WS_PROVIDER: 'wss://wss.testnet.moonbeam.network',
      VUE_APP_UNICONTROLLER: '0xf3fC5F877E9dd90277c072ff3d07d076337fa29d',
      VUE_APP_TOKEN: '0xbB98bf062211c379bfD0AFc4700513ED02721d7B',
      VUE_LENDHUBLENS: '0xcE40AFF4bdD4F10D14386DE11510841386eb76EA',
    }
    break;
  case 1285:
    config = {
      VUE_APP_NETWORK_ID: '0x505',
      VUE_APP_HTTP_PROVIDER: 'https://rpc.moonriver.moonbeam.network',
      // VUE_APP_WS_PROVIDER: 'wss://wss.testnet.moonbeam.network',
      // VUE_APP_UNICONTROLLER: '0xf3fC5F877E9dd90277c072ff3d07d076337fa29d',
      // VUE_APP_TOKEN: '0xbB98bf062211c379bfD0AFc4700513ED02721d7B',
      // VUE_LENDHUBLENS: '0xcE40AFF4bdD4F10D14386DE11510841386eb76EA',
    }
    break;
    case 137:
      config = {
        VUE_APP_NETWORK_ID: '0x89',
        VUE_APP_HTTP_PROVIDER: 'https://rpc-mainnet.maticvigil.com',
        // VUE_APP_WS_PROVIDER: 'wss://wss.testnet.moonbeam.network',
        // VUE_APP_UNICONTROLLER: '0xf3fC5F877E9dd90277c072ff3d07d076337fa29d',
        // VUE_APP_TOKEN: '0xbB98bf062211c379bfD0AFc4700513ED02721d7B',
        // VUE_LENDHUBLENS: '0xcE40AFF4bdD4F10D14386DE11510841386eb76EA',
      }
      break;
}

export default config
