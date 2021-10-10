const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const app = express();
const PORT = process.env.PORT || 8000;

app.use(morgan("dev"))
app.use(cors())
app.use(express.json())

app.get('/', (request, response) => {
  response.status(200).send('holamundo desde docker');
});

app.listen(PORT, () => {
  console.log(`Server is up on localhost:${PORT}`);
});

console.log('hola mundo');