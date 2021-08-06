console.log('loaded!');
async function postFormHandler(event) {
  event.preventDefault();

  const title = document.querySelector('#title-input-login').value.trim();
  const body = document.querySelector('#body-input-login').value.trim();

  if (title && body) {
    const response = await fetch('/api/posts', {
      method: 'POST',
      body: JSON.stringify({
        title,
        body,
      }),
      headers: { 'Content-Type': 'application/json' },
    });

    // check the response status
    if (response.ok) {
      console.log('success');
      location.replace('/');
    } else {
      alert(response.statusText);
    }
  }
}

document
  .querySelector('#post-form')
  .addEventListener('submit', postFormHandler);
