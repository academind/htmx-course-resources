import express from 'express';

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Learn HTMX</title>
        <link rel="icon" href="/images/logo.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
          rel="stylesheet"
        />
        <link rel="stylesheet" href="/main.css" />
        <script src="/htmx.js" defer></script>
      </head>
      <body>
        <main>
          <form hx-post="/login">
            <div>
              <img src="/images/auth-icon.jpg" alt="A lock icon" />
            </div>
            <div class="control">
              <label for="email">Email</label>
              <input 
                hx-post="/validate" 
                hx-target="next p"
                type="email" 
                name="email" 
                id="email" />
              <p class="error"></p>
            </div>
            <div class="control">
              <label for="password">Password</label>
              <input 
                hx-post="/validate" 
                hx-target="next p" 
                type="password" 
                name="password" 
                id="password" />
              <p class="error"></p>
            </div>
            <p>
              <button type="submit">
                Login
              </button>
            </p>
          </form>
        </main>
      </body>
    </html>
  `);
});

app.post('/validate', (req, res) => {
  if ('email' in req.body && !req.body.email.includes('@')) {
    return res.send(`
      E-Mail address is invalid.
    `);
  } else if ('email' in req.body && req.body.email.includes('@')) {
    return res.send();
  } else if ('password' in req.body && req.body.password.trim().length < 8) {
    return res.send(`
      Password must be at least 8 characters long.
    `);
  } else if ('password' in req.body && req.body.password.trim().length >= 8) {
    return res.send();
  }
  res.send();
});

app.post('/login', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  let errors = {};

  if (!email || !email.includes('@')) {
    errors.email = 'Please enter a valid email address.';
  }

  if (!password || password.trim().length < 8) {
    errors.password = 'Password must be at least 8 characters long.';
  }

  if (Object.keys(errors).length > 0) {
    res.send(`
      <div id="extra-information">
        <ul id="form-errors">
          ${Object.keys(errors)
            .map((key) => `<li>${errors[key]}</li>`)
            .join('')}
        </ul>
      </div>
    `);
  }
  res.send();
});

app.get('/authenticated', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Learn HTMX</title>
        <link rel="icon" href="/images/logo.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
          rel="stylesheet"
        />
        <link rel="stylesheet" href="/main.css" />
        <script src="/htmx.js" defer></script>
      </head>
      <body>
        <main>
          <h1>Authenticated!</h1>
        </main>
      </body>
    </html>
  `);
});

app.listen(3000);
