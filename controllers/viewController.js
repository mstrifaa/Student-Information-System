exports.getHomepage = (req, res) => {
  res.status(200).render('base');
};

exports.getLogin = (req, res) => {
  res.status(200).render('login');
};

exports.getSignup = (req, res) => {
  res.status(200).render('registration');
};

exports.getResult = (req, res) => {
  res.status(200).render('results');
};

exports.getProfile = (req, res) => {
  res.status(200).render('profile');
};

exports.getDashboard = (req, res) => {
  res.status(200).render('dashboard');
};

exports.getCourseReg = (req, res) => {
  res.status(200).render('course_reg');
};

exports.changePassword = (req, res) => {
  res.status(200).render('change_password');
};
