
exports.checkEmailValidation = (email) => {
  const regexEmail = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
  if (regexEmail.test(email)) {
    return true;
  } else {
    return false;
  }
};
