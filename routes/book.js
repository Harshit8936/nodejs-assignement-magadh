const router = require('express').Router();
const bookController = require('../controllers/BookController');
const authUser = require('../middleware/fetchUser');

router.get('/bookmanagement',bookController.allBooks);
router.get('/addbook',bookController.newbookPage);
router.get("/editbook/:id",bookController.singleBook);
router.post('/api/newbook',bookController.newBook);
router.put("/api/updatebook/:id",bookController.updateBook);
router.delete("/api/deletebook/:id",bookController.deleteBook);
router.get("/viewbook/:id",bookController.viewBook);
router.post("/api/buybook",authUser,bookController.buyBook);







module.exports = router;