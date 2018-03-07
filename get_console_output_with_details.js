var system = require('system')
var page = require('webpage').create()
var scriptLoaded = false
page.onInitialized = function() {
    scriptLoaded = page.injectJs('public/index.js')
}
page.onResourceError = function(error) {
    console.log("resource error")
    console.log(JSON.stringify(error))
}
if(system.args.length == 2) {
    var url = system.args[1]
    page.open(url, function(status) {
        if(status === "success" && scriptLoaded) {
            var errors = page.evaluate(function(){
                return window.myerrors
            })
            console.log("CONSOLE_ERRORS:"+JSON.stringify(errors))
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
    setTimeout(function() {
        phantom.exit()
    }, 1000)
}
