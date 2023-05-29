const express = require('express')
const UserController = require('../controller/user')
const router = express.Router();

// router.get('/', UserController.findAll);
// router.get('/:id', UserController.findOne);
// router.get('/email/:email', UserController.findOneEmail);
// router.post('/', UserController.create);
// router.patch('/:id', UserController.update);
// router.delete('/:id', UserController.destroy);


router.post('/', UserController.create);
router.get('/', UserController.findAll);
router.get('/user_id/:user_id', UserController.findOneContent);
router.get('/mongid/:id', UserController.findOne);

router.get('/html/', UserController.findAllHtml);
router.get('/user_idhtml/:user_id', UserController.findOneContenthtml);
router.patch("/update/:user_id", UserController.update);
router.delete("/delete/:id", UserController.destroy);


module.exports = router