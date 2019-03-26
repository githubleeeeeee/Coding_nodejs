var http = require('http');
var express = require('express');
var smartmirror = express();
smartmirror.use(express.static(__dirname+"/public"));
http.createServer(smartmirror).listen(8000,function() {
  console.log('server on 8000...');
});


var exec_video = require('child_process').exec;
var video_path = __dirname+"/public/video/"+Date.now()+'.h264';

var cmd_video = 'raspivid -o '+video_path+' -t 4000';

exec_video(cmd_video, function(error, stdout, stferr) {
   console.log('Video Saved : ',video_path);
   require('./mailer').sendEmail(video_path);
});

function exit() {
   process.exit();
}