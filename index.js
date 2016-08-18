var express = require('express');
var moment = require('moment');

var app = express();

app.set('port', (process.env.PORT || 5000));

app.get('/:time_query', function(req, res) {
  var time = moment(req.params.time_query);
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
