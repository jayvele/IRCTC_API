const {
    create,
    getUserByUserEmail,
    getUsers,
    createAdmin,
    createTrain,
    getTrainBySD,
    bookTrain,
    getBooking
  } = require("./user.service");
    const { sign } = require("jsonwebtoken");
  const { hashSync, genSaltSync, compareSync } = require("bcrypt");
    

  module.exports = {
    createUser: (req, res) => {
      const body = (req.body);
      console.log(req.body);
      const salt = genSaltSync(10);
      body.password = hashSync(body.password, salt);
      create(body, (err, results) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            success: 0,
            message: "Database connection error: " + err
          });
        }
        else {
        return res.status(200).json({
          success: 1,
          // data: results,
          message: "User ID: " + body.user_id
        })};
      });
    },
    createAdmin: (req, res) => {
      const body = (req.body);
      console.log(req.body);
      const salt = genSaltSync(10);
      body.password = hashSync(body.password, salt);
      createAdmin(body, (err, results) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            success: 0,
            message: "Database connection error: " + err
          });
        }
        else {
        return res.status(200).json({
          success: 1,
          // data: results,
          message: "User ID: " + body.user_id
        })};
      });
    },
    createTrain: (req, res) => {
      const body = (req.body);
      console.log(req.body);
      createTrain(body, (err, results) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            success: 0,
            message: "Database connection error: " + err
          });
        }
        else {
        return res.json({
          success: 1,
          // data: results,
          message: "Train Added Successfully"
        })};
      });
    },
    bookTrain: (req, res) => {
      const body = (req.body);
      console.log(req.body);
      bookTrain(body, (err, results) => {
        if (err) {
          console.log(err);
          return res.json({
            success: 0,
            message: "Database connection error: " + err
          });
        }
        else {
        return res.json({
          success: 1,
          // data: results,
          message: "Booked Succesfully"
        })};
      });
    },
    login: (req, res) => {
      const body = req.body;
      getUserByUserEmail(body.email, (err, results) => {
        if (err) {
           return console.log(err);
        }
        if (!results) {
          return res.json({
            success: 0,
            data: "Invalid email or password"
          });
        }
        
        const result = compareSync(body.password, results.password);
        console.log(results.password);
        console.log(body.password);
        console.log(result);
        if (result) {
          results.password = undefined;
          const jsontoken = sign({ result: results }, "qwe1234", {
            expiresIn: "1h"
          });
          return res.json({
            status_code: 200,
            message: "Login Successful",
            user_id: results.user_id,
            token: jsontoken
          });
        } 
        else {
          return res.json({
            success: 0,
            data: "Invalid email or password"
          });
        }
      });
    },
    
    getTrainBySD: (req, res) => {
      const body = req.body;
      getTrainBySD(body, (err, results) => {
        if (err) {
          console.log(err);
          return;
        }
        if (!results) {
          return res.json({
            success: 0,
            message: "No Such Trains Available"
          });
        }
        // results.password = undefined;
        return res.json({
          success: 1,
          data: results
        });
      });
    },

    getBooking: (req, res) => {
      const id = req.params.id;
      getBooking(id, (err, results) => {
        if (err) {
          console.log(err);
          return;
        }
        if (!results) {
          return res.json({
            success: 0,
            message: "No Such Bookings"
          });
        }
        console.log(results);
        // results.password = undefined;
        return res.json({
          success: 1,
          data: results
        });
      });
    },
    
    getUsers: (req, res) => {
      getUsers((err, results) => {
        if (err) {
          console.log(err);
          return;
        }
        return res.json({
          success: 1,
          data: results
        });
      });
    },
        
  };