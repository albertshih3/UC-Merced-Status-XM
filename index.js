// index.js
const serverless = require('serverless-http');
const express = require('express');
const bodyParser = require('body-parser');
const status = require('./status.js');
const incidents = require('./incidents.js');

// instantiate the express server
const app = express();

// used to get post events as JSON objects correctly
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/status', async function (req, res) {
    let currentStatus = await status.getStatusData();
    console.log(req.headers);
    console.log(req.query);
    res.json(status.makeStatus(req.query));
    console.log("ALL DONE! 🎉")
})

app.get('/status/component/:id', async function (req, res) {
    let currentStatus = await status.getStatusData();
    console.log(req.params);
    res.json(status.makeComponentDetails(req.params.id));

})

app.get('/status/maintenance/:id', async function (req, res) {
    let currentStatus = await status.getStatusData();
    console.log(req.params);
    res.json(status.makeMaintenanceDetails(req.params.id));
})

app.get('/status/incidents/:id', async function (req, res) {
    let currentStatus = await incidents.getStatusData();
    console.log(req.params);
    res.json(incidents.makeIncidentDetails(req.params.id));
})

module.exports.handler = serverless(app);
