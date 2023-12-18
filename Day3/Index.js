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

// for part 1
// const numbers = [];
// for (let i = 0; i < inputArray.length; i++) {
//     for (let j = 0; j < inputArray[i].length; j++) {
//         let num = "";
//         if (number.test(inputArray[i][j])) {
//             while (number.test(inputArray[i][j])) {
//                 num += inputArray[i][j];
//                 j++
//             };
//             const above = i === 0 ? "" : inputArray[i-1].substring(j-num.length-1, j+1);
//             const below = i === inputArray.length-1 ? "" : inputArray[i+1].substring(j-num.length-1, j+1);
//             const left = inputArray[i][j-num.length-1] || "";
//             const right = inputArray[i][j] || "";
            
//             if (symbol.test(above) || symbol.test(below) || symbol.test(left) || symbol.test(right)) {
//                 numbers.push(Number(num));
//             };
//         };
//     };
// };
// console.log(numbers.reduce((a, c) => a + c, 0));

let sum = 0;
for (let i = 0; i < inputArray.length; i++) {
    for (let j = 0; j < inputArray[i].length; j++) {
        if (inputArray[i][j] === "*") {
            const numbers = [];
            
            const top = i === 0 ? "" : inputArray[i-1].substring(j-1, j+2);

            const bot = i === inputArray.length-1 ? "" : inputArray[i+1].substring(j-1, j+2);

            const left = inputArray[i][j-1] || "";
            const right = inputArray[i][j+1] || "";

            if (number.test(top)) {
                let num = "";
                let num2 = "";
                for (let x = j-1; x >= 0; x--) {
                    if (number.test(inputArray[i-1][x])) {
                        num += inputArray[i-1][x];
                    } else break;
                }
                num = num.split("").reverse().join("");

                for(let x = j+1; x < inputArray.length-1; x++) {
                    if (number.test(inputArray[i-1][x])) {
                        num2 += inputArray[i-1][x];
                    } else break;
                };

                if (number.test(top[1])) {
                    num += top[1]+num2;
                    numbers.push(Number(num));
                } else {
                    if (num !== "") numbers.push(Number(num));
                    if (num2 !== "") numbers.push(Number(num2));
                };
            };

            if (number.test(bot)) {
                let num = "";
                let num2 = "";
                for (let x = j-1; x >= 0; x--) {
                    if (number.test(inputArray[i+1][x])) {
                        num += inputArray[i+1][x];
                    } else break;
                }
                num = num.split("").reverse().join("");

                for(let x = j+1; x < inputArray.length-1; x++) {
                    if (number.test(inputArray[i+1][x])) {
                        num2 += inputArray[i+1][x];
                    } else break;
                };

                if (number.test(bot[1])) {
                    num += bot[1]+num2;
                    numbers.push(Number(num));
                } else {
                    if (num !== "") numbers.push(Number(num));
                    if (num !== "") numbers.push(Number(num2));
                };
            };

            if (number.test(left)) {
                let num = "";
                for (let x = j-1; x >= 0; x--) {
                    if (number.test(inputArray[i][x])) {
                        num += inputArray[i][x];
                    } else break;
                }
                numbers.push(Number(num.split("").reverse().join("")));
            };
            if (number.test(right)) {
                let num = "";
                for(let x = j+1; x < inputArray.length-1; x++) {
                    if (number.test(inputArray[i][x])) {
                        num += inputArray[i][x];
                    } else break;
                };
                numbers.push(Number(num));
            };

            if (numbers.length === 2) {
                sum += numbers[0]*numbers[1];
            };
        };
    };
};
console.log(sum);