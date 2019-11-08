var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');


/* GET home page. */
router.get('/', function(req, res/*, next*/) {
  if(typeof req.cookies.login === 'undefined') {
    res.render('login');
    console.log(data);
  } else if(req.cookies.login === 'true') {
    res.render('list');
  } else {
    res.render('login');
  }
});

router.post('/login', function(req, res) {
  var file = path.join(__dirname, '../../data.json');
  var user=[];
  fs.readFile(file, 'utf-8', function(err, data) {
    if (err) {
      console.log('文件读取失败');
    } else {
      user=JSON.parse(data).users[0];
      if(req.body.username === user.username && req.body.password === user.password) {
        res.cookie('login', true);
        res.render('list');
      } else {
        res.render('index');
      }
    }
  });
});

router.get('/logout', function(req, res){
  res.cookie('login', false);
  res.render('login');
});

router.get('/login_bg.jpg',function(req,res){
  var file=path.join(__dirname, '../../login_bg.jpg');
  res.sendFile(file);
});

router.get('/bg.jpg',function(req,res){
  var file=path.join(__dirname, '../../bg.jpg');
  res.sendFile(file);
});

router.get('/login', function(req, res){
  var file = path.join(__dirname, '../../data.json');
  fs.readFile(file, 'utf-8', function(err, data) {
    if (err) {
      res.send('文件读取失败');
    } else {
      res.send(data);
    }
  });
});

router.get(/\/.*/, function(req, res){
  if(typeof req.cookies.login === 'undefined') {
    res.render('login');
  } else if(req.cookies.login === 'true') {
    res.render('list');
  } else {
    res.render('login');
  }
});

module.exports = router;
