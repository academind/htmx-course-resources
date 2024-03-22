import express from 'express';

import { AVAILABLE_LOCATIONS } from './data/available-locations.js';
import renderLocationsPage from './views/index.js';
import renderLocation from './views/components/location.js';

const app = express();

const INTERESTING_LOCATIONS = [];

app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  const availableLocations = AVAILABLE_LOCATIONS.filter(
    (location) => !INTERESTING_LOCATIONS.includes(location)
  );
  res.send(renderLocationsPage(availableLocations, INTERESTING_LOCATIONS));
});

app.post('/places', (req, res) => {
  const locationId = req.body.locationId;
  const location = AVAILABLE_LOCATIONS.find((loc) => loc.id === locationId);
  INTERESTING_LOCATIONS.push(location);

  res.send(`
    TODO
  `);
});

app.delete('/places/:id', (req, res) => {
  const locationId = req.params.id;
  const locationIndex = INTERESTING_LOCATIONS.findIndex(
    (loc) => loc.id === locationId
  );
  INTERESTING_LOCATIONS.splice(locationIndex, 1);

  res.send();
});

app.listen(3000);
