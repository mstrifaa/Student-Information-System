const login = async (email, password) => {
  try {
    const res = await axios({
      method: 'POST',
      url: '/api/users/login',
      data: {
        email,
        password
      }
    });
    if (res.data.status === 'success') {
      window.setTimeout(() => {
        location.assign('/dashboard');
      }, 1500);
    }
  } catch (err) {
    alert('Email or Password is wrong');
    console.log(err.response.data.message);
  }
};

const logout = async () => {
  try {
    const res = await axios({
      method: 'GET',
      url: '/api/users/logout'
    });
    if ((res.data.status = 'success')) {
      location.assign('/Login');
    }
  } catch (err) {
    console.log('Error logging out! Try again.');
  }
};

let inn = document.querySelector('.form');
let out = document.querySelector('#top_list');

if (inn) {
  inn.addEventListener('submit', e => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    login(email, password);
  });
} else if (out) {
  out.addEventListener('change', logout);
}
