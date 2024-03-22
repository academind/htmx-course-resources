import express from 'express';

import PRODUCTS from './products.js';

const app = express();

app.use(express.static('public'));
app.use(express.urlencoded({ extended: false })); 

app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Shop</title>
        <link rel="stylesheet" href="/main.css">
        <script src="/htmx.js" defer></script>
      </head>
      <body>
        <header id="main-header">
          <div id="main-title">
            <a href="/">
              <img src="/logo.png" alt="Elegant model" />
              <h1>Elegant Clothing</h1>
            </a>
          </div>
        </header>
        <main id="shop">
          <h2>Elegant Clothing For Everyone</h2>

          <ul id="products">
            ${PRODUCTS.map(
              (product) => `
              <article class="product">
                <a href="/products/${product.id}">
                  <img src="/images/${product.image}" alt="${product.title}" />
                  <div class="product-content">
                    <h3>${product.title}</h3>
                    <p class="product-price">$${product.price}</p>
                  </div>
                </a>
              </article>
            `
            ).join('')}
          </ul>
        </main>
      </body>
    </html>
  `);
});

app.get('/products/:id', (req, res) => {
  const product = PRODUCTS.find((product) => product.id === req.params.id);

  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>${product.title}</title>
        <link rel="stylesheet" href="/main.css">
        <script src="/htmx.js" defer></script>
      </head>
      <body>
        <header id="main-header">
          <div id="main-title">
            <a href="/">
              <img src="/logo.png" alt="Elegant model" />
              <h1>Elegant Clothing</h1>
            </a>
          </div>
        </header>
        <main id="product">
          <header>
            <img src="/images/${product.image}" alt="${product.title}">
            <div>
              <h1>${product.title}</h1>
              <p id="product-price">$${product.price}</p>
              <form method="post" action="/cart">
                <button>Add to Cart</button>
              </form>
            </div>
          </header>
          <p id="product-description">${product.description}</p>
        </main>
      </body>
    </html>
  `);
});

app.listen(3000);
