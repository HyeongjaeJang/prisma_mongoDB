const prisma = require("../prisma/index");
const cookeieToken = require("../utils/cookieToken");
const isEmail = require("validator/lib/isEmail");
const isStrongPassword = require("validator/lib/isStrongPassword");
const argon2 = require("argon2");

exports.signup = async (req, res) => {
  try {
    const { name, email, password, type } = req.body;
    if (!name || !email || !password || !type) {
      return res.status(400).json({ error: "Please provide all fields" });
    }

    if (!isEmail(email)) {
      return res.status(400).json({ error: "Email is invalid" });
    }

    if (!isStrongPassword(password)) {
      return res.status(400).json({ error: "Strong password is required" });
    }
    const hash = await argon2.hash(password);
    let user = "";
    let org = "";
    if (type == "normal") {
      user = await prisma.user.create({
        data: {
          name,
          email,
          password: hash,
          type,
        },
      });
      res.status(200).json({ message: "User registered" });
      cookeieToken(user, res);
    } else {
      org = await prisma.organization.create({
        data: {
          name,
          email,
          password: hash,
          type,
        },
      });
      res.status(200).json({ message: "Organization registered" });
      cookeieToken(org, res);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Please provide all fields" });
    }
    if (!isEmail(email)) {
      return res.status(400).json({ error: "Email is invalid" });
    }

    const user = await prisma.user.findFirst({
      where: { email: email },
    });

    if (!user) {
      return res.status(404).json({ error: "Invalid email or password" });
    }

    if (!(await argon2.verify(user.password, password))) {
      return res.status(404).json({ error: "Invalid email or password" });
    }

    cookeieToken(user, res);

    return res.status(200).json({ message: "Logged In" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};
