var handle = {};
var fs = require("fs");
var url = require("url");
var qs = require('querystring');

handle["/"] = start;
handle["/start"] = start;

var arr=[];
//读取文件并输出
function start(request, response) {
    if(url.parse(request.url).path==='/list/'){
        fs.readFile("./chapterList.html", function (err, html) {
            if (err) throw err;     
            response.writeHead(200, {"Content-Type": "text/html"});
            response.write(html);
            response.end();
        });
    }else if(url.parse(request.url).path==='/login/'){
        fs.readFile("./login.html", function (err, html) {
            if (err) throw err;     
            response.writeHead(200, {"Content-Type": "text/html"});
            response.write(html);
            response.end();
        });
    }else if(url.parse(request.url).path==='/detail?chapterId=1'){
        fs.readFile("./chapter.html", function (err, html) {
            if (err) throw err;     
            response.writeHead(200, {"Content-Type": "text/html"});
            response.write(html);
            response.end();
        });
    }else if(url.parse(request.url).path==='/detail?chapterId=2'){
        fs.readFile("./chapter.html", function (err, html) {
            if (err) throw err;     
            response.writeHead(200, {"Content-Type": "text/html"});
            response.write(html);
            response.end();
        });
    }else if(url.parse(request.url).path==='/detail?chapterId=3'){
        fs.readFile("./chapter.html", function (err, html) {
            if (err) throw err;     
            response.writeHead(200, {"Content-Type": "text/html"});
            response.write(html);
            response.end();
        });
    }else if(url.parse(request.url).path==='/detail?chapterId=4'){
        fs.readFile("./chapter.html", function (err, html) {
            if (err) throw err;     
            response.writeHead(200, {"Content-Type": "text/html"});
            response.write(html);
            response.end();
        });
    }else if(url.parse(request.url).path==='/listmanager/'){
        fs.readFile("./list.html", function (err, html) {
            if (err) throw err;     
            response.writeHead(200, {"Content-Type": "text/html"});
            response.write(html);
            response.end();
        });
    }else if(url.parse(request.url).path==='/addChapter/'){
        var postHTML = fs.readFileSync('./addChapter.html');
        var data = "";
        request.on('data', (chunk)=> {
            data += chunk;
        });
        request.on('end', ()=> {
            // 解析参数
            body = qs.parse(data);
            // 设置响应头部信息及编码
            response.writeHead(200, {'Content-Type': 'text/html; charset=utf8'});
            response.write(postHTML);
            arr[0]=body.title;
            arr[1]=body.content;
            response.end();
            console.log(arr);
        });
    }else if(url.parse(request.url).path===`/Login?user=${userList[0].username}&password=${userList[0].pwd}`){
        fs.readFile("./list.html", function (err, html) {
            if (err) throw err;     
            response.writeHead(200, {"Content-Type": "text/html"});
            response.write(html);
            response.end();
        });
    }else if(url.parse(request.url).path===`/listmanager?title=${encodeURI(encodeURI(arr[0]))}&content=${encodeURI(encodeURI(arr[1]))}`){
        fs.readFile("./list.html", function (err, html) {
            if (err) throw err;     
            response.writeHead(200, {"Content-Type": "text/html"});
            response.write(html);
            response.end();
        });
    }else{
        fs.readFile("./error.html", function (err, html) {
            if (err) throw err;     
            response.writeHead(200, {"Content-Type": "text/html"});
            response.write(html);
            response.end();
        });
    }
}

function getImage(request, response, pathname){
    //这里需要去掉pathname最前面的"/"符号，fs.readFile()才能识别，所以使用pathname.substring(1)
    //或者在pathname前面加上表当前目录的“.”号，推荐使用后面这种
    fs.readFile("." + pathname, function (err, result) {
        if (err) throw err;     
        response.writeHead(200, {"Content-Type": "image/jpeg"});
        response.write(result,"binary");
        response.end();
    });
}

function getCSS(request, response, pathname){
    //这里必须去掉pathname最前面的"/"符号，fs.readFile()才能识别，所以使用pathname.substring(1)
    fs.readFile("." + pathname, function (err, result) {
        if (err) throw err;     
        response.writeHead(200, {"Content-Type": "text/css"});
        response.write(result);
        response.end();
    });
}

function getJS(request, response, pathname){
    //这里必须去掉pathname最前面的"/"符号，fs.readFile()才能识别，所以使用pathname.substring(1)
    fs.readFile("." + pathname, function (err, result) {
        if (err) throw err;     
        response.writeHead(200, {"Content-Type": "text/javascript"});
        response.write(result);
        response.end();
    });
}

exports.handle = handle;
exports.start = start;
exports.getImage = getImage;
exports.getCSS = getCSS;
exports.getJS = getJS;
exports.arr = arr;