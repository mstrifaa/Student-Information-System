const changePassword = async (passwordCurrent, password, passwordConfirm) => {
  try {
    const res = await axios({
      method: 'PATCH',
      url: '/api/users/updateMyPassword',
      data: {
        passwordCurrent,
        password,
        passwordConfirm
      }
    });
    if (res.data.status === 'success') {
      location.reload(true);
    }
  } catch (e) {
    alert('Could update password.');
    console.log(e.response.data.message);
  }
};

let form = document.querySelector('#main_section');

form.addEventListener('submit', e => {
  e.preventDefault();
  const passwordCurrent = document.getElementById('passwordCurrent').value;
  const password = document.getElementById('password').value;
  const passwordConfirm = document.getElementById('passwordConfirm').value;

  // console.log(passwordCurrent, password, passwordConfirm);

  changePassword(passwordCurrent, password, passwordConfirm);
});
