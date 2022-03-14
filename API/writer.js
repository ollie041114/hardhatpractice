const EthereumHandler = require('./ethereumHandler');
require('dotenv').config({ path: '../.env' });

class WriterEthereum {
    constructor() {
        const ethereumHandler = new EthereumHandler();
        this.options = ethereumHandler.options;
        this.myContract = ethereumHandler.myContract;
    }

    async write(information, writeFunction) {
        information.push(this.options);
        var result = await writeFunction.apply(information, information);
        return result.hash;
    }

    async newWorker(...information) {
        return await this.write(information, this.myContract.newWorker);
    }

    // string memory workerEmail, string memory partnerLicenseId, address klaytnAcc, string memory workerHashData
    async editWorker(...information) {
        return await this.write(information, this.myContract.editWorker);
    }

    //string memory,string memory,address,bool,string memory,bool,uint
    async newPartner(...information) {
        return await this.write(information, this.myContract.newPartner);
    }

    //email address
    async getWorker(...information) {
        return await this.write(information, this.myContract.getWorker)
    }

    /*string memory partnerLicenseId, address klaytnAcc, uint initialDeposit, 
    uint depositType, uint salaryDay, uint partnerState, string memory partnerHashData */
    async editPartner(...information) {
        return await this.write(information, this.myContract.editPartner);
    }

    // string memory partnerLicenseId, uint addDeposit, uint addDepositDate
    async partnerAddDeposit(...information) {
        return await this.write(information, this.myContract.partnerAddDeposit);
    }

    // string memory workerEmail, uint payReqAmount,uint payReqDate
    async payRequest(...information) {
        return await this.write(information, this.myContract.payRequest);
    }

    async pay(...information) {
        return await this.write(information, this.myContract.pay);
    }
    // string memory workerEmail, uint payReqDate
    async cancelPay(...information) {
        return await this.write(information, this.myContract.cancelPay);
    }
    
    // string memory partnerLicenseId, uint fromDate, uint toDate
    async getPayByPartnerAndDate(...information) {
        return await this.write(information, this.myContract.getPayByPartnerAndDate);
    }

    // string memory workerEmail
    async getPayByWorker(...information) {
        return await this.write(information, this.myContract.getPayByWorker);
    }

    // string memory workerEmail, uint fromDate, uint toDate
    async getPayByWorkerAndDate(...information) {
        return await this.write(information, this.myContract.getPayByWorkerAndDate);
    }

}

module.exports = WriterEthereum;