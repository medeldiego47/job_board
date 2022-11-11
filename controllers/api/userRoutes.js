const router = require('express').Router();
const { User, Posting} = require('../../models');
const withAuth = require('../../utils/withAuth');
//route to sign up for a account requiring email, name and password
router.post('/signup',  async (req, res) => {
  try {
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});
//get all route used just to test if signup works
router.get('/', withAuth ,async (req, res) => {
  try {
    const postData = await User.findAll({
      attributes: ['id', 'name', 'email']
      
    });
    res.status(200).json(postData.reverse());
  } catch (err) {
    res.status(400).json(err);
  }
});
//login route that finds one user by matching name and checks if the password also matches and then returns login message if correct will eventually render the homepage after login
router.post('/login', async (req, res) => {
    try {
      const userData = await User.findOne({
        where: { name: req.body.name },
      });
      if (!userData) {
       
        res
          .status(400)
          .json({ message: `${req.body.name} is not a valid username` });
        return;
      }
  
      const validPassword = await userData.checkPassword(req.body.password);
  
      if (!validPassword) {
        res.status(400).json({ message: 'Incorrect password, please try again' });
        return;
      }
  
      req.session.save(() => {
        req.session.user_id = userData.id;
        req.session.username = userData.username;
        req.session.logged_in = true;
  
        res.json({ user: userData, message: 'You are now logged in!' });
      });
    } catch (err) {
      res.status(400).json(err);
    }
  });
// route to destroy log in session if it exists should be hit when log out button is hit
  router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
      req.session.destroy(() => {
        res.status(204).end();
      });
    } else {
      res.status(404).end();
    }
  });
    
module.exports = router;