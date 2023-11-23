const router = require("express").Router();
const db = require("../db");
const users = require("../db/queries/01_users");

module.exports = (db) => {

  // Login
  router.post("/login", (req, res) => {
    const { email, password } = req.body;
    const query = 'SELECT * FROM users WHERE email=$1';

    if (!email && !password) {
      return res.status(400).json({error: "Email and password are required"});
    }

    db.query(query, [email])
      .then((result) => {
        const user = result.rows[0]
 
        if (!user) {
          return res.status(401).json({error: "Invalid email or password"});
        }

        if (user.password === password) {
          res.status(200).json({
            success: true,
            user_id: user.id
          });
        }

      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({error: "Internal Server Error"});
      })
  });

  return router;
};
