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

function runTestCases() {
    var i = 0;
    while (i < testInputCommands.length) {
        caseCheck(testInputSize[i], testInputCommands[i], testOutputPosition[i], ++i)
    }
}

function caseCheck(input: any, inputCommand: string, requiredOutput: any, testCase: number) {
    var obtainedOutput = findPosition(input[0], input[1], inputCommand);
    if (obtainedOutput.every((element, index) => element == requiredOutput[index])) {
        console.log("TestCase" + testCase + " Passed");
    } else {
        console.log("TestCase" + testCase + " Failed");
    }
}

function findPosition(inputX: number, inputY: number, command: string) {
    var direction = Direction.North;
    const input = command.toUpperCase();
    var currentPosX = 1;
    var currentPosY = 1;
    var i = 0;
    for (var i = 0; i < input.length; i++) {
        if (input[i] != frontCommand) {
            direction = setDirection(input[i], direction)
        } else {
            if (!checkConstraints(currentPosX, currentPosY, direction, inputX, inputY)) continue;
            else {
                const position = setNewPosition(currentPosX, currentPosY, direction)
                currentPosX = position[0];
                currentPosY = position[1];
            } 
        }
    }
    return [currentPosX, currentPosY, direction]
}

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

function checkConstraints(posX: number, posY: number, currentDirection: string, 
                            inputX: number, inputY: number) {
     if ((posX == 1 && currentDirection == Direction.South) ||
     (posX == inputX && currentDirection == Direction.East) ||
     (posY == 1 && currentDirection == Direction.West) || 
     (posY == inputY && currentDirection == Direction.North)) return 0;
    return 1;
}
