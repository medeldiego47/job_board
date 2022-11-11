async function newFormHandler(event) {
    event.preventDefault();
  
    const name = document.querySelector('input[name="name"]').value.trim();
    const description = document.querySelector('textarea[name="description"]').value.trim();
    const location = document.querySelector('input[name="location"]').value.trim();
    const pay = document.querySelector('input[name="pay"]').value.trim();
    const contact_name = document.querySelector('input[name="contact-name"]').value.trim();
    const contact_email = document.querySelector('textarea[name="contact-email"]').value.trim();

    const response = await fetch('/api/post', {
      method: 'POST',
      body: JSON.stringify({
        name,
        description,
        location,
        pay,
        contact_name,
        contact_email
        
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  
    if (response.ok) {
      document.location.replace('/');
    } else {
      alert(response.statusText);
    }
  }
  
  document
    .querySelector('#send')
    .addEventListener('click', newFormHandler);