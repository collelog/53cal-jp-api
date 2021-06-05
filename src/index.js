const express = require('express');
require('express-async-errors');
const app = express();

const dayjs = require('dayjs');

const gomiCal = require('53cal-jp-scraper');

app.get('/whatDate', async (req, res, next) => {

    var city = req.query.city;
    var area = req.query.area;

    if (typeof city === 'undefined') city='1130104';
    if (typeof area === 'undefined') area='1130104154';
    var scraper = gomiCal({city: city, area: area});

    var targetDay=req.query.date;
    if (typeof targetDay === 'undefined') targetDay=dayjs().format('YYYY-MM-DD');

    var addDay=req.query.addday;
    if (typeof addDay === 'undefined') addDay = 0;
    if (addDay > 0) targetDay=dayjs(targetDay).add(addDay, 'd').format('YYYY-MM-DD');

    scraper.whatDate(targetDay, function(err, data){
        if (err) return console.error(err);
        console.log(data);

        var result = data.result[targetDay];
        if (result === null){
            result='収集なし'; 
        } else {
            result=result.replace(/\n/g,'・')
        }

        var param = {
            'date':targetDay,
            'result':result
          };
        res.json(param);
    });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send('Internal Server Error');
});

app.listen(8901, () => console.log('http://localhost:8901'));
