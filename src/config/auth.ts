export default {
  jwt: {
    secret: process.env.SECRET || "36c4536996ca5615dcf9911f068786dc",
    expiresIn: "1d",
  },
};
