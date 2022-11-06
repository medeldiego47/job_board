const router = require('express').Router();
const { User, Posting} = require('../../models');


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

    
module.exports = router;