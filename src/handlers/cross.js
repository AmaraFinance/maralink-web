import CrossFactoryContract from '@/contracts/CrossFactory.json';
import Token from '@/handlers/token';
import {
  send,
  web3,
  selfSend
} from '@/handlers';

export default class crossFac {
  constructor(address = '', fromTokenAddress) {
    this.instanceAddress = address; // TODO .toLowerCase();
    let isAddress = web3.utils.isAddress(this.address);
    if (!isAddress) return console.log('Error address');
    if (!this.address.match(/0x[a-fA-F0-9]{40}/)) return console.log('Missing address');
    this.instance = new web3.eth.Contract(CrossFactoryContract.abi, address);
    this.instanceToken = this.instance.methods.isOwner().call().then((res) => new Token(fromTokenAddress)).catch((
      err) => {
        console.log(err)
      });
  }

  get address() {
    return this.instanceAddress;
  }

  get token() {
    return this.instanceToken;
  }

  getBalanceOf(account) {
    return new Promise((resolve, reject) => {
      this.instance.methods.getBalanceOf(account).call()
        .then((balance) => Number(balance))
        .then(resolve)
        .catch(reject);
    });
  }

  lock(fromTokenAddress, targetChainId, targetTokenAddress, amount, receivedWalletAddress, from = '') {
    if (fromTokenAddress == '0x0000000000000000000000000000000000000000') {
      return selfSend(this.instance.methods.lock(fromTokenAddress, targetChainId, targetTokenAddress, amount,
        receivedWalletAddress), from)
    }
    return new Promise(async (resolve, reject) => {
      var _token;
      this.instanceToken
        .then((token) => {
          _token = token;
          return token.allowance(this.instanceAddress, from)
        })
        .then((allowance) => {
          allowance = Number(allowance);
          if (allowance < amount) {
            return _token.approve(this.instanceAddress,
              "1000000000000000000000000000", from)
          }
        }).then(() =>
          selfSend(this.instance.methods.lock(fromTokenAddress, targetChainId, targetTokenAddress, amount,
            receivedWalletAddress), from)
        )
        .then(resolve)
        .catch((err) => {
          console.log(err);
          reject(err);
        });
    });
  }

}
