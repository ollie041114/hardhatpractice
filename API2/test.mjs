import {} from 'dotenv/config';
import dotenv from 'dotenv';

dotenv.config({path: '../test.env'});
import pkg from '@ethereumjs/tx';
import _Common from '@ethereumjs/common'
import * as http from 'http'; //ES 6
import abi from '../abi/Thanks.json'

import Web3 from "web3";

const { Transaction } = pkg; 

const Common = _Common.default
const FROM = process.env.address
const to = process.env.thanksAddress

const customChainParams = { name: 'matic-mumbai', chainId: 80001, networkId: 80001 }
const common = Common.forCustomChain('goerli', customChainParams)
const contractABI = abi; 
const contractAddress = process.env.thanksAddress;

export const web3 = new Web3(new Web3.providers.HttpProvider(process.env.polygonRPC));
export const contract = new web3.eth.Contract(contractABI, contractAddress);
const func = contract.methods.newWorker("lol", "lol", "0x051bDEf47D55dCfB8F2DD375aa436C5Fe7ab7f82", "lol")
.encodeABI();

const txData = {
    gasPrice: 20000000000,
    gasLimit: 210000,
    to: process.env.thanksAddress,
    value: 100,
    data: func,
}

const start = async () => {
    for (let i = 0; i < 1; i++) {
        const tx = Transaction.fromTxData({ ...txData, nonce: txData.nonce + i }, { common })
        const signedTx = tx.sign(Buffer.from(process.env.PRIVATE_KEY, 'hex'))
        const rawTx = '0x' + signedTx.serialize().toString('hex')
        const data = JSON.stringify(
            { "jsonrpc": "2.0", "method": "eth_sendRawTransaction", "params": [rawTx], "id": 1 }
        )
        console.log('Sending tx with nonce ' + tx.nonce.toString())
        sendReq(data)
        await timeout(2000)
    }
}

start()

function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function sendReq(data) {
    const options = {
        hostname: process.env.polygonRPC,
        path: '/',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': data.length
        }
    }
    const req = http.request(options, res => {
        console.log(`statusCode: ${res.statusCode}`)
        res.on('data', d => {
            process.stdout.write(d + '\n')
        })
    })
    req.on('error', error => {
        console.error(error)
    })
    req.write(data)
    req.end()
}