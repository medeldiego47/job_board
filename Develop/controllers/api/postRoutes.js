const router = require('express').Router();
const { User, Posting} = require('../../models');
const withAuth = require('../../utils/withAuth')
//get all route to see all posts
router.get('/', withAuth ,async (req, res) => {
    try {
      const postData = await Posting.findAll({
        attributes: ['id', 'name', 'description', 'date_created','location','contact_name','pay','contact_email'],
        order: [['date_created', 'DESC']],
        include: [
          { model: User, attributes: ['name'] },
         
        ],
      });
      res.status(200).json(postData.reverse());
    } catch (err) {
      res.status(400).json(err);
    }
  });
//create route to create a new post
  router.post('/', withAuth, async (req, res) => {
    try {
      console.log('test')
      const newPost = await Posting.create({
        
        ...req.body,
        user_id: req.session.user_id,
      });
  
      res.status(200).json(newPost);
    } catch (err) {
      res.status(400).json(err);
    }
  });

  module.exports = router;