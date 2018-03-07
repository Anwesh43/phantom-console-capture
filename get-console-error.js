var system = require('system')
var args = system.args
if(args.length == 2) {
    var url = args[1]
    var page = require('webpage').create()
    page.onConsoleMessage = function(message) {
        console.log("console message")
        console.log(message)
    }
    page.onResourceError = function(error) {
        console.log("resource error")
        console.log(JSON.stringify(error))
    }
    page.onLoadFinished = function() {
        setTimeout(function() {
            console.log("load completed")
            phantom.exit()
        }, 1000)
    }
    page.open(url)
}
else {
    console.log("please provide url as the only argument")
    phantom.exit()
}
