async function signupFormHandler(event) {
  event.preventDefault();

  const username = document.querySelector('#username-signup').value.trim();
  const email = document.querySelector('#email-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();

  if (username && email && password) {
    const response = await fetch('/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username,
        email,
        password
      })
    });

    if (response.ok) {
      console.log('Success');
      document.location.replace('/');
    } else {
      alert(response.statusText);
    }
  }
}

async function loginFormHandler(event) {
  event.preventDefault();

  const email = document.querySelector('#email-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  if (email && password) {
    const response = await fetch('/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password
      })
    });

    if (response.ok) {
      console.log('Success');
      document.location.replace('/');
    } else {
      alert(response.statusText);
    }
  }
}

const switchToSignUp = () => {
  document.querySelector('#login-section').classList.add('hidden');
  document.querySelector('#signup-section').classList.remove('hidden');
};

const switchToLogin = () => {
  document.querySelector('#login-section').classList.remove('hidden');
  document.querySelector('#signup-section').classList.add('hidden');
};

// signup event listener
document
  .querySelector('.signup-form')
  .addEventListener('submit', signupFormHandler);

// login event listener
document
  .querySelector('.login-form')
  .addEventListener('submit', loginFormHandler);

// switch forms event handlers
document
  .querySelector('#switch-signup')
  .addEventListener('click', switchToSignUp);

document
  .querySelector('#switch-login')
  .addEventListener('click', switchToLogin);
