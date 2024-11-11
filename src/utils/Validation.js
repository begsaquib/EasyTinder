const validator = require("validator");
const validatingSignUpData = (req) => {
  const { firstName, lastName, password, emailId } = req.body;
  if (!firstName || !lastName) {
    throw new Error("Invalid Username");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("Invalid Email");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Invalid password");
  }
};

const validatingPatchData = (req) => {
  const data = req.body;

  const Allow_Update = [
    "firstName",
    "lastName",
    "age",
    "skill",
    "about",
    "gender",
    "photoUrl",
  ];

  const isUpdateAllowed = Object.keys(data).every((k) =>
    Allow_Update.includes(k)
  );

  if (!isUpdateAllowed) {
    throw new Error("Update is not possible");
  }
  if (data?.skill) {
    if (data?.skill.length > 10) {
      throw new Error("Skills cant be more than 10");
    }
  }

  if (data?.about) {
    if (data?.about.length > 150) {
      throw new Error("Cut down the about section");
    }
  }
  return isUpdateAllowed;
};



module.exports = { validatingSignUpData, validatingPatchData };
