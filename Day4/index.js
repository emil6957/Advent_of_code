import { readFileSync } from "fs";

function getFileData(fileLocation) {
    const fileData = readFileSync(fileLocation, "utf8", (err, data) => {
        if(err) throw err; 
        return data;
    });
    return fileData;
};
const inputLocation = "./Day4/input.txt";
const inputData = getFileData(inputLocation);

const inputArray = inputData.split("\n");

let answer = 0;

for (let i = 0; i < inputArray.length; i++) {
    const [,numData] = inputArray[i].split(":");
    let [winningNums, nums] = numData.split("|");

    winningNums = winningNums.trim().split(" ").filter((item) => Number.isInteger(parseInt(item)));
    nums = nums.trim().split(" ").filter((item) => Number.isInteger(parseInt(item)));

    let sum = 0;
    for(let j = 0; j < nums.length; j++) {
        for(let x = 0; x < winningNums.length; x++) {
            if (winningNums[x] === nums[j]) {
                if (sum === 0) {
                    sum += 1;
                } else {
                    sum *= 2;
                };
            };
        };
    };
    answer += sum;
};

console.log(answer);