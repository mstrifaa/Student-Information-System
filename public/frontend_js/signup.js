const signup = async (
  id,
  name,
  img,
  gender,
  dob,
  email,
  phone,
  present_address,
  password,
  passwordConfirm,
  father_name,
  father_profession,
  father_phone,
  mother_name,
  mother_profession,
  mother_phone,
  guardian_name,
  guardian_phone,
  guardian_address
) => {
  try {
    const res = await axios({
      method: 'POST',
      url: 'http://127.0.0.1:3000/api/users/signup',
      data: {
        id,
        name,
        img,
        gender,
        dob,
        email,
        phone,
        present_address,
        password,
        passwordConfirm,
        father_name,
        father_profession,
        father_phone,
        mother_name,
        mother_profession,
        mother_phone,
        guardian_name,
        guardian_phone,
        guardian_address
      }
    });
    if (res.data.status === 'success') {
      window.setTimeout(() => {
        location.assign('/dashboard');
      }, 1500);
    }
  } catch (err) {
    console.log(err.response.data.message);
  }
};

let inn = document.querySelector('.form');
let gender;
console.log(inn);

inn.addEventListener('submit', e => {
  e.preventDefault();
  const id = document.getElementById('student_id').value;
  const name = document.getElementById('student_name').value;
  const img = document.getElementById('userImage').value;
  const male = document.getElementById('male').checked;
  const female = document.getElementById('female').checked;
  const dob = document.getElementById('dob').value;
  const email = document.getElementById('email').value;
  const phone = document.getElementById('phone').value;
  const present_address = document.getElementById('present_address').value;
  const password = document.getElementById('password').value;
  const passwordConfirm = document.getElementById('re_password').value;

  const father_name = document.getElementById('father_name').value;
  const father_profession = document.getElementById('father_profession').value;
  const father_phone = document.getElementById('father_phone').value;
  const mother_name = document.getElementById('mother_name').value;
  const mother_profession = document.getElementById('mother_profession').value;
  const mother_phone = document.getElementById('mother_phone').value;
  const guardian_name = document.getElementById('guardian_name').value;
  const guardian_phone = document.getElementById('guardian_phone').value;
  const guardian_address = document.getElementById('guardian_address').value;

  if (female) gender = 'Female';
  else gender = 'Male';

  signup(
    id,
    name,
    img,
    gender,
    dob,
    email,
    phone,
    present_address,
    password,
    passwordConfirm,
    father_name,
    father_profession,
    father_phone,
    mother_name,
    mother_profession,
    mother_phone,
    guardian_name,
    guardian_phone,
    guardian_address
  );
});
