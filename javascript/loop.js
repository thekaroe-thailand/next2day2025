for (let i = 1; i <= 10; i++) {
    console.log(i);
}

const array = ['apple', 'banana', 'cherry'];

for (let i = 0; i < array.length; i++) {
    console.log(array[i]);
}
for (const item of array) {
    console.log(item);
}
array.forEach((item) => {
    console.log(item);
});
array.map((item) => {
    console.log(item);
});
