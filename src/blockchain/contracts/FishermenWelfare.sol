// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract FishermenWelfare is Ownable {
    struct Catch {
        uint256 id;
        address payable seller;
        string species;
        uint256 quantity;
        uint256 price; // Price per unit
        bool sold;
    }

    IERC20 public piCoin; // The token used for transactions
    mapping(uint256 => Catch) public catches; // Mapping of catch ID to Catch struct
    uint256 public catchCount; // Total number of catches listed

    event CatchListed(uint256 id, address seller, string species, uint256 quantity, uint256 price);
    event CatchSold(uint256 id, address buyer, uint256 quantity, uint256 totalPrice);

    constructor(IERC20 _piCoin) {
        piCoin = _piCoin; // Set the token contract address
    }

    // Function to list a new catch
    function listCatch(string memory _species, uint256 _quantity, uint256 _price) public {
        require(_quantity > 0, "Quantity must be greater than zero");
        require(_price > 0, "Price must be greater than zero");

        catchCount++;
        catches[catchCount] = Catch(catchCount, payable(msg.sender), _species, _quantity, _price, false);

        emit CatchListed(catchCount, msg.sender, _species, _quantity, _price);
    }

    // Function to buy a catch
    function buyCatch(uint256 _id, uint256 _quantity) public {
        Catch storage _catch = catches[_id];
        require(_catch.id > 0, "Catch does not exist");
        require(!_catch.sold, "Catch already sold");
        require(_catch.quantity >= _quantity, "Not enough quantity available");

        uint256 totalPrice = _catch.price * _quantity;
        require(piCoin.balanceOf(msg.sender) >= totalPrice, "Insufficient balance");
        require(piCoin.allowance(msg.sender, address(this)) >= totalPrice, "Token allowance not set");

        // Transfer tokens from buyer to seller
        piCoin.transferFrom(msg.sender, _catch.seller, totalPrice);

        // Update catch quantity
        _catch.quantity -= _quantity;
        if (_catch.quantity == 0) {
            _catch.sold = true; // Mark as sold if quantity is zero
        }

        emit CatchSold(_id, msg.sender, _quantity, totalPrice);
    }

    // Function to get catch details
    function getCatch(uint256 _id) public view returns (Catch memory) {
        return catches[_id];
    }
}
