const express = require('express')
const app = express();

//csv
const csv = require('csv-parser')
const fs = require('fs')
const results = [];
const csvData = './NOMotorNOBLE.csv';

app.get('/', (req, res) => {
  res.send('Shalom Zo!')
});

app.listen(8000, () => {
  console.log('Example app listening on port 8000!')
  readCsv();
});
 
function readCsv () {
console.log('-------------------readCsv--------------------')
fs.createReadStream(csvData)
  .pipe(csv())
  .on('data', (data) => results.push(data))
  .on('end', () => {
    console.log(results);
    // [
    //   { NAME: 'Daffy Duck', AGE: '24' },
    //   { NAME: 'Bugs Bunny', AGE: '22' }
    // ]
  });
}