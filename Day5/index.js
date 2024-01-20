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

const inputArray = inputData.split("\n\n");

// seed-to-soil map:
// 2977255263 3423361099 161177662
// 3464809483 1524036300 40280620
// turn that into 
// [[2977255263, 3423361099, 161177662], [3464809483, 1524036300, 40280620]]
const [,seeds] = inputArray[0].split(": ").map((item) => item.split(" "));
const [,seedToSoil] = inputArray[1].split(":\n").map((item) => item.split("\n").map((item) => item.split(" ")));
const [,soilToFertilizer] = inputArray[2].split(":\n").map((item) => item.split("\n").map((item) => item.split(" ")));
const [,fertilizerToWater] = inputArray[3].split(":\n").map((item) => item.split("\n").map((item) => item.split(" ")));
const [,waterToLight] = inputArray[4].split(":\n").map((item) => item.split("\n").map((item) => item.split(" ")));
const [,lightToTemperature] = inputArray[5].split(":\n").map((item) => item.split("\n").map((item) => item.split(" ")));
const [,temperatureToHumidity] = inputArray[6].split(":\n").map((item) => item.split("\n").map((item) => item.split(" ")));
const [,humidityToLocation] = inputArray[7].split(":\n").map((item) => item.split("\n").map((item) => item.split(" ")));

// seedToSoil[i][0] = destination range start;
// seedToSoil[i][1] = source range start;
// seedToSoil[i][2] = range length;
// ranges are counted as such:
// 90 source range start with a range length of 3 will be 90, 91, 92
// range length includes the number + range - 1;

const mapConversion = (item, mapType) => {
    // item = INT;
    // mapType = [[INT, INT, INT], [INT, INT, INT], ...];
    let newItem = Number.parseInt(item);
    for (let i = 0; i < mapType.length; i++) {
        const destinationMin = Number.parseInt(mapType[i][0]);
        const sourceMin = Number.parseInt(mapType[i][1]);
        const range = Number.parseInt(mapType[i][2]);
        const destinationMax = destinationMin + range - 1;
        const sourceMax = sourceMin + range - 1; 
        
        if (sourceMax >= newItem && newItem >= sourceMin) {
            newItem = newItem - sourceMin + destinationMin;
            return newItem;
        };
    };
    return newItem;
};


const locations = [];
for (let i = 0; i < seeds.length-2; i+=2) {
    const seedRangeMin = seeds[i];
    const seedRangeMax = seeds[i+1] - 1;
    for (let j = seedRangeMin; j < seedRangeMax; j++) {
        const seed = j;
        const soil = mapConversion(seed, seedToSoil);
        const fertilizer = mapConversion(soil, soilToFertilizer)
        const water = mapConversion(fertilizer, fertilizerToWater);
        const light = mapConversion(water, waterToLight);
        const temperature = mapConversion(light, lightToTemperature)
        const humidity = mapConversion(temperature, temperatureToHumidity);
        const location = mapConversion(humidity, humidityToLocation);
    
        locations.push(location);
    };
};

console.log(locations);
const ordered = locations.sort((a, b) => a - b);
console.log(ordered[0]);