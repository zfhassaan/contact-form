const scriptURL = 'https://script.google.com/macros/s/AKfycbxacQNyBYU5VDPUHAVjdnmSlyYRPELqf7uhHpgq/exec'
const form = document.forms['submit-to-google-sheet'];
const form_row = document.querySelector('.cfsf.row');
const loader = document.querySelector('.loader')
const statusMessage = document.querySelector('.js-status-message');

form.addEventListener('submit', e => {
  e.preventDefault()
  showLoadingIndicator()
  
  fetch(scriptURL, { method: 'POST', body: new FormData(form)})
    .then(
      response => showSuccessMessage(response)
    )
    .catch(
      error => showErrorMessage(error)
      )
})

function showLoadingIndicator () {
  document.querySelector('.cfsf').style.display = 'none'
  document.querySelectorAll('.social-media').forEach((item)=>{ item.style.visibility = 'hidden'; });
  document.querySelector('.w-100.social-media.mt-5').style.marginTop = '15rem !important';
  loader.style.display = 'block';
}

function showSuccessMessage (response) {
  setTimeout(() => {
    statusMessage.innerText = 'Thank you for your message. We\'ll get back to you soon.';
    document.querySelector('.cfsf').style.display = 'block'
    document.querySelector('p.js-status-message.is-hidden').style.visibility = 'visible';
    document.querySelectorAll('.social-media').forEach((item)=>{ item.style.visibility = 'visible'});
    loader.style.display = 'none';
    form.reset();
  }, 500)
}

function showErrorMessage (error) {
  console.error('Error!', error.message)
  setTimeout(() => {
    statusMessage.innerText = 'Error.';
    document.querySelector('.w-100.social-media.mt-5').style.marginTop = '2rem !important';
    // loader
  }, 500)
}