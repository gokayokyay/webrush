<h1 align="center">
	Webrush
</h1>

[![Build Status](https://cloud.drone.io/api/badges/gokayokyay/webrush/status.svg)](https://cloud.drone.io/gokayokyay/webrush)[![npm version](https://badge.fury.io/js/webrush.svg)](https://badge.fury.io/js/webrush)![NPM](https://img.shields.io/npm/l/webrush)
###### Express.js but faster.

It is a package inspired by [nanoexpress](https://github.com/dalisoft/nanoexpress "nanoexpress"). It is powered by [uWebsockets.js](https://github.com/uNetworking/uWebSockets.js "uWebsockets.js").

###### Install with:
`npm install webrush`

#### Why?
Was trying to use nanoexpress in a personal project then it went down for some reason. Then I replaced nanoexpress with uWebsockets.js and realized that its syntax was very similar to [Express.js](https://github.com/expressjs/express "Express.js"), with some little differences. After using it I got bored with confusion that differences made. So I created this package/wrapper.

#### Implemented features
- get route
- post route
- del route
- put route
- listen function
- res.send, res.json, res.redirect

#### Example
```javascript
const webrush = require('webrush');
const app = webrush();

app.get('/', (req, res) => {
  res.send("Hello from webrush!");
});

app.listen(3000, (success) => {
  if(success){
	  console.log("Server started on port:", 3000);
  } else {
	  console.log("Error while listening on port:", 3000);
  }
});
```
