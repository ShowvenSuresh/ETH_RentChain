//SPDX-License-Identifier: MIT

pragma solidity ^0.8.26;

contract Escrow {
    address payable tenant;
    address payable landlord;
    uint256 escrowAmount;
    bool disputeActive;
    bool escrowLocked;

    constructor(address payable _tenant, address payable _landlord) payable {
        tenant = _tenant;
        landlord = _landlord;
        escrowAmount = 0;
        disputeActive = false;
        escrowLocked = false;
    }

    function getBalance() public view returns (uint256) {
        return escrowAmount;
    }

    function releaseFunds(address payable recipient, uint256 amt) public payable {
        require(amt <= escrowAmount, "The funds have exceeded the escorw amount");
        require(disputeActive == false, "A dispute is still active funds cannont be released");

        (bool success,) = recipient.call{value: amt}("");
        escrowAmount -= amt;
        require(success, "Fail to  send funds");
    }

    function lockEscrow() public {
        escrowLocked = true;
    }

    function deductBalance(uint256 amount) public {
        require(amount <= address(this).balance, "Deduction amount exceeds escrow balance");
        require(
            escrowLocked == true || disputeActive == true,
            "The deposit is locked due to  a dispute that is still on going"
        );

        (bool success,) = landlord.call{value: amount}("");
        require(success, "Failed to send funds to landlord");

        escrowAmount -= amount;
    }

    function addEscrowBalance(address _tenant, uint256 deposit) public payable {
        require(_tenant == tenant, "Only tenant can replenish deposit");

        escrowAmount += deposit;
    }

    function raiseDispute() public {
        require(disputeActive == false, "A dispute is already active");

        disputeActive = true;
        escrowLocked = true;
    }

    function disputeResolved() public {
        require(disputeActive = true, "No dispute to resolve");
        disputeActive = false;
        escrowLocked = false;
    }
}
