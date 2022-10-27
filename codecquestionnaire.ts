// Please the below code and test cases for the questionnaire
const rightCommand = "R";
const leftCommand = "L";
const frontCommand = "F";
const Direction = {
    North: "N",
    East: "E", 
    South: "S", 
    West: "W"
}
const testInputSize = [[5, 5], [2, 2], [3, 4], [1,1]];
const testInputCommands = ["FFRFLFLF", "RRRF", "FRFFFLLFRRFF", "RRRFLFR"];
const testOutputPosition = [[1,4,"W"], [1,1,"W"], [3,2,"E"], [1,1,"W"]];
runTestCases()

// This method is used for running all test cases at once.
function runTestCases() {
    var i = 0;
    while (i < testInputCommands.length) {
        caseCheck(testInputSize[i], testInputCommands[i], testOutputPosition[i], ++i)
    }
}

// this method checks each test case with the obtained output to whether it passed or failed
function caseCheck(inputPlateauSize: any, inputCommand: string, requiredOutput: any, testCase: number) {
    var obtainedOutput = findPosition(inputPlateauSize[0], inputPlateauSize[1], inputCommand);
    if (obtainedOutput.every((element, index) => element == requiredOutput[index])) {
        console.log("TestCase" + testCase + " Passed");
    } else {
        console.log("TestCase" + testCase + " Failed");
    }
}

// This method is used find the position of the robot after an command is given
// Here we have 3 commands, R and L which are directions and F for movement.
// we also have 4 constriants that limit the movement of robot.
function findPosition(plateauSizeX: number, plateauSizeY: number, command: string) {
    var direction = Direction.North;
    const input = command.toUpperCase();
    var currentPosX = 1;
    var currentPosY = 1;
    var i = 0;
    for (var i = 0; i < input.length; i++) {
        if (input[i] != frontCommand) { // to the direction if the given command is direction command
            direction = setDirection(input[i], direction)
        } else {
            // if its a movement command, checking if there is further movements available on the plateau
            if (!checkConstraints(currentPosX, currentPosY, direction, plateauSizeX, plateauSizeY)) continue;
            else {
                // if movements are available on plateau, then new position of robot is recorded.
                const position = setNewPosition(currentPosX, currentPosY, direction)
                currentPosX = position[0];
                currentPosY = position[1];
            } 
        }
    }
    return [currentPosX, currentPosY, direction]
}

// this method sets the new position of the robot.
function setNewPosition(posX: number, posY: number, currentDirection: string) {
    if (currentDirection == Direction.North) {
        posY++;
    } else if (currentDirection == Direction.East) {
        posX++;
    } else if (currentDirection == Direction.South) {
        posY--;
    } else {
        posX--;
    }
    return [posX, posY];
}

// this method sets the new direction for the robot when a direction command is encountered 
function setDirection(currentInput: string, currentDirection: string) {
   const direction = [Direction.North, Direction.East, Direction.South, Direction.West]; 
   if (currentInput == rightCommand) {
    if (currentDirection == Direction.West) {
        return direction[0];
    }
    return direction[direction.indexOf(currentDirection) + 1];
   } else {
    if (currentDirection == Direction.North) {
        return direction[direction.length - 1];
    }
    return direction[direction.indexOf(currentDirection) - 1];
   }
}

// this method checks the constraints for the movement of robot when a movement command is encountered
// there are 4 constraints that can prevent the movement of robot.
function checkConstraints(posX: number, posY: number, currentDirection: string, 
                            inputPlateauX: number, inputPlateauY: number) {
     if ((posX == 1 && currentDirection == Direction.South) ||
     (posX == inputPlateauX && currentDirection == Direction.East) ||
     (posY == 1 && currentDirection == Direction.West) || 
     (posY == inputPlateauY && currentDirection == Direction.North)) return 0;
    return 1;
}
