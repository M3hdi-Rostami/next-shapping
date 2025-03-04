import bcrypt from "bcryptjs";
const users = [
  {
    name: "mehdi",
    email: "m3hdi.rostami@gmail.com",
    password: bcrypt.hashSync("12345"),
    isAdmin: true,
  },
  {
    name: "ali",
    email: "ali-test@gmail.com",
    password: bcrypt.hashSync("12345"),
    isAdmin: false,
  },
];

export default users;
