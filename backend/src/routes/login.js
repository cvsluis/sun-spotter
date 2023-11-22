const router = require("express").Router();
const db = require("../db");
const users = require("../db/queries/01_users");
const cookieSession = require("cookie-session");

// Configure cookie-session middleware
router.use(cookieSession({
  name: 'session',
  keys: ['session-key'], 
  maxAge: 24 * 60 * 60 * 1000, // 24 hours
}));

module.exports = (db) => {

  // Login
  router.post("/login", (req, res) => {
    const [ email, password ] = req.body;
    const query = `SELECT * FROM users WHERE email='$1' AND password='$2'`

    const user = {}

    console.log(req.body);

    db.query(query, req.body)
      .then((req, res) => {

      })

    // Check if email and password are provided
    if (!email || !password) {
      return res
        .status(400)
        .json({ error: "Email and password are required." });
    }

    // Check if user exists
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password." });
    }

    //check if password matches
    if (user.password !== password) {
      return res.status(401).json({ error: "Invalid email or password." });
    }

    //Set cookie to corresponding userID
    req.session.user_id = user.id;
    res.redirect("/home");
    console.log('it worked');
  });

  return router;
};
