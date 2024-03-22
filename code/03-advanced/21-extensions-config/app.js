import express from 'express';

import { AVAILABLE_LOCATIONS } from './data/available-locations.js';
import renderLocationsPage from './views/index.js';
import renderLocation from './views/components/location.js';

function getSuggestedLocations() {
  const availableLocations = AVAILABLE_LOCATIONS.filter(
    (location) => !INTERESTING_LOCATIONS.includes(location)
  );

  if (availableLocations.length < 2) return availableLocations;

  const suggestedLocation1 = availableLocations.splice(
    Math.floor(Math.random() * availableLocations.length),
    1
  )[0];
  const suggestedLocation2 = availableLocations.splice(
    Math.floor(Math.random() * availableLocations.length),
    1
  )[0];

  return [suggestedLocation1, suggestedLocation2];
}

const app = express();

const INTERESTING_LOCATIONS = [];

app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  const availableLocations = AVAILABLE_LOCATIONS.filter(
    (location) => !INTERESTING_LOCATIONS.includes(location)
  );
  const suggestedLocations = getSuggestedLocations();
  res.send(
    renderLocationsPage(
      suggestedLocations,
      availableLocations,
      INTERESTING_LOCATIONS
    )
  );
});

app.post('/places', (req, res) => {
  const locationId = req.body.locationId;
  const location = AVAILABLE_LOCATIONS.find((loc) => loc.id === locationId);
  INTERESTING_LOCATIONS.push(location);

  const availableLocations = AVAILABLE_LOCATIONS.filter(
    (location) => !INTERESTING_LOCATIONS.includes(location)
  );

  const suggestedLocations = getSuggestedLocations();

  res.send(`
    ${renderLocation(location, false)}

    <ul class="locations" id="suggested-locations" hx-swap-oob="innerHTML">
    ${suggestedLocations.map((location) => renderLocation(location)).join('')}
    </ul>

    <ul id="available-locations" class="locations" hx-swap-oob="true">
      ${availableLocations.map((location) => renderLocation(location)).join('')}
    </ul>
  `);
});

app.get('/suggested-locations', (req, res) => {
  const suggestedLocations = getSuggestedLocations();

  res.send(
    suggestedLocations.map((location) => renderLocation(location)).join('')
  );
});

app.delete('/places/:id', (req, res) => {
  const locationId = req.params.id;
  const locationIndex = INTERESTING_LOCATIONS.findIndex(
    (loc) => loc.id === locationId
  );
  INTERESTING_LOCATIONS.splice(locationIndex, 1);

  const availableLocations = AVAILABLE_LOCATIONS.filter(
    (location) => !INTERESTING_LOCATIONS.includes(location)
  );

  res.send(`
  <ul id="available-locations" class="locations" hx-swap-oob="true">
    ${availableLocations.map((location) => renderLocation(location)).join('')}
  </ul>
  `);
});

app.listen(3000);
