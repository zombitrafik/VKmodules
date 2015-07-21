var express = require('express');
var VK = require('vksdk');

var app = express();

var vk = new VK({
    'appId'     : 5002560,
    'appSecret' : 'DxgrLEDQGv94uODwpY9d',
    'mode'      : 'oauth'
});


app.get('/', function (req, res) {

	/*
	vk.requestServerToken();

	// Waiting for special 'serverTokenReady' event
	vk.on('serverTokenReady', function(_o) {
	    // Here will be server access token
	    res.json({data: _o});
	});
*/
res.redirect('https://oauth.vk.com/authorize?client_id=5002560&redirect_uri=https://vkmodules.herokuapp.com/callback&scope=friends,video,offline&display=popup');

});


app.get('/callback', function (req, res) {
	res.json(req);
});


app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});
