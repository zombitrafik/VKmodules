var express = require('express');
var VK = require('vksdk');

var app = express();

var vk = new VK({
    'appID'     : 5002560,
    'appSecret' : 'DxgrLEDQGv94uODwpY9d',
    'mode'      : 'oauth'
});


app.get('/', function (req, res) {

	vk.requestServerToken();

	// Waiting for special 'serverTokenReady' event
	vk.on('serverTokenReady', function(_o) {
	    // Here will be server access token
	    res.json({data: _o});
	});

    
});

app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});
