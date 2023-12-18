import { readFileSync } from "fs";

function getFileData(fileLocation) {
    const fileData = readFileSync(fileLocation, "utf8", (err, data) => {
        if(err) throw err; 
        return data;
    });
    return fileData;
};
const inputLocation = "./Day3/input.txt";
const inputData = getFileData(inputLocation);

const inputArray = inputData.split("\n");

// scan one by one 2/3 rows at a time once a symbol is caught check the current and next index of main row
// if its a number keep going until hit a non number 
// ...123...
// ...+..1..
// ..1...23+

const symbol = /[^.\d]/;
const number = /[0-9]/;

// When i find a number i need to keep going forward until the last digit
// If i find a symbol 1 index before/after the number or during the loops i can add it to the sum

const numbers = [];
for (let i = 0; i < inputArray.length; i++) {
    for (let j = 0; j < inputArray[i].length; j++) {
        let num = "";
        let bool = false;
        if (number.test(inputArray[i][j])) {
            while (number.test(inputArray[i][j])) {
                num += inputArray[i][j];
                j++
            };
            const above = i === 0 ? "" : inputArray[i-1].substring(j-num.length-1, j+1);
            const below = i === inputArray.length-1 ? "" : inputArray[i+1].substring(j-num.length-1, j+1);
            const left = inputArray[i][j-num.length-1] || "";
            const right = inputArray[i][j] || "";
            
            if (symbol.test(above) || symbol.test(below) || symbol.test(left) || symbol.test(right)) {
                numbers.push(Number(num));
            };
        };
    };
};
console.log(numbers.reduce((a, c) => a + c, 0));