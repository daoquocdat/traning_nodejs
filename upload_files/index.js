var http = require('http');
var fs = require('fs');
var formidable = require('formidable');

http.createServer(function (req, res) {
    if (req.url === '/fileupload' && req.method.toLowerCase() === 'post') {
        // parse a file upload
        const form = formidable({ multiples: true });
    
        form.parse(req, (err, fields, files) => {
          if (err) {
            res.end('lỗi');
            return;
          }
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ files }, null, 2));
        });
    
        return;
      }
    
      // show a file upload form
      else{
        fs.readFile('upload.html', function(err, data) {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(data);
            return res.end();   
        });
      }
  }).listen(8000);