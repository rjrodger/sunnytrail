
var util   = require('util')
var assert = require('assert')

var sunnytrail = require('sunnytrail')

var apikey = 'YOUR API KEY'

module.exports = {
  errors: function() {
    var st = new sunnytrail.SunnyTrailError();
    assert.equal( 'generic', st.code )

    st = new sunnytrail.SunnyTrailError('invalidapikey', 'details etc')
    assert.equal( 'invalidapikey', st.code )
    assert.equal( 'Invalid Sunnytrail API Key: details etc', ''+st )
  },
  send: function() {
    var st = new sunnytrail.SunnyTrail(apikey,null,true)
    var eventA = {}
    st.send(eventA,function(err,body){
      util.debug(err)
      util.debug(body)
      assert.isNotNull(err)
    })

    var eventB = {"id": 101, 
             "name": "John Smith", 
             "email": "johnsmith@acmecorp.com",
             "action": {"name": "signup", 
                        "created": 1281876860},
             "plan": {"price": 0, 
                      "name": "Trial Plus 99"}} 
    st.send(eventB,function(err,body){
      util.debug(err)
      util.debug(body)
      assert.isNull(err)
    })
  }
}