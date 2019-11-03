const http = require('http'),
      qs   = require('querystring'),
      fs   = require('fs');

var isLogin;
var logincount=0;

http.createServer((req, res) => {
  var data = '';

  if(typeof req.headers['cookie'] === 'undefined') {
    isLogin = false;
  } else {
    var pair = req.headers['cookie'].split('=');
    isLogin = (pair[1] === 'true');
  }

  console.log(isLogin);

  if(req.method === 'POST' && req.url === '/login') {
    req.on('data', (chunk) => { data += chunk; });
    req.on('end', () => {
      var account = qs.parse(data);

      if(account.username === 'zhangsan' && account.pwd === '123') {
        console.log('user: %s, password: %s', account.username, account.pwd);
        isLogin = true;
        logincount+=1;
        console.log(logincount);
        showHome(res);
      } else {
        error(res);
      }
    });
  }

  if(req.method === 'GET') {
    if(isLogin) {
      if(req.url === '/logout') {
        isLogin = false;
        res.setHeader('Set-cookie', `login=${isLogin}; max-age=6000000`);
        showLogin(res);
      } else {
        showHome(res);
      }
    } else {
      showLogin(res);
    }
  }
}).listen(8081);

function showLogin(res) {
  var html = fs.readFileSync('./login.html');

  res.setHeader('Content-Type', 'text/html');
  res.setHeader('Content-Length', Buffer.byteLength(html));

  res.statusCode = 200;
  res.end(html);
}

function error(res) {
    var html = '<!DOCTYPE html>'
              + '<html>'
              + '  <head>'
              + '    <meta charset="UTF-8">'
              + '    <title>error</title>'
              + '  </head>'
              + '    <body>'
              + '       <h1>用户名或密码错误</h1>'
              + '       <a href="/login">返回</a>'
              + '    </body>'
              + '</html>';
  
    res.setHeader('Content-Type', 'text/html');
    res.setHeader('Content-Length', Buffer.byteLength(html));
  
    res.statusCode = 200;
    res.end(html);
  }

function showHome(res) {
  var html = '<!DOCTYPE html>'
            + '<html>'
            + '  <head>'
            + '    <meta charset="UTF-8">'
            + '    <title>home</title>'
            + '  </head>'
            + '    <body>'
            + `       <h1>zhangsan这是您第${logincount}次登录</h1>`
            + '       <a href="/logout">返回</a>'
            + '    </body>'
            + '</html>';

  res.setHeader('Content-Type', 'text/html');
  res.setHeader('Content-Length', Buffer.byteLength(html));
  res.setHeader('Set-cookie', `login=${isLogin}; max-age=600`);

  res.statusCode = 200;
  res.end(html);
}