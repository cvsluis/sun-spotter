const router = require("express").Router();
const db = require("../db");
const users = require("../db/queries/01_users");
const cookieSession = require("cookie-session");

// Configure cookie-session middleware
router.use(cookieSession({
  name: 'session',
  keys: ['session-key'], 
  maxAge: 24 * 60 * 60 * 1000, // 24 hours
  credentials: true
}));

module.exports = (db) => {

  // Login
  router.post("/login", (req, res) => {
    const { email, password } = req.body;
    const query = 'SELECT * FROM users WHERE email=$1';

    if (!email && !password) {
      return res.status(400).json({error: "Email and password are requires"});
    }

    db.query(query, [email])
      .then((result) => {
        const user = result.rows[0]

        if (!user) {
          return res.status(401).json({error: "Invalid email or password"});
        }

        req.session.user_id = user.id;

        res.status(200).json({success: true});

      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({error: "Internal Server Error"});
      })
  });

  return router;
};
