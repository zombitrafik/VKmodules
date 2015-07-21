var express = require('express');
var bodyParser = require('body-parser');
var VK = require('vksdk');

var app = express();

var vk = new VK({
    'appId'     : 5002560,
    'appSecret' : 'DxgrLEDQGv94uODwpY9d',
    'mode'      : 'oauth'
});


app.get('/', function (req, res) {
	res.redirect('https://oauth.vk.com/authorize?client_id=5002560&redirect_uri=https://vkmodules.herokuapp.com/callback&scope=wall&display=page&response_type=code');
});


app.get('/callback', function (req, res) {
	var code = req.query.code;
	vk.setToken({ code : code });
	vk.on('tokenByCodeReady', function() {
		console.log('1234');
	    vk.request('getProfiles', {'uids' : '29894'});

	    vk.on('done:getProfiles', function(_o) {
		    console.log(_o);
		});
		
	});
	vk.on('tokenByCodeNotReady', function(_error) {
	    console.log('error ' + _error);
	});
});


app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});
