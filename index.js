const express = require("express");
const session = require("express-session");
const { createSessionStore } = require("express-session-cloudflare-kv");
const app = express();
app.use(session({
    store: createSessionStore({
        // cloudflare account id
        accountId:  '3b3334f2c013c08207ea22f139d4e893' ,   //process.env.CF_accountId,
        // cloudflare KV namespace **id** (not name)
        namespaceId: '3ccc49e3005e445c9b7aa232a55645c2'  ,//process.env.CF_namespaceId,
        // cloudflare account email
        authEmail:'gmarathi@arcadix.com' ,//process.env.CF_authEmail,
        // cloudflare API Key(probabely require Global Key)
        authKey: '175c9e71f3176a80096bf838bf938fa4dc74e',//    process.env.CF_authKey
    }),
    secret: "thisismyvdfhhdfvdfv",
    resave: false,
    saveUninitialized: true
}));
// Access the session as req.session
app.get('/', function(req, res, next) {
    console.log("req.session.id", req.session.id);
    if (req.session.views) {
        req.session.views++
        res.setHeader('Content-Type', 'text/html')
        res.write('<p>views: ' + req.session.views + '</p>')
        res.write('<p>expires in: ' + (req.session.cookie.maxAge / 1000) + 's</p>')
        res.end()
    } else {
        req.session.views = 1
        res.end('welcome to the session demo. refresh!')
    }
})

app.listen(8000, () => {
    console.log("http://localhost:8000");
});