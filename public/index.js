window.myerrors = []
window.onerror = function(message, source, lineno, colno, error) {
    var errorObj = {message:message, source : source, lineno : lineno, colno : colno}
    var xhr = new XMLHttpRequest()
    xhr.open("POST","http://localhost:8093/api/postError")
    xhr.setRequestHeader("Content-type","application/json")
    xhr.send(JSON.stringify(errorObj))
    window.myerrors.push(errorObj)
    return true
}
