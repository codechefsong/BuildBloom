//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "./BuildPoint.sol";
import "./Materials.sol";

contract BuildBloom {
  BuildPoint public buildPoint;
  Materials public materials;

  address public immutable owner;

  Building[] public buildings;
  Shop[] public shops;

  struct Building {
    string lat;
    string lng;
    bool isBuild;
    address owner;
    uint256 startdate;
  }

  struct Shop {
    string lat;
    string lng;
    uint256 materialType;
  }

  constructor(address _owner, address _tokenAddress, address _multTokenAddress) {
    owner = _owner;
    buildPoint = BuildPoint(_tokenAddress);
    materials = Materials(_multTokenAddress);
  }

  function getBuildings() public view returns (Building[] memory){
    return buildings;
  }

  function getShops() public view returns (Shop[] memory){
    return shops;
  }

  function getMaterials(address _owner) public view returns (uint256, uint256, uint256){
    uint256 wood = materials.balanceOf(_owner, 1);
    uint256 cement = materials.balanceOf(_owner,2);
    uint256 glass = materials.balanceOf(_owner, 3);
    return (wood, cement, glass);
  }

  function addBuilding(string calldata _lat, string calldata _lng) public {
    buildings.push(Building(_lat, _lng, false, address(0), 0));
  }

  function build(uint256 _id) public {
    require( materials.balanceOf(msg.sender, 1) > 0, "You need more Wood");
    require( materials.balanceOf(msg.sender, 2) > 0, "You need more Cement");
    require( materials.balanceOf(msg.sender, 3) > 0, "You need more Glass");

    materials.burnMaterial(msg.sender, 1, 1);
    materials.burnMaterial(msg.sender, 2, 1);
    materials.burnMaterial(msg.sender, 3, 1);

    buildings[_id].isBuild = true;
    buildings[_id].owner = msg.sender;
    buildings[_id].startdate = block.timestamp;
  }

  function addShop(string calldata _lat, string calldata _lng, uint256 _materialType) public {
    shops.push(Shop(_lat, _lng, _materialType));
  }

  function mintMaterial(uint256 _id) public {
    materials.mintMaterial(msg.sender, _id);
  }

  function collectPoints(uint256 _id) public {
    require(msg.sender == buildings[_id].owner, "Not the Owner");
    buildPoint.mint(msg.sender, 1000000000000000000);
    buildings[_id].startdate = block.timestamp;
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
