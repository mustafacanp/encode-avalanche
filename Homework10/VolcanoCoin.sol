// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

// 6. Create a address variable for an administrator, this will be set at deploy time.
// The "Ownable" interface provides the `owner` function and `onlyOwner` modifier to get the contract owner.
contract VolcanoCoin is ERC20("Volcano Coin", "VLC"), Ownable {
    uint constant initialSupply = 100000;
    uint paymentId = 1;

    enum PaymentType {
        UNKNOWN,
        BASIC_PAYMENT,
        REFUND,
        DIVIDEND,
        GROUP_PAYMENT
    }

    // 1. Add fields to the payment record
    struct Payment{
        uint id;
        uint amount;
        address recipient;
        PaymentType paymentType;
        uint timestamp;
        string comment;
    }

    mapping (address => Payment[]) public payments;
    event supplyChanged(uint);

    constructor() {
        _mint(msg.sender, initialSupply);
    }

    function transfer(address _recipient, uint _amount) public virtual override returns (bool) {
        _transfer(msg.sender, _recipient, _amount);
        addPaymentRecord(msg.sender, _recipient, _amount);
        return true;
    }

    function addPaymentRecord(address _sender, address _recipient, uint _amount) internal {
        // 2. Update the transfer function to fill in these fields,
        // initially the payment type will be Unknown, and the comment field blank
        payments[_sender].push(Payment({
            id: paymentId++,
            amount: _amount,
            recipient: _recipient,
            paymentType: PaymentType.UNKNOWN,
            timestamp: block.timestamp,
            comment: ""
        }));
    }

    // 4. Write a function to allow the user to update a particular payment with the payment type
    // and comment, they will need to specify the identifier, payment type and comment
    // 5. Make sure you check the parameters in these functions for validity
    function updatePayment(
        uint _paymentId,
        uint _paymentType,
        string memory _comment,
        address _userAddress,
        bool isOwner
    ) internal returns (bool) {
        require(uint8(PaymentType.GROUP_PAYMENT) >= _paymentType, "Payment type not found");
        for(uint i=0; i<payments[_userAddress].length; i++) {
            if (payments[_userAddress][i].id == _paymentId) {
                if (isOwner) {
                    _comment = string(abi.encodePacked(payments[_userAddress][i].comment, _comment));
                }
                payments[_userAddress][i].paymentType = PaymentType(_paymentType);
                payments[_userAddress][i].comment = _comment;
                return true;
            }
        }
        return false;
    }

    function updatePaymentRecord(uint _paymentId, uint _paymentType, string memory _comment) public returns (bool) {
        return updatePayment(_paymentId, _paymentType, _comment, msg.sender, false);
    }

    // 7. The administrator should have the ability to update the type of payment for any payment
    // record from any user. Write a function, or change the existing one, to allow this.
    function updatePaymentRecordOwner(uint _paymentId, uint _paymentType, address _userAddress) public onlyOwner returns (bool) {
        string memory adminAddress = bytes32ToString(bytes32(abi.encodePacked(msg.sender)));
        // 8. If the administrator updates a payment record the existing comment should
        // have "updated by" plus the administrators address appended to it.
        string memory _comment = string(abi.encodePacked("[Updated by: ", adminAddress, "]"));
        return updatePayment(_paymentId, _paymentType, _comment, _userAddress, true);
    }

    function addToTotalSupply(uint _quantity) public onlyOwner {
        _mint(msg.sender,_quantity);
        emit supplyChanged(_quantity);
    }

    // 3. Write a new function to allow a user to view all the details for the payments that they have made
    function getPaymentsOf(address _user) public view returns (Payment[] memory) {
        return payments[_user];
    }

    function getMyPayments() public view returns (Payment[] memory) {
        return payments[msg.sender];
    }

    // Helper functions to convert address type to string type
    function bytes32ToString(bytes32 _bytes32) public pure returns (string memory) {
        uint8 i = 0;
        bytes memory bytesArray = new bytes(40);
        for (i = 0; i < bytesArray.length; i++) {
            uint8 _f = uint8(_bytes32[i/2] >> 4);
            uint8 _l = uint8(_bytes32[i/2] & 0x0f);

            bytesArray[i] = toByte(_f);
            i = i + 1;
            bytesArray[i] = toByte(_l);
        }
        return string(abi.encodePacked("0x", bytesArray));
    }

    function toByte(uint8 _uint8) public pure returns (bytes1) {
        if(_uint8 < 10) {
            return bytes1(_uint8 + 48);
        } else if (_uint8 < 12) {
            return bytes1(_uint8 + 87 - 32);
        } else {
            return bytes1(_uint8 + 87);
        }
    }
}
