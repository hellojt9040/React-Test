const express = require('express');
const bodyParser = require('body-parser');
const nodeRequests = require('./nodeRequests');
const cors = require('cors');
const PORT = 3001;
const app = express();
const getMockData = require('./mocks');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app
  .get('/api', (req, res) => {
    const url = req.url.split('/api?url=')[1];
    console.log(`Get ${url}`);

    const headers = {
      'content-type': req.headers['content-type']
    };

    const { request, http } = nodeRequests;
    request(url, http.get(headers))
      .then((response) => {
        res.send(response);
      })
      .catch((error) => {
        console.error(error);
        res.send(error);
      });
  })
  .on('error', function () {
    console.error('error');
  });

app
  .post('/api', (req, res) => {
    const url = req.url.split('/api?url=')[1];
    console.log(`Post ${url}`);

    if (
      url === 'https://www.qa.thermofisher.com/api/store/admin/catalog/allSkus'
    ) {
      return res.send(getMockData('sku'));
    }
    if (
      url ===
      'https://www.qa.thermofisher.com/api/store/admin/catalog/allLocations'
    ) {
      return res.send(getMockData('location'));
    }

    const headers = {
      'content-type': req.headers['content-type']
    };
    const { request, http } = nodeRequests;
    request(url, http.post(req.body, headers))
      .then((response) => {
        res.send(response);
      })
      .catch((error) => {
        console.error(error);
        res.status(404).send(error);
      });
  })
  .on('error', function () {
    console.error('error');
  });

app
  .patch('/api', (req, res) => {
    const url = req.url.split('/api?url=')[1];
    console.log(`Patch ${url}`);
    const headers = {
      'content-type': req.headers['content-type']
    };
    const { request, http } = nodeRequests;
    request(url, http.patch(req.body, headers))
      .then((response) => {
        res.send(response);
      })
      .catch((error) => {
        console.error(error);
        res.status(404).send(error);
      });
  })
  .on('error', function () {
    console.error('error');
  });

app
  .put('/api', (req, res) => {
    const url = req.url.split('/api?url=')[1];
    console.log(`Put ${url}`);
    const headers = {
      'content-type': req.headers['content-type']
    };
    const { request, http } = nodeRequests;
    request(url, http.put(req.body, headers))
      .then((response) => {
        res.send(response);
      })
      .catch((error) => {
        console.error(error);
        res.status(404).send(error);
      });
  })
  .on('error', function () {
    console.error('error');
  });

app
  .delete('/api', (req, res) => {
    const url = req.url.split('/api?url=')[1];
    console.log(`Delete ${url}`);
    const headers = {
      'content-type': req.headers['content-type']
    };
    const { request, http } = nodeRequests;
    request(url, http.delete(headers))
      .then((response) => {
        res.send(response);
      })
      .catch((error) => {
        console.log(error);
        res.status(404).send(error);
      });
  })
  .on('error', function () {
    console.error('error');
  });

app.listen(PORT, function () {
  console.log('Express server listening on port ' + PORT);
});
