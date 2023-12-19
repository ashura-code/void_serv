const main = require('./simple');
const express = require('express');
const app = express();

app.get('/songs/:name', async (req, res) => {
  const name = req.params.name;
  const result = await main(name);
  res.json(result);
});

app.listen(3000);

// app.listen(PORT,()=>{
//      console.log(`listening on port ${PORT}`)
// })
