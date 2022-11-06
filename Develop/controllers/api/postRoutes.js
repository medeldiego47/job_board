const router = require('express').Router();
const { User, Posting} = require('../../models');
const withAuth = require('../../utils/withAuth')
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

  module.exports = router;