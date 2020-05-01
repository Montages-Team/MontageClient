const express = require('express');
const path = require('path');
const serveStatic = require('serve-static');
const fs = require('fs');
const axios = require('axios');

let url = ''
if (!process.env.VUE_APP_GRAPHQL_HTTP) {
  url = 'http://localhost:8000/gql';
} else {
  url =  process.env.VUE_APP_GRAPHQL_HTTP;
}

app = express();
app.use(serveStatic(__dirname + "/dist"));

const port = process.env.PORT || 5000;


const isBot = function(userAgent) {
    return userAgent.includes('googlebot') ||
    userAgent.includes('yahoou') ||
    userAgent.includes('bingbot') ||
    userAgent.includes('baiduspider') ||
    userAgent.includes('yandex') ||
    userAgent.includes('yeti') ||
    userAgent.includes('yodaobot') ||
    userAgent.includes('gigabot') ||
    userAgent.includes('ia_archiver') ||
    userAgent.includes('facebookexternalhit') ||
    userAgent.includes('twitterbot') ||
    userAgent.includes('developers\.google\.com') ? true : false
}

const createReqData = function(impressionId) {
    const query = `query {
        impression(impressionId: ${impressionId}) {
          impressionImgUrl
        }
      }`;
    const data = {
        params: {
            query: query
        }
    };
    return  data
}

app.get('/profile/:userName/impression/:impressionId', (req, res, next) => {
    // Botかどうかを判定してBotじゃないならそのままレスポンスを返す
    const userAgent = req.headers['user-agent'].toLowerCase()
    if (process.env.NODE_ENV !== "development" && !isBot(userAgent)) {
        res.sendfile(`${__dirname}/dist/index.html`);
    }
    const data = createReqData(req.params.impressionId);

    axios.get(url, data).then((response) => {
    const imgUrl = response.data.data.impression.impressionImgUrl;

    // index_with_meta.html
    const filePath = `${__dirname}/dist/index.html`;
    const newFilePath = `${__dirname}/dist/index_with_meta.html`;
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            return console.log(err);
        };
        const matchUrl = 'https://res.cloudinary.com/hzmikcp3i/image/upload/v1588151691/production/default_share_image_bf2uf6.png';
        const result = data.replace(matchUrl, imgUrl);
        fs.writeFile(newFilePath, result, 'utf8', (err) => {
            if (err) return console.log(err);
        })
    });
    setTimeout(() => {
        res.sendfile(newFilePath);
    }, 3000)
    }).catch(err => console.log(err));
});

app.get(/.*/, (req, res, next) => {
    const filePath = `${__dirname}/dist/index.html`;
    res.sendfile(filePath);
});


app.listen(port);
console.log('server started '+ port);
