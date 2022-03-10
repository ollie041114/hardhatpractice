import abi from "../abi/Thanks.json" assert {type: 'json'};
import _Common from '@ethereumjs/common'
import {} from 'dotenv/config';
import dotenv from 'dotenv';

dotenv.config({path: '../test.env'});

import Common, { Chain, Hardfork } from '@ethereumjs/common'
import pkg from '@ethereumjs/tx';
const { FeeMarketEIP1559Transaction } = pkg;


const customCommon = Common.new Common({
    chain: 'ropsten',
    supportedHardforks: ['byzantium', 'constantinople', 'petersburg'],
  })
// 'mainnet',
// {
//   name: '127.0.0.1',
//   networkId: process.env.chainId,
//   chainId: process.env.chainId,
// },
// 'london',

import Web3 from "web3";

const account1 = process.env.address;
const privateKey1 = Buffer.from(process.env.PRIVATE_KEY, 'hex');

const contractABI = abi; 
const contractAddress = process.env.thanksAddress;

export const web3 = new Web3(new Web3.providers.HttpProvider(process.env.polygonRPC));

export const contract = new web3.eth.Contract(contractABI, contractAddress);


web3.eth.getBlock("latest", false, (error, result) => {
   console.log("hass gasssss: ", result.gasLimit);
 });

export async function signedTransaction(func, globalCallback){
    async function myFunction(callback){
        web3.eth.getTransactionCount(account1, (err, txCount) => {
            const txObject = {
                nonce:    web3.utils.toHex(txCount),
                gasLimit: "0x02625a00",
                maxPriorityFeePerGas: "0x01",
                maxFeePerGas: "0xff",
                //from: account1,
                to: contractAddress,
                type: "0x02",
                data: func
            }
            console.log(contractAddress);
            console.log(account1);        
            var tx = FeeMarketEIP1559Transaction.fromTxData(txObject,  { common: customCommon });
            tx.sign(privateKey1);
            var stx = tx.serialize();
            
            web3.eth.sendSignedTransaction('0x' + stx.toString('hex'), async (err, hash) => {
                 if (err) { console.log(err);
                    return;
                }
                 var transactionHash = hash;
                 callback(transactionHash);
                 console.log("transaction hash is "+transactionHash);
            });
            })
        }
        const expectedBlockTime = 1000; 
        const sleep = (milliseconds) => {
            return new Promise(resolve => setTimeout(resolve, milliseconds))
        }
        
    myFunction(function(hash) {
        var transactionHash = hash;
        console.log("Hash to be returned is " + transactionHash);
        (async function () {
            let transactionReceipt = null
                while (transactionReceipt == null) { // Waiting expectedBlockTime until the transaction is mined
                    transactionReceipt = await web3.eth.getTransactionReceipt(transactionHash);
                    await sleep(expectedBlockTime)
                }
                console.log("Got the transaction receipt: ", transactionReceipt);
                globalCallback(transactionReceipt);
        })();
    });
}