const x = 10;
const y = null;

// ถ้า x เป็น 10 ให้แสดงค่า iron man ถ้าไม่ใช่ให้แสดงค่า hulk
x == 10 ? console.log('iron man') : console.log('hulk');

// ถ้า y เป็น null หรือ undefined ให้แสดงค่า thor
y ?? console.log('thor');
