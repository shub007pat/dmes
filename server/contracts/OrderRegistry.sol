pragma solidity >=0.4.22 <0.7.0;
pragma experimental ABIEncoderV2;

contract OrderRegistry {
    struct Part {
        string partSerialNo;
        string partName;
        uint quantity;
        uint unitPrice;
        uint totalAmount;
    }

    struct Order {
        string id;
        string orderNo;
        string orderDate;
        string orderBy;
        string shipTo;
        string container;
        Part[] parts;
        string status;
    }

    mapping(string => Order) public orders;
    mapping(string => bool) public orderExists;

    function addOrder(
        string memory _id,
        string memory _orderNo,
        string memory _orderDate,
        string memory _orderBy,
        string memory _shipTo,
        string[] memory _partSerialNos,
        string[] memory _partNames,
        uint[] memory _quantities,
        uint[] memory _unitPrices
    ) public {
        require(!orderExists[_orderNo], "Order already exists");
        Order storage newOrder = orders[_orderNo];
        newOrder.id = _id;
        newOrder.orderNo = _orderNo;
        newOrder.orderDate = _orderDate;
        newOrder.orderBy = _orderBy;
        newOrder.shipTo = _shipTo;
        newOrder.container = "NA";
        newOrder.status = "Pending";

        for (uint i = 0; i < _partSerialNos.length; i++) {
            Part memory newPart = Part({
                partSerialNo: _partSerialNos[i],
                partName: _partNames[i],
                quantity: _quantities[i],
                unitPrice: _unitPrices[i],
                totalAmount: _quantities[i] * _unitPrices[i]
            });
            newOrder.parts.push(newPart);
        }
        orderExists[_orderNo] = true;
    }

    function updateOrder(string memory _orderNo, string memory _status, string memory _container) public {
        require(orderExists[_orderNo], "Order does not exist.");
        orders[_orderNo].status = _status;
        orders[_orderNo].container = _container;
    }

    function getOrder(string memory _orderNo) public view returns (string memory, string memory, string memory, string memory, string memory, string memory) {
        require(orderExists[_orderNo], "Order does not exist.");
        Order memory order = orders[_orderNo];
        return (order.orderNo, order.orderDate, order.orderBy, order.shipTo, order.container, order.status);
    }
}
