//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

contract BuildBloom {
  address public immutable owner;

  Building[] public buildings;

  struct Building {
    string lat;
    string lng;
  }

  constructor(address _owner) {
    owner = _owner;
  }

  function getBuildings() public view returns (Building[] memory){
    return buildings;
  }

  function addBuilding(string calldata _lat, string calldata _lng) public {
    buildings.push(Building(_lat, _lng));
  }

  modifier isOwner() {
    require(msg.sender == owner, "Not the Owner");
    _;
  }

  function withdraw() public isOwner {
    (bool success, ) = owner.call{ value: address(this).balance }("");
    require(success, "Failed to send Ether");
  }

  receive() external payable {}
}
