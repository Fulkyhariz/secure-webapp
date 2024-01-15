const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;
const userRoute = require('./src/routes/user.routes');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = require('./src/models');
db.sequelize.sync({ alter: false });

app.use('',userRoute);

app.listen(port, () => console.log(`App listening on port http://localhost:${port}!`));
