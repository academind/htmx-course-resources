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
        <script src="/htmx-response-targets.js" defer></script>
      </head>
      <body>
        <main>
          <form 
            hx-ext="response-targets"
            hx-post="/login" 
            hx-target-422="#extra-information"
            hx-target-500="#server-side-error"
            hx-headers='{"x-csrf-token": "abc"}'
            hx-sync="this:replace"
            >
            <div>
              <img src="/images/auth-icon.jpg" alt="A lock icon" />
            </div>
            <div id="server-side-error"></div>
            <div class="control">
              <label for="email">Email</label>
              <input 
                hx-post="/validate"
                hx-target="next p"
                hx-params="email"
                hx-headers='{"x-csrf-token": "abc"}'
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
                hx-params="password"
                hx-headers='{"x-csrf-token": "abc"}'
                type="password" 
                name="password" 
                id="password" />
              <p class="error"></p>
            </div>
            <div id="extra-information"></div>
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
    return res.status(422).send(`
      <ul id="form-errors">
        ${Object.keys(errors)
          .map((key) => `<li>${errors[key]}</li>`)
          .join('')}
      </ul>
    `);
  }

  if (Math.random() > 0) {
    // res.setHeader('HX-Retarget', '.control');
    // res.setHeader('HX-Reswap', 'beforebegin');
    return res.status(500).send(`
      <p class="error">A server-side error occurred. Please try again.</p>
    `);
  }

  res.setHeader('HX-Redirect', '/authenticated');
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
