import express from 'express';
const app = express();
import path from 'path';
import * as url from 'url';
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
app.use(express.urlencoded({ extended: true }));
console.log(path.join(__dirname,'dist/index.html'));
app.use(express.static('./dist'))

app.get('/*',(req,res)=>{res.sendFile(path.join(__dirname,'dist/index.html'))})

const port = 3000;
app.listen(port, () => {
  console.log(`Listening on http://localhost:3000`);
});