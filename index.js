var express = require('express');
var moment = require('moment');

var app = express();

app.set('port', (process.env.PORT || 5000));

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.get('/:time_query', function(req, res) {
  var time;
  if (req.params.time_query === parseInt(req.params.time_query).toString()) {
    time = moment.unix(parseInt(req.params.time_query));
  } else {
    time = moment(
      req.params.time_query,
      [
        'MMMM D, Y',
        'MMMM D Y',
        moment.ISO_8601
      ]
    );
  }
  if (time.isValid()) {
    res.json({
      unix: time.unix(),
      natural: time.format('MMMM D, Y')
    });
  } else {
    res.json({
      unix: null,
      natural: null
    });
  }
});

app.listen(app.get('port'), function() {
  console.log('App is listening on port', app.get('port'));
});
