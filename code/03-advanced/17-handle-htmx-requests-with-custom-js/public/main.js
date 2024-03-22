function showConfirmationModal() {
  console.log('Showing modal...');
}

document.addEventListener('htmx:beforeRequest', showConfirmationModal);