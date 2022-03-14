const ethers = require("ethers");
require('dotenv').config({ path: '../.env' });
const abi = require('../abi/Thanks.json');
const Web3 = require('web3');

// for provider

class EthereumHandler {

    constructor() {
        const provider = new ethers.providers.JsonRpcProvider(process.env.polygonRPC);
        this.provider = provider;
        // for signer
        var privateKey = process.env.PRIVATE_KEY;
        var signer = new ethers.Wallet(privateKey, provider);
        var address = process.env.thanksAddress;

        this.myContract_write = new ethers.Contract(address, abi, signer)    // Write only
        this.myContract_read = new ethers.Contract(address, abi, provider)  // Read only

        this.options = {
            type: 2,
            value: "0",
            gasLimit: "0x0225a00"
        };
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
    async write(information, writeFunction) {
        information.push(this.options);
        var result = await writeFunction.apply(information, information);
        return result;
    }

    async newWorker(...information) {
        var result = await this.write(information, this.myContract_write.newWorker);
        this.getRevertReason(result.hash);
        return "yes";
        // experimental
        //     const a = await this.provider.getTransaction(hash);
        //     try {
        //         await this.provider.call(a, a.blockNumber, {
        //             "type":"0x2",
        //             "maxFeePerGas":"0x59682f1a",
        //             "maxPriorityFeePerGas":"0x59682f00"
        //         });
        //     } catch (err) {
        //     }
        //     return hash;
        // }
    }


    // string memory workerEmail, string memory partnerLicenseId, address klaytnAcc, string memory workerHashData
    async editWorker(...information) {
        return await this.write(information, this.myContract_write.editWorker);
    }

    async getAllWorker() {
        return await this.myContract_read.getAllWorker();
    }
    //string memory,string memory,address,bool,string memory,bool,uint
    async newPartner(...information) {
        return await this.write(information, this.myContract_write.newPartner);
    }
    //email address
    async getWorker(...information) {
        return await this.write(information, this.myContract_read.getWorker)
    }

    /*string memory partnerLicenseId, address klaytnAcc, uint initialDeposit, 
    uint depositType, uint salaryDay, uint partnerState, string memory partnerHashData */
    async editPartner(...information) {
        return await this.write(information, this.myContract_write.editPartner);
    }
    // string memory partnerLicenseId, uint addDeposit, uint addDepositDate
    async partnerAddDeposit(...information) {
        return await this.write(information, this.myContract_write.partnerAddDeposit);
    }
    // (string memory partnerLicenseId
    async getPartner(...information) {// 3 
        return await this.myContract_read.getPartner(partnerLicenseId);
    }
    // 
    async getAllPartner(...information) {
        return await this.myContract_read.getAllPartner();
    }

    // string memory workerEmail, uint payReqAmount,uint payReqDate
    async payRequest(...information) {
        return await this.write(information, this.myContract_read.payRequest);
    }

    async pay(...information) {
        return await this.write(information, this.myContract_write.pay);
    }
    // string memory workerEmail, uint payReqDate
    async cancelPay(...information) {
        return await this.write(information, this.myContract_write.cancelPay);
    }
    // string memory partnerLicenseId, uint fromDate, uint toDate
    async getPayByPartnerAndDate(...information) {
        return await this.write(information, this.myContract_read.getPayByPartnerAndDate);
    }
    // string memory workerEmail
    async getPayByWorker(...information) {
        return await this.write(information, this.myContract_read.getPayByWorker);
    }

    // string memory workerEmail, uint fromDate, uint toDate
    async getPayByWorkerAndDate(...information) {
        return await this.write(information, this.myContract_read.getPayByWorkerAndDate);
    }
}

const ether = new EthereumHandler();

ether.newWorker("d@unist.ac.kr", "lol", "0x5e714A21331A2bC941abF45F8Ba974B1B226eBd3", "lol").then(
    result => console.log(result)
);