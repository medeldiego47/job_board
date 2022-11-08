const sequelize = require('../config/connection');
const { Posting, User} = require('../models');
const router = require('express').Router();
const withAuth = require('../../utils/withAuth');
//login route checks if the user is logged in and if so sends him to the homepage if not renders the login handlebars page 
router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

router.get('/',withAuth, async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const postData = await Posting.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    // Serialize data so the template can read it
    const posts = postData.map((posts) => posts.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('posts', { 
      posts, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

  module.exports = router;