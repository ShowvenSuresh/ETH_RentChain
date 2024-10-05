// SPDX-Lincense-Identifier: MIT

pragma  solidity ^0.8.26;

import {Script} from "forge-std/Script.sol";
import {Escrow} from "../src/Escrow.sol";
import {AgreementContract } from "../src/AgreementDetails.sol";

contract DepolyContract is Script {
    function run() external {
        vm.startBroadcast();
        AgreementContract ac = new AgreementContract(); 
        vm.stopBroadcast();
    }
}

