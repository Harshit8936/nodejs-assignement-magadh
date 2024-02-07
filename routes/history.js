const router = require('express').Router();
const purchaseHistoryController = require('../controllers/PurchasehstoryController');
const authUser = require('../middleware/fetchUser');



router.get('/purchasehistory',purchaseHistoryController.allhistory);


module.exports = router;