const EthereumHandler = require('./ethereumHandler');

class Investigator{
    constructor() {
        const ethereumHandler = new EthereumHandler();
        this.web3 = ethereumHandler.web3;
    }

    async getRevertReason(txHash) {
        var revertString;
        const web3 = this.web3;
        console.log(txHash);
        // const web3 = new Web3(new Web3.providers.HttpProvider(process.env.polygonRPC));
        const tx = await web3.eth.getTransaction(txHash)
        try {
            var result = await web3.eth.call(tx, tx.blockNumber)
            result = result.startsWith('0x') ? result : `0x${result}`
            revertString = "Success";
        }
        catch (error) {
            const result = error.data;
            const reason = web3.utils.toAscii(result);
            revertString = "Execution reverted: "+reason;
        }
        return revertString;
    }
}

module.exports = Investigator;