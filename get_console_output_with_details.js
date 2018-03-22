var system = require('system')
var page = require('webpage').create()
var scriptLoaded = false
var resource_errors = []
page.settings.userAgent =  'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/28.0.1500.71 Safari/537.36';
//console.log(JSON.stringify(page.settings))
page.onInitialized = function() {
    scriptLoaded = page.injectJs('public/index.js')
}

var requests = []
var loaded = false
page.onResourceRequested = function(req) {
    requests.push(req.url)
}
page.onResourceReceived = function(response) {
  //console.log('Receive ' + JSON.stringify(response, undefined, 4));
  requests = requests.filter(function(url){
      return url == response.url
  })
  //console.log(response.url +" "+response.status)
  if(requests.length == 0) {
      loaded = true
  }
}
page.onResourceError = function(err) {
    resource_errors.push(err);
    //console.log("RESOURCE_ERROR:"+JSON.stringify(err))
}
// page.onConsoleMessage = function(message, lineNo, source) {
//     console.log("CONSOLE_MESSAGE:" + JSON.stringify({message:message,lineNo:lineNo,source:source}))
// }
var page_errors = []
page.onError = function(m,trace) {
    console.log("error here " + m);
    trace.forEach(function(t,i) {
        if (i == 0) {
            var error = {message:m, source:t.file, lineno:t.line, colno:-1}
            console.log("PAGE_ERROR:"+JSON.stringify(error))
            page_errors.push(error)
        }
    })
}
page.onConsoleMessage = function(msg, lineNum, sourceId) {
    //console.log(msg + " " + " " + lineNum +" " + sourceId)
}
if(system.args.length == 2) {
    var url = system.args[1]
    page.open(url, function(status) {
        if(status === "success" && scriptLoaded) {
            // var errors = page.evaluate(function(){
            //     return window.myerrors
            // })
        }
        else {
            console.log("SCRIPT_ERROR")
        }
    })
}
else {
    console.log("INVALID_ARGUMENT")
    phantom.exit()
}
page.onLoadFinished = function() {
    // setTimeout(function() {
    //     console.log("RESOURCE_ERRORS:" + JSON.stringify(resource_errors))
    //     phantom.exit()
    // }, 3000)
    //console.log(page.content)
    setInterval(function() {
        if(requests.length == 0) {
            //console.log("RESOURCE_ERRORS:" + JSON.stringify(resource_errors))
            console.log("CONSOLE_ERRORS:"+JSON.stringify(page_errors))
            phantom.exit()
        }
    }, 3000)
}
