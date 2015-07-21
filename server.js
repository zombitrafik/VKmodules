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
	res.redirect('https://oauth.vk.com/authorize?client_id=5002560&redirect_uri=https://vkmodules.herokuapp.com/callback&scope=notify,friends,video,wall,offline&display=page&response_type=code');
});


app.get('/callback', function (req, res) {
	var code = req.query.code;
	vk.setToken({ code : code });
	return vk.on('tokenByCodeReady', function() {

	    vk.request('getProfiles', {'uids' : '29894'});

	    return vk.on('done:getProfiles', function(_o) {
			return res.json(_o);
		});

	});
});


app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});
