var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/*', function(request, response) {
  let path = request.originalUrl.substr(1);
  let pageStyle = 'content';
  if (!path.length) {
    path = 'index';
    pageStyle = 'center';
  }
  console.log(path, 'requested');
  app.render('partials/' + path + '.ejs', {}, function(error) {
    if (error || path === '404') {
      path = '404';
      pageStyle = 'center';
    }
  })
  response.render('pages/index', {page: path, pageStyle: pageStyle});
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
