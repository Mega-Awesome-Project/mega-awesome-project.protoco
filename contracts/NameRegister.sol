// SPDX-License-Identifier: MIT
pragma solidity 0.8.7;

import './INameRegister.sol';

contract NameRegister is INameRegister {
    mapping(address => string) private name;
    mapping(string => bool) private isTaken;

    event Registered(address _address, string _name);
    
    constructor() {}

    function setName(string memory _name) external override {
        require(!isTaken[_name], 'Name already taken');

        isTaken[name[msg.sender]] = false;
        name[msg.sender] = _name;
        isTaken[_name] = true;

        emit Registered(msg.sender, _name);
    }

    function readName() external view override returns (string memory) {
        return name[msg.sender];
    }
}