const signup = async signupform => {
  try {
    const res = await axios({
      method: 'POST',
      url: '/api/users/signup',
      data: signupform,
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    if (res.data.status === 'success') {
      window.setTimeout(() => {
        location.assign('/dashboard');
      }, 1500);
    }
  } catch (err) {
    alert('Check Password');
    console.log(err.response.data.message);
  }
};

let inn = document.querySelector('.form');
let gender;
// console.log(inn);

inn.addEventListener('submit', e => {
  e.preventDefault();

  const signupform = new FormData();
  signupform.append('id', document.getElementById('student_id').value);
  signupform.append('name', document.getElementById('student_name').value);
  signupform.append('photo', document.getElementById('userImage').files[0]);
  signupform.append('department', document.getElementById('department').value);
  signupform.append(
    'nationality',
    document.getElementById('nationality').value
  );
  signupform.append('gender', document.getElementById('gender').value);
  signupform.append('dob', document.getElementById('dob').value);
  signupform.append('email', document.getElementById('email').value);
  signupform.append('phone', document.getElementById('phone').value);
  signupform.append(
    'present_address',
    document.getElementById('present_address').value
  );
  signupform.append('password', document.getElementById('password').value);
  signupform.append(
    'passwordConfirm',
    document.getElementById('re_password').value
  );

  signupform.append(
    'father_name',
    document.getElementById('father_name').value
  );
  signupform.append(
    'father_profession',
    document.getElementById('father_profession').value
  );
  signupform.append(
    'father_phone',
    document.getElementById('father_phone').value
  );
  signupform.append(
    'mother_name',
    document.getElementById('mother_name').value
  );
  signupform.append(
    'mother_profession',
    document.getElementById('mother_profession').value
  );
  signupform.append(
    'mother_phone',
    document.getElementById('mother_phone').value
  );
  signupform.append(
    'guardian_name',
    document.getElementById('guardian_name').value
  );
  signupform.append(
    'guardian_phone',
    document.getElementById('guardian_phone').value
  );
  signupform.append(
    'guardian_address',
    document.getElementById('guardian_address').value
  );

  signup(signupform);
  // console.log(signupform);

  // const id = document.getElementById('student_id').value;
  // const name = document.getElementById('student_name').value;
  // const photo = document.getElementById('userImage').files[0];
  // const gender = document.getElementById('gender').value;
  // const dob = document.getElementById('dob').value;
  // const email = document.getElementById('email').value;
  // const phone = document.getElementById('phone').value;
  // const present_address = document.getElementById('present_address').value;
  // const password = document.getElementById('password').value;
  // const passwordConfirm = document.getElementById('re_password').value;
  //
  // const father_name = document.getElementById('father_name').value;
  // const father_profession = document.getElementById('father_profession').value;
  // const father_phone = document.getElementById('father_phone').value;
  // const mother_name = document.getElementById('mother_name').value;
  // const mother_profession = document.getElementById('mother_profession').value;
  // const mother_phone = document.getElementById('mother_phone').value;
  // const guardian_name = document.getElementById('guardian_name').value;
  // const guardian_phone = document.getElementById('guardian_phone').value;
  // const guardian_address = document.getElementById('guardian_address').value;

  // signup(
  //   id,
  //   name,
  //   photo,
  //   gender,
  //   dob,
  //   email,
  //   phone,
  //   present_address,
  //   password,
  //   passwordConfirm,
  //   father_name,
  //   father_profession,
  //   father_phone,
  //   mother_name,
  //   mother_profession,
  //   mother_phone,
  //   guardian_name,
  //   guardian_phone,
  //   guardian_address
  // );
});
