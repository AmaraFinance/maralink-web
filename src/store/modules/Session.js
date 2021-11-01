import Vue from 'vue';
import * as constants from '@/store/constants';
import store from '@/store';
import {
  web3
} from '@/handlers';

let networkVersion;

window.addEventListener("load", async () => {

  // Modern dapp browsers...
  // store.dispatch(constants.SESSION_TX);
  if (window.ethereum) {
    networkVersion = window.ethereum.networkVersion
    // console.log('chainId', window.ethereum.chainId)
    //console.log(window.ethereum)
    // window.web3 = ethereum; //new Web3(ethereum);
    try {
      // Request account access if needed
      await ethereum.enable();
      // Acccounts now exposed
      store.dispatch(constants.SESSION_CONNECT_WEB3);
    } catch (error) {
      console.log(error)
      // User denied account access...
    }

    window.ethereum.on('accountsChanged', (accounts) => {
      // Handle the new accounts, or lack thereof.
      // "accounts" will always be an array, but it can be empty.
      window.location.reload();
      // store.dispatch(constants.SESSION_CONNECT_WEB3);

    });

    window.ethereum.on('chainChanged', (chainId) => {
      // Handle the new chain.
      // Correctly handling chain changes can be complicated.
      // We recommend reloading the page unless you have good reason not to.
      window.location.reload();
    });

  }
  // Legacy dapp browsers...
  else if (window.web3) {
    window.web3 = new Web3(web3.currentProvider);
    var accounts = web3.eth.accounts;
    // Acccounts always exposed
  }
  // Non-dapp browsers...
  else {
   Vue.prototype.$confirm('Non-Ethereum browser detected. You should consider trying MetaMask!', 'Reminder', {
     confirmButtonText: 'confirm',
     cancelButtonText: 'cancel',
     type: 'warning'
   }).then(() => {
     window.open(
       'https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=zh-CN',
       '_blank')
       return;
   }).catch(() => {
   
   });
  }
});


const state = {
  wallet: null,
  account: null,
  substrateAddress: null,
  instance: null,
  isOwner: false,
  symbol: null,
  language: 'en',
  networkVersion: null,
  txList: []
};

const actions = {
  // eslint-disable-next-line no-shadow
  [constants.SESSION_CONNECT_WEB3]: ({
    commit,
    state
  }) => {
    web3.eth.getAccounts().then(([account]) => {
        commit(constants.SESSION_SET_PROPERTY, {
          account
        });
        return Vue.$amaraToken.eventualSymbol;
      }).then((symbol) => {
        commit(constants.TOKEN_SYMBOL, {
          symbol
        });
        commit(constants.SET_NETWORKVERSION, networkVersion);
      })
      .catch(() => {
        commit(constants.SESSION_SET_PROPERTY, {
          isOwner: false
        });
      });

  },
  [constants.SESSION_TX]: ({
    commit,
    state
  }) => {
    let txListFromLocal = localStorage.getItem("txList");
    txListFromLocal = JSON.parse(txListFromLocal);
    if (txListFromLocal && txListFromLocal.length) {
      commit(constants.SESSION_SET_TX, txListFromLocal[txListFromLocal.length - 1]);
    }

  }

};

const mutations = {
  // eslint-disable-next-line no-shadow
  [constants.SESSION_SET_PROPERTY]: (state, data) => {
    const [
      [property, value]
    ] = Object.entries(data);
    state[property] = value;
  },
  [constants.TOKEN_SYMBOL]: (state, {
    symbol
  }) => {
    state.symbol = symbol;
  },
  [constants.CAHNGE_LANGUAGE]: (state, {
    language
  }) => {
    console.log(language)
    state.language = language;
    Vue._i18n.locale = language;
    //uni.setStorageSync('language', language);
  },
  [constants.CHANGE_WALLET]: (state, {
    wallet
  }) => {
    state.wallet = wallet;
  },
  [constants.SET_NETWORKVERSION]: (state,
    networkVersion) => {
    state.networkVersion = networkVersion;
  },
  [constants.SESSION_SET_TX]: (state, tx) => {
    let idx = state.txList.findIndex((item) => item.txHash == tx.txHash);
    if (idx == -1) {
      state.txList.push(tx);
      localStorage.setItem("txList", JSON.stringify(state.txList));
    }
  },
  [constants.SESSION_DELETE_TX]: (state, tx) => {
    let idx = state.txList.findIndex((item) => item.txHash == tx.txHash);
    if (idx >= 0) {
      state.txList.splice(idx, 1);
    }
    localStorage.setItem("txList", JSON.stringify(state.txList));
  },
};

const getters = {
  // eslint-disable-next-line no-shadow
  [constants.SESSION_IS_LOGGED]: (state) => !!state.account,
};

export default {
  state,
  actions,
  mutations,
  getters,
};
