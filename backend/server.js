const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// Endpoint to get products
app.get('/products', (req, res) => {
  fs.readFile('products.json', 'utf8', (err, data) => {
    if (err) return res.status(500).send(err);
    res.json(JSON.parse(data));
  });
});

// Endpoint to update products
app.post('/update-product', (req, res) => {
  const updatedProduct = req.body;
  fs.readFile('products.json', 'utf8', (err, data) => {
    if (err) return res.status(500).send(err);
    const products = JSON.parse(data);
    
    // Find the product and update its sizes
    const productIndex = products.findIndex(prod => prod.id === updatedProduct.id);
    if (productIndex >= 0) {
      products[productIndex] = updatedProduct;
      fs.writeFile('products.json', JSON.stringify(products, null, 2), (err) => {
        if (err) return res.status(500).send(err);
        res.send('Product updated successfully');
      });
    } else {
      res.status(404).send('Product not found');
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
