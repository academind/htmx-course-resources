import express from 'express';

const courseGoals = [];

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
      <link rel="stylesheet" href="/main.css" />
      <script src="/htmx.js" defer></script>
    </head>
    <body>
      <main>
        <h1>Manage your course goals</h1>
        <section>
          <form 
            id="goal-form" 
            hx-post="/goals" 
            hx-target="#goals"
            hx-swap="beforeend">
            <div>
              <label htmlFor="goal">Goal</label>
              <input type="text" id="goal" name="goal" />
            </div>
            <button type="submit">Add goal</button>
          </form>
        </section>
        <section>
          <ul id="goals">
          ${courseGoals.map(
            (goal, index) => `
            <li id="goal-${index}">
              <span>${goal}</span>
              <button>Remove</button>
            </li>
          `
          ).join('')}
          </ul>
        </section>
      </main>
    </body>
  </html>
  `);
});

app.post('/goals', (req, res) => {
  const goalText = req.body.goal;
  courseGoals.push(goalText);
  // res.redirect('/');
  res.send(`
    <li id="goal-${courseGoals.length - 1}">
      <span>${goalText}</span>
      <button>Remove</button>
    </li>
  `);
});

app.listen(3000);
