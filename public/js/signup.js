async function signupFormHandler(event) {
    event.preventDefault();
    const name = document.querySelector('#username-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    console.log(name,password,email)
    if (name && password && email) {
      const response = await fetch('/api/users/signup', {
        method: 'POST',
        body: JSON.stringify({
          name,
          password,
          email
        }),
        headers: { 'Content-Type': 'application/json' },
      });
      if (response.ok) {
        document.location.replace('/');
      } else {
        alert(response.statusText);
      }
    }
  }
  
  document
    .querySelector('#signup-form').addEventListener('click', signupFormHandler);