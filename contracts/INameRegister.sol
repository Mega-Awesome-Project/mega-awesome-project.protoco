// SPDX-License-Identifier: MIT
pragma solidity 0.8.7;

interface INameRegister {
    function setName(string calldata _name) external;
    function readName() external view returns (string calldata);
}