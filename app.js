const express = require('express')
const app = express()
const port = 3000
const path = require('path');
const router = express.Router();

app.get('/', (req, res) =>   res.sendFile(path.join(__dirname+'/index.html')))

app.use(express.static('.'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))