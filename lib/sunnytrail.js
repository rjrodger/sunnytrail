// SunnyTrail client library.

// The easiest and fastest way to integrate. This file can also 
// be used as CLI tool if you wish to play with the API.

// Author: Richard Rodger
// LIcense: Public Domain


var util = require('util')
var http = require('http')


function SunnyTrailError(code,msg) {
  var msgcodes = {
    'invalidmessage': "Message validation failed on the server: ",
    'invalidapikey': "Invalid Sunnytrail API Key: ",
    'serviceunavailable': "The Sunnytrail message collector is not available: ",
  }

  if( msgcodes[code] ) {
    this.code = code
    this.msg  = msgcodes[code]+msg
  }
  else {
    this.code = 'generic'
    this.msg  = 'Error: '+msg
  }

}
SunnyTrailError.prototype.toString = function() {
  return this.msg
}


function SunnyTrail(key, base_url, use_ssl) {
  var self = this

  self._key = key
  self._host = base_url || 'api.thesunnytrail.com'

  self._messages_url = '/messages?apikey='+escape(self._key)
  self._use_ssl = use_ssl
      
  // Send an event to the API; Callback signature: callback(err,body)
  self.send = function(event,callback) {
    var hc  = http.createClient(self._use_ssl?443:80,self._host,self._use_ssl)
    var body = 'message='+JSON.stringify(event)

    var req = hc.request( 'POST', self._messages_url, 
                          {'Host': self._host,
                           'Content-Type':'application/x-www-form-urlencoded',
                           'Content-Length': body.length
                          })

    req.end(body,'utf8')

    req.on('response',function(res){
      var bodychunks = [];
      res.on('data',function(chunk){
        bodychunks.push(chunk)
      })
      res.on('end',function(){
        var body = bodychunks.join('')
        var code = res.statusCode

        var errmap = {
          0:function(){return new SunnyTrailError('generic',body)},
          401:function(){return new SunnyTrailError('invalidapikey',body)},
          403:function(){return new SunnyTrailError('invalidmessage',body)},
          503:function(){return new SunnyTrailError('serviceunavailable',body)},
        }

        if( 202 != code ) {
          callback( (errmap[code] ? errmap[code] : errmap[0])() ) 
        }
        else {
          callback(null,body)
        }
      })
    })
  }
}
 
exports.SunnyTrailError = SunnyTrailError
exports.SunnyTrail = SunnyTrail