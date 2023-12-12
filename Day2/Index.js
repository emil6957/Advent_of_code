import { readFileSync } from "fs";

function getFileData(fileLocation) {
    const fileData = readFileSync(fileLocation, "utf8", (err, data) => {
        if(err) throw err; 
        return data;
    });
    return fileData;
};
const inputLocation = "./Day2/input.txt";
const inputData = getFileData(inputLocation);
const inputArray = inputData.split("\n");

// 12 red, 13 green, 14 blue for part 1;
let sum = 0;
let maxRed = 0;
let maxGreen = 0;
let maxBlue = 0;
inputArray.forEach((item) => {
    // let gameIsValid = true;  PART 1 CODE
    const [gameName, gameResult] = item.split(":");
    const [, gameId] = gameName.split(" ");
    const gameRounds = gameResult.split(";");
    maxRed = 0;
    maxGreen = 0;
    maxBlue = 0;
    gameRounds.forEach((round) => {
        const cubes = round.split(",");
        cubes.forEach((cube) => {
            let [number, color] = cube.trim().split(" ");
            number = parseInt(number);
            if (color === "blue") {
                maxBlue = Math.max(maxBlue, number);
            }
            if (color === "green") {
                maxGreen = Math.max(maxGreen, number);
            }
            if (color === "red") {
                maxRed = Math.max(maxRed, number);
            }
            // if (color === "blue" && number > maxBlue) {      PART 1 CODE
            //     gameIsValid = false; 
            // };
            // if (color === "green" && number > maxGreen) {
            //     gameIsValid = false;
            // };
            // if (color === "red" && number > maxRed) {
            //     gameIsValid = false;
            // };
        });
    });
    sum += (maxRed*maxGreen*maxBlue);
    // if (gameIsValid) {   PART 1
    //     sum += parseInt(gameId);
    // };
});

console.log(sum);