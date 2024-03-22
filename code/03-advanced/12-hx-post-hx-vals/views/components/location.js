export default function renderLocation(location) {
  return `
    <li class="location-item">
      <button 
        hx-post="/places" 
        hx-vals='{"locationId": "${location.id}"}'
        hx-target="#interesting-locations"
        hx-swap="beforeend">
        <img src="${`/images/${location.image.src}`}" alt="${location.image.alt}" />
        <h3>${location.title}</h3>
      </button>
    </li>
  `;
}
