const ethers = require("ethers");
require('dotenv').config({ path: '../.env' });
const abi = require('../abi/Thanks.json');
const Web3 = require('web3');


class EthereumHandler {
    constructor() {
        const provider = new ethers.providers.JsonRpcProvider(process.env.polygonRPC);
        this.EthersProvider = provider;
        var privateKey = process.env.PRIVATE_KEY;
        var signer = new ethers.Wallet(privateKey, provider);
        var address = process.env.thanksAddress;

        this.myContract = new ethers.Contract(address, abi, signer)    // Write only
        var FeeData;
        provider.getFeeData().then(feeData =>{
            //console.log(feeData);
            FeeData = feeData;
        })
        this.options = {
            type: 2,
            value: "0",
            gasLimit: "0x0225a00",
            // gas: estimatedGas,
            maxPriorityFeePerGas: '0xf9682f00',
            maxFeePerGas: '0xf9682f14',
        };  
        this.web3 = new Web3(new Web3.providers.HttpProvider(process.env.polygonRPC));
    }
    async getRevertReason(txHash) {
        var revertString;

        console.log(txHash);
        const web3 = new Web3(new Web3.providers.HttpProvider(process.env.polygonRPC));
        const tx = await web3.eth.getTransaction(txHash)
        try {
            var result = await web3.eth.call(tx, tx.blockNumber)
            result = result.startsWith('0x') ? result : `0x${result}`

            revertString = "No errors";
            // if (result && result.substr(138)) {
            //     const reason = web3.utils.toAscii(result.substr(138))
            //     console.log('Revert reason:', reason)
            //     return reason

            //   } else {
            //     console.log('Cannot get reason - No return value')

            //   }
        }
        catch (error) {
            const result = error.data;
            const reason = web3.utils.toAscii(result);
            revertString = reason;
        }
        return revertString;

    }

    cons() {
        console.log("LOL");
    }

}

const ether = new EthereumHandler();
module.exports = EthereumHandler;
