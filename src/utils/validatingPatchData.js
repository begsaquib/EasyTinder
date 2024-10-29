const validatingPatchData = (req) => {
  const data = req.body;

  const Allow_Update = [
    "userId",
    "age",
    "skill",
    "about",
    "password",
    "gender",
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
};
module.exports = { validatingPatchData };
