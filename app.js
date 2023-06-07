const express = require('express');
const process = require('process');
const env = require('dotenv').config();
const https = require('https');
const request = require('request');
const bodyParser = require('body-parser');
const app = express();
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
const port = 3000;
const ACCESS_KEY="LWjTfUL4qC0sIKzm_MVxwa6ZYTGTYK3D3rsQw1bAScg"

const url = "https://api.unsplash.com/search/photos?page=1&client_id="+ACCESS_KEY+"&query=pride";

app.get('/', (req, res) => {
    res.render("search");
    request(url, function (error, res, body) {
        if (!error && res.statusCode == 200) {
            const response = JSON.parse(body);
            const results = response.results[0];
        }
    });
});

app.post("/", (req, res) => {
    const query = req.body.search;
    const url = "https://api.unsplash.com/search/photos?page=10&client_id="+ACCESS_KEY+"&query="+query+"&orientation=portrait";
    request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            const resp = JSON.parse(body);
            const results = resp.results;
            res.render("home", { images: results });
        } else {
            console.log(error);
        }
    });
});

app.listen(port, () => {
    console.log("Successfully running on port " + port);
});