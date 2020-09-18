const createResult = async (
  student_id,
  course_code,
  course_name,
  grade,
  semester
) => {
  try {
    const res = await axios({
      method: 'POST',
      url: '/api/results',
      data: {
        student_id,
        course_code,
        course_name,
        grade,
        semester
      }
    });
    if (res.data.status === 'success') {
      location.reload('true');
    }
  } catch (e) {
    alert('Could not create Result');
    console.log(e.response.data.message);
  }
};

let result = document.querySelector('#main_section');

result.addEventListener('submit', e => {
  e.preventDefault();
  const student_id = document.getElementById('studentID').value;
  const course_code = document.getElementById('courseCode').value;
  const course_name = document.getElementById('courseName').value;
  const grade = document.getElementById('grade').value;
  const semester = document.getElementById('semester').value;

  createResult(student_id, course_code, course_name, grade, semester);
});
