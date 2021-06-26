const express = require('express');
const apiRoutes = require('./routes');

const app = express();
const port = process.env.PORT;

app.use(express.json())
app.use('/api', apiRoutes);

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
})