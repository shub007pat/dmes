pragma solidity >=0.4.22 <0.7.0;
pragma experimental ABIEncoderV2;

contract ProcessStepRegistry {
    struct Step {
        string stepType; 
        string partSerialNo;
        string partName;
        uint quantity;
        string operationDescription;
        string units;
    }

    struct ProcessStep {
        string id;
        string mainPartSerialNo;
        string mainPartName;
        Step[] steps;
        string addedBy;
    }

    mapping(string => ProcessStep) public processSteps;
    mapping(string => bool) public processStepExists;

    function addProcessStep(
        string memory _id,
        string memory _mainPartSerialNo,
        string memory _mainPartName,
        Step[] memory _steps,
        string memory _addedBy
    ) public {
        require(!processStepExists[_id], "Process step already exists");
        ProcessStep storage newProcessStep = processSteps[_id];
        newProcessStep.id = _id;
        newProcessStep.mainPartSerialNo = _mainPartSerialNo;
        newProcessStep.mainPartName = _mainPartName;
        for (uint i = 0; i < _steps.length; i++) {
            newProcessStep.steps.push(_steps[i]);
        }
        newProcessStep.addedBy = _addedBy;
        processStepExists[_id] = true;
    }

    // Function to update an existing process step
    function updateProcessStep(string memory _id, Step[] memory _newSteps) public {
        require(processStepExists[_id], "Process step does not exist");
        ProcessStep storage processStep = processSteps[_id];
        delete processStep.steps;  // Clear the existing steps
        for (uint i = 0; i < _newSteps.length; i++) {
            processStep.steps.push(_newSteps[i]);
        }
    }

    // Function to get a process step
    function getProcessStep(string memory _id) public view returns (
    string memory mainPartSerialNo,
    string memory mainPartName,
    string memory addedBy,
    uint stepCount
) {
    require(processStepExists[_id], "Process step does not exist");
    ProcessStep memory processStep = processSteps[_id];
    return (
        processStep.mainPartSerialNo,
        processStep.mainPartName,
        processStep.addedBy,
        processStep.steps.length // Corrected to return uint for step count
    );
}
}
