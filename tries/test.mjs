import {ContractAPI} from "./contractapi.mjs";
import {EthereumHandler} from './ethereumHandler.mjs';
const contract = new EthereumHandler();

contract.newWorker(
    "sa5@unist.ac.kr", 
    "123", 
    "0x0000000000000000000000000000000000000000",
    "hashData"
    ).then(result => {
        console.log(result)
    }
);

// contract.getWorker("yess@unist.ac.kr").then(result => 
//     console.log(result));