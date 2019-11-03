const http = require('http');
const fs = require('fs');
const qs = require('querystring');
const url = require('url');
const path = require('path');

var imgExt = new Array(".png",".jpg",".jpeg",".bmp",".gif");
var cssExt = new Array(".css");
var jsExt = new Array(".js");

Array.prototype.contain = function(obj){
    for(var i=0; i<this.length; i++){
        if(this[i] === obj)
            return true;
    }
    return false;
};

var requestHandlers = require("./requestHandlers");

function onRequest(request, response){
    var userList = [
        {username: "admin", pwd: "admin"}
    ];
    
    var arr=requestHandlers.arr;


    var arr2=url.parse(request.url).path.split('/');
    arr2.splice(0,2);
    var val='/'+arr2.join('/');
    var arr3=url.parse(request.url).path.split('/');
    arr3.splice(0,1);
    var val2='/'+arr3.join('/');
    var pathname;
    var val3='/'+request.url.split('/')[1]+'/';


    if(val3==='/list/'){
        pathname=val;
    }else if(val3==='/login/'){
        pathname=val;
    }else if(val3==='/listmanager/'){
        pathname=val;
    }else if(val3==='/addChapter/'){
        pathname=val;
    }else if(val3===`/Login?user=${userList[0].username}&password=${userList[0].pwd}/`){
        pathname=val2;
    }else if(val3===`/listmanager?title=${encodeURI(encodeURI(arr[0]))}&content=${encodeURI(encodeURI(arr[1]))}/`){
        pathname=val2;
    }else{
        pathname=val2;
    }
    
    
    //requestHandlers的handle属性又是一个对象，该对象包含多组属性：属性值，属性名对应uri，属性值对应处理函数，详见requestHandlers.js
    if(typeof requestHandlers.handle[pathname] === "function"){
        requestHandlers.handle[pathname](request, response);
    }
    //处理图片链接
    else if(typeConfirm(imgExt,request.url)){
        var ext = path.extname(path.basename(request.url)) ;
        console.log("ext:" + ext);
        requestHandlers.getImage(request, response, pathname);
    }
    //处理CSS链接
    else if(typeConfirm(cssExt,request.url)){
        requestHandlers.getCSS(request, response, pathname);
    }
    //处理JS链接
    else if(typeConfirm(jsExt,request.url)){
        requestHandlers.getJS(request, response, pathname);
    }
    else if(request.url ==='/list/'){
        //response.writeHead(响应状态码，响应头对象): 发送一个响应头给请求。
        response.writeHead(200,{'Content-Type':'text/html'})
        fs.readFile('./chapterList.html','utf-8',function(err,data){
            if(err){
                throw err ;
            }
            response.end(data);
        });
    }
    else if(request.url === '/login/'){
        response.writeHead(200,{'Content-Type':'text/html'});
        fs.readFile('./login.html','utf-8',function(err,data){
            if(err){
                throw err ;
            }
            response.end(data);
        });
    }
    else if(request.url === '/detail?chapterId=1'){
        response.writeHead(200,{'Content-Type':'text/html'});
        fs.readFile('./chapter.html','utf-8',function(err,data){
            if(err){
                throw err ;
            }
            response.end(data);
        });
    }
    else if(request.url === '/detail?chapterId=2'){
        response.writeHead(200,{'Content-Type':'text/html'});
        fs.readFile('./chapter.html','utf-8',function(err,data){
            if(err){
                throw err ;
            }
            response.end(data);
        });
    }
    else if(request.url === '/detail?chapterId=3'){
        response.writeHead(200,{'Content-Type':'text/html'});
        fs.readFile('./chapter.html','utf-8',function(err,data){
            if(err){
                throw err ;
            }
            response.end(data);
        });
    }
    else if(request.url === '/detail?chapterId=4'){
        response.writeHead(200,{'Content-Type':'text/html'});
        fs.readFile('./chapter.html','utf-8',function(err,data){
            if(err){
                throw err ;
            }
            response.end(data);
        });
    }
    else if(request.url === '/listmanager/'){
        response.writeHead(200,{'Content-Type':'text/html'});
        fs.readFile('./list.html','utf-8',function(err,data){
            if(err){
                throw err ;
            }
            response.end(data);
            console.log(arr);
        });
    }
    else if(request.url === '/addChapter/'){

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
    }
    else if(request.url === `/Login?user=${userList[0].username}&password=${userList[0].pwd}`){
        response.writeHead(200,{'Content-Type':'text/html'});
        fs.readFile('./list.html','utf-8',function(err,data){
            if(err){
                throw err ;
            }
            response.end(data);
        });
    }
    else if(request.url === `/listmanager?title=${encodeURI(encodeURI(arr[0]))}&content=${encodeURI(encodeURI(arr[1]))}`){
        response.writeHead(200,{'Content-Type':'text/html'});
        fs.readFile('./list.html','utf-8',function(err,data){
            if(err){
                throw err ;
            }
            response.end(data);
        });
    }
    else {
        response.writeHead(200,{'Content-Type':'text/html'});
            fs.readFile('./error.html','utf-8',function(err,data){
                if(err){
                    throw err ;
                }
            response.end(data);
        });
    }
}
http.createServer(onRequest).listen(8083);
    
function typeConfirm(type,url){
    var ext = path.extname(path.basename(url));
    if(type.contain(ext)){        
        return true;
    }
    return false;
}