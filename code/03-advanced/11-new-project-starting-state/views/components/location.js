export default function renderLocation(location) {
  return `
    <li class="location-item">
      <button>
        <img src="${`/images/${location.image.src}`}" alt="${location.image.alt}" />
        <h3>${location.title}</h3>
      </button>
    </li>
  `;
}
