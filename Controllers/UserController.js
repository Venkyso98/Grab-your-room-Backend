const userModel = require("../Models/userModel");

exports.registerUser = async (request, response) => {
  console.log("In Post User Controller");

  const user = await new userModel({
    firstName: request.body.firstName,
    lastName: request.body.lastName,
    email: request.body.email,
    // checkIn: request.body.checkIn,
    // checkOut: request.body.checkOut,
  });

  console.log("User:", user);

  // saves in the mongodb
  user.save((err, res) => {
    if (err) {
      response
        .status(400)
        .json({ message: "User already exists with this email" });
    } else {
      response.status(201).json({ message: "User Created Successfully!" });
    }
  });
};

exports.getSingleUser = async (request, response) => {
  const userId = request.params.id;
  const userData = await userModel.findById(userId);

  try {
    response.status(200).json(userData);
  } catch (error) {
    console.log("Error:", error);
    response.status(400).json({ message: "Can't fetch user by provided data" });
  }
};
