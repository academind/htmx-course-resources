import renderLocation from './components/location.js';

export default function renderLocationsPage(availableLocations, interestingLocations) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Interesting Locations</title>
        <link rel="stylesheet" href="/main.css" />
        <link rel="icon" href="/logo.png" />
        <script src="/htmx.js" defer></script>
      </head>
      <body>
        <header>
          <img src="/logo.png" alt="Stylized globe" />
          <h1>PlacePicker</h1>
          <p>
            Create your personal collection of places you would like to visit or
            you have visited.
          </p>
        </header>
        <main>
          <section class="locations-category">
            <h2>My Dream Locations</h2>
            <ul id="interesting-locations" class="locations">
              ${interestingLocations.map((location) => renderLocation(location, false)).join('')}
            </ul>
          </section>

          <section class="locations-category">
            <h2>Available Locations</h2>
            <ul id="available-locations" class="locations">
              ${availableLocations.map((location) => renderLocation(location)).join('')}
            </ul>
          </section>
        </main>
      </body>
    </html>
  `;
}
