pragma solidity >=0.4.22 <0.7.0;

contract PartRegistry {
    struct Part {
        string id;
        string partSerialNo;
        string partName;
        string length;
        string width;
        string unitPrice;
    }

    mapping(string => Part) public parts;
    mapping(string => bool) public partExists;

    function addPart(string memory _id, string memory _partSerialNo, string memory _partName, string memory _length, string memory _width, string memory _unitPrice) public {
        require(!partExists[_id], "Part already exists");
        parts[_id] = Part(_id, _partSerialNo, _partName, _length, _width, _unitPrice);
        partExists[_id] = true;
    }

    function updatePart(string memory _id, string memory _unitPrice) public {
        require(partExists[_id], "Part does not exist.");
        parts[_id].unitPrice = _unitPrice;
    }

    function getPart(string memory _id) public view returns (string memory, string memory, string memory, string memory, string memory, string memory) {
        require(partExists[_id], "Item does not exist.");
        Part memory part = parts[_id];
        return (part.id, part.partSerialNo, part.partName, part.length, part.width, part.unitPrice);
    }
}