import express from 'express';

const port = 3000;
const app = express();

app.get('/', (req, res) => {
    res.send('hello world 123')
  })

app.listen(port , ()=>{
    console.log(`Example app listenong on port ${port}`)
})