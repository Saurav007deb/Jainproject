const express = require('express')
const app = express()
const port = 5000
const connectDB = require("./db")
connectDB();

app.use((req,res,next)=>{
res.setHeader("Access-Control-Allow-Origin", "*"),
res.header(
  "Access-Control-Allow-Headers",
  "Orgin, X-Requested-With,Content-Type, Accept"
);
next();
})
const path = require("path");



app.use(express.json())
const _dirname = path.dirname("")
const buildpath = path.join(_dirname,"../build")
app.use(express.static(buildpath));

app.use('/api', require ("./routes/createuser"));



  app.use('/api', require ("./routes/displaydata"));

app.use('/api', require ("./routes/orderdata"));
app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})  