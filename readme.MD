### phantom-console-capture

#### Capturing console error in node js with phantomjs.

### Running the project

#### Install nodejs, post that install phantomjs

```
    npm install -g phantomjs
```

#### Starting the server.
```
    npm Install
    node app.js
```

#### Starting the script

```
    phantomjs get_console_output_with_details.js {http/https url}
    phantomjs get_console_output_with_details.js https://www.icicibank.com
```

#### You can see console errors are captured in server. To modify the end_point in public/index.js capture errors in your backend.
