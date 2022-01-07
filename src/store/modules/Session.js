import Vue from 'vue';
import * as constants from '@/store/constants';
import store from '@/store';
import {
  web3
} from '@/handlers';

let networkVersion;

window.addEventListener("load", async () => {

  // Modern dapp browsers...
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
    console.log(window.web3);
    var accounts = web3.eth.accounts;
    console.log(accounts)
    // Acccounts always exposed
  }
  // Non-dapp browsers...
  else {
    console.log(
      "Non-Ethereum browser detected. You should consider trying MetaMask!"
    );
    return;
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
    uni.setStorageSync('language', language);
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
