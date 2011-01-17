Introduction
============

This is a nodejs wrapper for the SunnyTrail API: http://api.sunnytrail.com


Usage
=====
    var sunnytrail = require('./path/to/sunnytrail/lib/sunytrail.js')
    var apikey = '...'
    
    var st = new sunnytrail.SunnyTrail(apikey)
    
    var event = {"id": 101, 
             "name": "John Smith", 
             "email": "johnsmith@acmecorp.com",
             "action": {"name": "signup", 
                        "created": 1281876860},
             "plan": {"price": 0, 
                      "name": "Trial Plus 99"}} 
    
    st.send(event,function(err,body){
       // err is non-null of there was an error
       // body contains response form SunnyTrail, if any
    })


API
===

The SunnyTrail constructor takes three arguments:

*   apikey (required), your SunnyTrail API Key
*   host (optional, default=api.sunnytrail.com), SunnyTrail API host
*   use_ssl (optional, default=false), use HTTPS requests


Warning
=======

HTTP works with node 0.3.5
HTTPS only works with node 0.2.6


License
=======

Author: Richard Rodger
Copyright: Public Domain













