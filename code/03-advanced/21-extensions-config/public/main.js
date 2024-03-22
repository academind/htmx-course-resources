// htmx.config.defaultSwapStyle = 'outerHTML';
console.log(htmx);

function showConfirmationModal(event) {
  if (event.detail.path === '/suggested-locations') {
    return;
  }

  event.preventDefault();
  console.log(event);
  const action = event.detail.elt.dataset.action;
  const confirmationModal = `
    <dialog class="modal">
      <div id="confirmation">
        <h2>Are you sure?</h2>
        <p>Do you really want to ${action} this place?</p>
        <div id="confirmation-actions">
          <button id="action-no" className="button-text">
            No
          </button>
          <button id="action-yes" className="button">
            Yes
          </button>
        </div>
      </div>
    </dialog>
  `;
  document.body.insertAdjacentHTML('beforeend', confirmationModal);
  const dialog = document.querySelector('dialog');

  const noBtn = document.getElementById('action-no');
  noBtn.addEventListener('click', function() {
    dialog.remove();
  });

  const yesBtn = document.getElementById('action-yes');
  yesBtn.addEventListener('click', function() {
    event.detail.issueRequest();
    dialog.remove();
  });

  dialog.showModal();
}

document.addEventListener('htmx:confirm', showConfirmationModal);