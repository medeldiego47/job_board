async function loginFormHandler(event) {
    event.preventDefault();
  
    const name = document.querySelector('#username-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();
  
    if (name && password) {
      const response = await fetch('/api/users/login', {
        method: 'post',
        body: JSON.stringify({
          name,
          password,
        }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/');
        console.table(response);
      } else {
        alert(response.statusText);
      }
    }
  }
  
  document
    .querySelector('#login-form')
    .addEventListener('submit', loginFormHandler);