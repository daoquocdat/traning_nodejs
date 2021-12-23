var http = require('http')
var fs = require('fs')

http.createServer(function (req, res) {
    //hàm đọc file 
    fs.readFile('hello.html', function(err, data) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        return res.end();
    });
    //hàm tạo file mới nếu chưa tồn tại, nếu đã tồn tại thì thay thế nội dung
    fs.writeFile('testFile.txt', 'Hello content!', function (err) {
        if (err) throw err;
        console.log('Successfully!');
    });
    //hàm xóa file
    fs.unlink('testFile2.txt', function (err) {
        if (err) throw err;
        console.log('Deleted!');
    });
}).listen(8000);