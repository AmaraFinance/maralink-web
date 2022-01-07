import CrossFactoryContract from '@/contracts/CrossFactory.json';
import Token from '@/handlers/token';
import {
    send,
    web3
} from '@/handlers';

export default class crossFac {
    constructor(address = '',fromTokenAddress) {
        this.instanceAddress = address; // TODO .toLowerCase();
        if (!this.address.match(/0x[a-fA-F0-9]{40}/)) return new Error('Missing address');
        this.instance = new web3.eth.Contract(CrossFactoryContract.abi, address);
        this.instanceToken = this.instance.methods.isOwner().call().then((res) => new Token(fromTokenAddress)).catch((err)=> {console.log(err)});
    }

    get address() {
        return this.instanceAddress;
    }

    get token() {
        return this.instanceToken;
    }

    getBalanceOf(account){
        return new Promise((resolve, reject) => {
          this.instance.methods.getBalanceOf(account).call()
            .then((balance) => Number(balance))
            .then(resolve)
            .catch(reject);
        });
    }

    lock(fromTokenAddress, targetChainId, targetTokenAddress, amount, receivedWalletAddress,from='') {
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
                    send(this.instance.methods.lock(fromTokenAddress, targetChainId, targetTokenAddress, amount, receivedWalletAddress))
                )
                .then(resolve)
                .catch((err) => {
                    console.log(err);
                    reject(err);
                });
        });
    }

}