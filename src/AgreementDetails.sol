//SPDX-License-Identifier: MIT

pragma solidity ^0.8.26;

import {Escrow} from "src/Escrow.sol";

contract AgreementContract {
    uint256 agreementId = 0;

    struct Agreement {
        address payable tenant;
        address payable landlord;
        // string propertyDetails;
        uint256 rentAmount;
        uint256 durationInMonths;
        string status;
        uint256 deposit;
        uint256 startDate;
        uint256 nextPaymentDueDate;
        uint256 lastPaymentDate;
        bool activeStat;
        uint256 latePaymentCount;
    }

    mapping(uint256 => Agreement) public agreementnDetails;
    mapping(uint256 => Escrow) public detailsToEscrow;
    mapping(address => uint256) public tenantToAgreementId;

    function createAgreement(
        address payable _tenant,
        address payable _landord,
        uint256 _rentAmount,
        uint256 _durationInMonths,
        string memory _status
    ) public {
        Agreement memory a;
        a.tenant = _tenant;
        a.landlord = _landord;
        a.rentAmount = _rentAmount;
        a.durationInMonths = _durationInMonths;
        a.status = _status;
        a.startDate = block.timestamp;
        a.nextPaymentDueDate = block.timestamp + 30 days;
        agreementId++;
        a.activeStat = true;
        a.latePaymentCount = 0;
        Escrow es = new Escrow(_tenant, _landord);
        detailsToEscrow[agreementId] = es;
        agreementnDetails[agreementId] = a;
        tenantToAgreementId[_tenant] = agreementId;
    }

    function getAgreement(uint256 agrmtId) public view returns (Agreement memory) {
        return agreementnDetails[agrmtId];
    }

    function modifyRentAmt(uint256 _agrmtId, uint256 newRent) public {
        require(agreementnDetails[_agrmtId].activeStat == true, "This contract is not active ");

        agreementnDetails[_agrmtId].rentAmount = newRent;
    }

    function modifyDuration(uint256 _agrmtId, uint256 newDuration) public {
        require(agreementnDetails[_agrmtId].activeStat == true, "This contract is not active ");
        agreementnDetails[_agrmtId].durationInMonths = newDuration;
    }

    function changeStatus(uint256 _agrmtId, string memory newStatus) public {
        require(agreementnDetails[_agrmtId].activeStat == true, "This contract is not active ");
        agreementnDetails[_agrmtId].status = newStatus;
    }

    function terminateAgreement(uint256 _agrmtId) public {
        Agreement storage agr = agreementnDetails[_agrmtId];
        require(agr.activeStat == true, "The contract is already no active");

        bool terminationValid = false;
        string memory terminationReason;
        Escrow es = detailsToEscrow[_agrmtId];
        if (block.timestamp >= agr.startDate + (agr.durationInMonths * 30 days)) {
            terminationValid = true;
            terminationReason = "Lease duration completed";
            es.releaseFunds(agr.tenant, es.getBalance());
        } else if (agr.latePaymentCount >= 2) {
            terminationValid = true;
            terminationReason = "Multiple late payments";
        }

        require(terminationValid, "Termination conditions not met");

        agr.activeStat = false;
        agr.status = "Terminated";
    }

    function getAgreementStatus(uint256 _agrmtId) public view returns (string memory) {
        return agreementnDetails[_agrmtId].status;
    }

    function makePayment(uint256 _agrmtId, uint256 payAmt) public payable {
        Agreement storage arg = agreementnDetails[_agrmtId];

        require(payAmt == arg.rentAmount, "Worng rent amount");
        arg.landlord.transfer(msg.value);
        arg.lastPaymentDate = block.timestamp;
        arg.nextPaymentDueDate += 30 days;
    }

    function checkLatePayment(uint256 _agrmtId) public {
        Agreement storage agreement = agreementnDetails[_agrmtId];
        require(agreement.activeStat == true, "This contract is not active");

        if (block.timestamp > agreement.nextPaymentDueDate + 10 days) {
            // Payment is late by more than 10 days
            Escrow es = detailsToEscrow[_agrmtId];
            es.deductBalance(agreementnDetails[_agrmtId].rentAmount);
            // Update payment dates
            agreement.lastPaymentDate = block.timestamp;
            agreement.nextPaymentDueDate += 30 days;
            agreement.latePaymentCount++;
            if (agreement.latePaymentCount > 2) {
                terminateAgreement(_agrmtId);
            }
        }
    }

    function addDepositToEscrow(uint256 _agrmtId, uint256 deposit) public {
        Escrow es = detailsToEscrow[_agrmtId];
        es.addEscrowBalance(agreementnDetails[_agrmtId].tenant, deposit);
        deposit = es.getBalance();
    }

    function raiseDispute(uint256 _agrmtId) public {
        Escrow es = detailsToEscrow[_agrmtId];
        es.raiseDispute();
    }

    function EndDispute(uint256 _agrmtId) public {
        Escrow es = detailsToEscrow[_agrmtId];
        es.disputeResolved();
    }

    function getAgreementId(address tenant) public view returns (uint256) {
        return tenantToAgreementId[tenant];
    }
}
