function configureOnAborted(res) {
  res.onAborted(err => {
    // eslint-disable-next-line no-console
    console.log(err);
    res.aborted = true;
  });
}
function configureSend(res) {
  res.send = res.end;
}
function configureJSON(res) {
  res.json = json => {
    res.end(JSON.stringify(json));
  };
}
function configureRedirect(res) {
  res.redirect = url => {
    res.writeStatus(301);
    res.writeHeader('Location', url);
  };
}

/* Helper function for reading a posted JSON body */
function readJSON(res, cb, err) {
  let buffer;
  /* Register data cb */
  res.onData((ab, isLast) => {
    const chunk = Buffer.from(ab);
    if (isLast) {
      let json;
      if (buffer) {
        try {
          json = JSON.parse(Buffer.concat([buffer, chunk]));
        } catch (e) {
          /* res.close calls onAborted */
          res.close();
          return;
        }
        cb(json);
      } else {
        try {
          json = JSON.parse(chunk);
        } catch (e) {
          /* res.close calls onAborted */
          res.close();
          return;
        }
        cb(json);
      }
    } else if (buffer) {
      buffer = Buffer.concat([buffer, chunk]);
    } else {
      buffer = Buffer.concat([chunk]);
    }
  });

  /* Register error cb */
  res.onAborted(err);
}
module.exports.configureResponse = res => {
  configureOnAborted(res);
  configureSend(res);
  configureJSON(res);
  configureRedirect(res);
};
module.exports.readJSON = readJSON;
