import Web3 from 'web3';

/**
 * Returns a globally available web3 instance connected to the given provider or a ganache local
 * network by default.
 * @type {Web3}
 */
export const web3 = new Web3(Web3.givenProvider || 'http://127.0.0.1:8545');

/**
 * Provider session account address
 * @typedef {Object} from
 */

/**
 * Blockchain response object from performed transaction
 * @typedef {Object} txObjectResponse
 */

const internalSend = (signature, from) => new Promise((resolve, reject) => {
  signature.estimateGas({ from })
    .then((gas) =>{
      //console.log('gas',gas)
      return signature.send({
        from,
        gas,
      })
    })
    .then(resolve)
    .catch(reject);
});

export const selfSend = (signature, from) =>  {
  return signature
}

/**
 * Will send a transaction to the smart contract and execute its method. Note this can alter
 * the smart contract state.
 * @param {Object} signature
 * @param {string=} from if specified the transaction will be executed with from this address
 * @return {Promise<TXResult>}
 */
export const send = (signature, from = '') => new Promise((resolve, reject) => {
  if (from) {
    internalSend(signature, from)
      .then(resolve)
      .catch(reject);
  } else {
    web3.eth.getAccounts()
      .then(([account]) => internalSend(signature, account))
      .then(resolve)
      .catch(reject);
  }
})
