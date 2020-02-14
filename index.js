const express = require('express')
const app = express();

//csv
const csv = require('csv-parser')
const fs = require('fs')
const results = [];
const FilteredResults = [];
const csvData = './NOMotorNOBLE.csv';

app.get('/', async (req, res) => {
    await filterData();
    await res.json(FilteredResults);
});

app.listen(8000, () => {
  console.log('App listening on port 8000!')
  readCsv();
});
 
const readCsv = async() => {
console.log('-------------------readCsv--------------------')
await fs.createReadStream(csvData)
  .pipe(csv())
  .on('data', (data) => results.push(data))
  .on('end', () => {
    console.log('finished reading and saving the results',results.length)
    //console.log(results);
  });
}

  const filterData = () => {
      console.log('-------------filterData-------------');
      let isNewSequence = true;
      for (row of results){
        console.log('isNewSequence?',isNewSequence, ' row:',row['number of points'])
          if (row['number of points'] > 1 && isNewSequence){
            isNewSequence = false;
            FilteredResults.push(row);
            console.log('pushed!')
          } else if (row['number of points'] <= 1 && !isNewSequence){
              isNewSequence = true;
          }
      }
      console.log('FilteredResults:',FilteredResults);
  }
