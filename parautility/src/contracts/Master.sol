// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.0;

// import "hardhat/console.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Master is Ownable {
    using SafeMath for uint;

    struct Customer {
        // 0 level means doesn't exist
        mapping(Restaurant => uint) public membersOfRestaurants;
    }

    struct Restaurant {
        uint maxLevels;
        
        uint totalRaised;
        uint totalPending;
        bool approved;
        // 0 go to flat 
        // 1 go to percentage
        mapping(uint => uint) public discounts;
    }

    mapping(address => Restaurant) public restaurants;
    mapping(address => mapping(address=> Customer)) public customers;

    //----------Events--------------

    event NewRestaurant(address restaurant);
    event Withdrawl(address restaurant, uint amount);



    //----------Modifiers-----------
    modifier notZeroAddress(address _address) {
        require(_address != address(0), "CANNOT be Zero Address");
        _;
    }

    modifier notExistingRestaurant(address _restaurant) {
        require(!restaurants[_restaurant].approved, "CANNOT be approved Restaurant");
        _;
    }

    modifier isExistingRestaurant(address _restaurant) {
        require(restaurants[_restaurant].approved, "Must be approved Restaurant");
        _;
    }

    modifier addressesNotEqual(address _add1, address _add2) {
        require(_add1 != _add2, "Addresses CANNOT be the same");
        _;
    }

    //-------external functions ---

    function renounceOwnership() public virtual onlyOwner override {
        require(false, "Owner CANNOT be renounced");
    }

    function addRestaurant(address _restaurant)
        external
        onlyOwner
        notZeroAddress(_restaurant)
        notExistingCharity(_restaurant)
        {
        _addRestaurant(_restaurant);
    }

    function withdraw()
        external
        isExistingRestaurant(msg.sender)
        {
        _withdraw(msg.sender);
    }

    function saveFunds(address _restaurant)
        external
        onlyOwner
        isExistingRestaurant(_restaurant)
        {
        _withdraw(_restaurant );
    }

    function _mintRestaurant(address _restaurant)
        external payable
        isExistingRestaurant(_restaurant)
        notExistingRestaurant(msg.sender)
        {
        uint amount = msg.value;
        require(amount > 0, "Donation CANNOT be Zero");
        _mintRestaurant(_restaurant, amount);
    }

    //-------internal functions ---
    function _addRestaurant(address _restaurant, uint percent, uint level) internal {
        Restaurant storage restaurant = restaurants[_restaurant];
        restaurant.maxLevels = level;
        restaurant.percentDiscount = percent;
        restaurant.approved = true;
        restaurant.totalPending = 0;
        restaurant.totalRaised = 0;
        emit NewRestaurant(_restaurant);
    }

    function _withdraw(address _restaurant) internal {
        Restaurant storage restaurant = restaurants[_restaurant];
        uint amount = restaurant.totalPending;
        require(amount > 0, "Pending CANNOT be Zero");
        restaurant.totalPending = 0;
        payable(_restaurant).transfer(amount);
        emit Withdrawl(_restaurant, amount);
    }
    
    function _mintRestaurant(address _restaurant, uint _amount) internal {
        address sender = msg.sender;
        Restaurant storage restaurant = restaurant[_restaurant];
        Customer storage customer = customers[_restaurant][sender];
        customer.membersOfRestaurants[restaurant] = _amount;
        charity.totalRaised = charity.totalRaised.add(_amount);
        charity.totalPending = charity.totalPending.add(_amount);
    }


    //-------getters functions ---
    function getGiven(address _restaurant, address _customer) external view returns (uint amount) {
       return customers[_restaurant][_customer].given;
    }

    function getRaised(address _restaurant, address _customer) external view returns (uint amount) {
       return customers[_restaurant][_customer].raised;
    }

    function getTotalRaised(address _restaurant) external view returns (uint amount) {
       return restaurant[_restaurant].totalRaised;
    }
}