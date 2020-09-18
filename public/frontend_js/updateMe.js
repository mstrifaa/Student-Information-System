const updateMe = async (
  phone,
  present_address,
  guardian_phone,
  guardian_address,
  father_phone,
  mother_phone
) => {
  try {
    const res = await axios({
      method: 'PATCH',
      url: '/api/users/updateMe',
      data: {
        phone,
        present_address,
        guardian_phone,
        guardian_address,
        father_phone,
        mother_phone
      }
    });
    if (res.data.status === 'success') {
      location.reload(true);
    }
  } catch (err) {
    alert('Could not update user data! Fill up all the blanks.');
    console.log(err.response.data.message);
  }
};
let input_form = document.querySelector('#second_part');

input_form.addEventListener('submit', e => {
  e.preventDefault();
  const phone = document.getElementById('userPhone').value;
  const present_address = document.getElementById('userAddress').value;
  const guardian_phone = document.getElementById('guardianPhone').value;
  const guardian_address = document.getElementById('guardianAddress').value;
  const father_phone = document.getElementById('fatherPhone').value;
  const mother_phone = document.getElementById('motherPhone').value;

  updateMe(
    phone,
    present_address,
    guardian_phone,
    guardian_address,
    father_phone,
    mother_phone
  );
});
