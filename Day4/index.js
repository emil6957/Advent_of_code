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
let cards = {};

for (let i = 0; i < inputArray.length; i++) {
    const [cardNumData,] = inputArray[i].split(":");
    const cardNum = cardNumData.trim().split(" ").filter((item) => item !== "").join("-");
    cards[cardNum] = 1;
};

for (let i = 0; i < inputArray.length; i++) {
    const [cardNumData, numData] = inputArray[i].split(":");
    const cardNum = cardNumData.trim().split(" ").filter((item) => item !== "").join("-");

    let [winningNums, nums] = numData.split("|");
    winningNums = winningNums.trim().split(" ").filter((item) => Number.isInteger(parseInt(item)));
    nums = nums.trim().split(" ").filter((item) => Number.isInteger(parseInt(item)));

    let sum = 0;
    for(let j = 0; j < nums.length; j++) {
        for(let x = 0; x < winningNums.length; x++) {
            if (winningNums[x] === nums[j]) {
                sum += 1;
            };
        };
    };

    sum *= 1;
    for(let j = 1; j <= sum; j++) {
        let [cardText,idNum] = cardNum.split("-");
        idNum = parseInt(idNum);
        const nextCard = [cardText, idNum+j].join("-"); 
        if (cards.hasOwnProperty(nextCard) === false) break;
        cards[nextCard] += cards[cardNum];
    };
};

for (const card in cards) {
    answer += cards[card];
};

console.log(cards);
console.log(answer);