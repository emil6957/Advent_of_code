const time = [41, 77, 70, 96];
const distance = [249, 1362, 1127, 1011];

const ans = [];
for (let i = 0; i < time.length; i++) {
    let count = 0;
    for (let j = 0; j < time[i]; j++) {
        if ((time[i] - j) * j > distance[i]) {
            count += 1;
        };
    };
    ans.push(count);
};

let x = ans.reduce((a, b) => a * b);
console.log(x);