const {
    createUser,
    login,
    getUserByUserId,
    getUsers,
    createAdmin,
    deleteUser,
    createTrain, 
    logout,
    getTrainBySD,
    bookTrain,
    getBooking
  } = require("./user.controller");
const router = require("express").Router();
const bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
const {checkToken} = require("../../auth/token-validation"); 

router.post('/train', checkToken, createTrain);
// router.post("/logout", checkToken, logout);
router.post("/admin", createAdmin);
router.get("/availability", getTrainBySD);
router.post("/book", checkToken, bookTrain);
router.get("/book/:id", checkToken, getBooking);
router.post("/", createUser)
router.get("/", checkToken, getUsers);
router.post("/login", login);



module.exports = router;
