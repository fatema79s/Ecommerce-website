import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import cors from 'cors'; 

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = 5000; 


app.use(cors());


app.get('/api/products', (req, res) => {
  const productsPath = resolve(__dirname, 'src', 'data', 'products.json');
  res.sendFile(productsPath, (err) => {
    if (err) {
      console.error('Error sending file:', err); 
      res.status(err.status).end();
    }
  });
});


app.listen(PORT, () => {
});