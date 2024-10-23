const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3306; // HTTP server port

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello Server');
});


const employeeRoute = require('./src/routes/employee.route');
const userRoute = require('./src/routes/user.route');

app.use('/api/v1/employee', employeeRoute);
app.use('/api/v1/user', userRoute);




// HTTP server
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});



