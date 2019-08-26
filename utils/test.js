const xlsx = require('node-xlsx');
const obj = xlsx.parse(__dirname + '/test.xlsx');
const result = [];
for (const sheet in obj) {
  const sheetData = obj[sheet].data;
  sheetData.forEach(item => {
    result.push({
      name: item[0],
      'one-month': item[1] === '√'
    });
  });
}
console.log(JSON.stringify(result));
