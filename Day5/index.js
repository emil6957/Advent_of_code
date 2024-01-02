import { readFileSync } from "fs";

function getFileData(fileLocation) {
    const fileData = readFileSync(fileLocation, "utf8", (err, data) => {
        if(err) throw err; 
        return data;
    });
    return fileData;
};
const inputLocation = "./Day5/input.txt";
const inputData = getFileData(inputLocation);