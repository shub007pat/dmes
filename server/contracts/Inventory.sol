pragma solidity >=0.4.22 <0.7.0;

contract Inventory {
    struct Item {
        string id;
        string partSerialNo;
        string status;
        string quantity;
        string location;
        string containerNo;
        string supplier;
    }

    mapping(string => Item) public items;
    mapping(string => bool) public itemExists;

    function addItem(string memory _id, string memory _partSerialNo, string memory _status, string memory _quantity, string memory _location, string memory _containerNo, string memory _supplier) public {
        require(!itemExists[_id], "Item already exists.");
        items[_id] = Item(_id, _partSerialNo, _status, _quantity, _location, _containerNo, _supplier);
        itemExists[_id] = true;
    }

    function updateItemStatus(string memory _id, string memory _status) public {
        require(itemExists[_id], "Item does not exist.");
        items[_id].status = _status;
    }

    function getItem(string memory _id) public view returns (string memory, string memory, string memory, string memory, string memory, string memory, string memory) {
        require(itemExists[_id], "Item does not exist.");
        Item memory item = items[_id];
        return (item.id, item.partSerialNo, item.status, item.quantity, item.location, item.containerNo, item.supplier);
    }
}
