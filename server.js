var express = require('express'), app = express(), faye = require('faye'), bayeux = new faye.NodeAdapter({mount: '/faye', timeout: 45});
app.use(express.bodyParser());
server = app.listen(3000);
bayeux.attach(server);
testdata = []
app.get('/foos.json', function(req, res) {
  jsonpackage = JSON.stringify(testdata)
  res.send(jsonpackage)
});
app.post('/foos.json', function(req, res) {
  testdata.push(req.body)
  res.end();
  bayeux.getClient().publish('/foos', req.body);
});