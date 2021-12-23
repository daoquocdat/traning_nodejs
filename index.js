const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const route = require('./src/routers/index')
const db = require('./src/config/mongodb/mongoDB')
const dbSQL = require('./src/config/sql/sqlDB')
const app = express()
const PORT = 9999
const corsOptions = {
    origin: "http://localhost:8081"
};
db.connect()
dbSQL.sync()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(cors(corsOptions));
route(app)


app.listen(PORT,console.log(`http://localhost:${PORT}`)) 