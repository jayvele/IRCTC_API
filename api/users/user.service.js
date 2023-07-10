const pool = require("../../config/database");

module.exports = {
    create: (data, callBack) => {
        pool.query(
            `insert into users(email, first, last, password, user_type) values(?, ?, ?, ?, 'User')`,
            [
                data.email,
                data.first,
                data.last,               
                data.password
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return (results)
            }
        )
    },
    createAdmin: (data, callBack) => {
      pool.query(
          `insert into users(email, first, last, password, user_type) values(?, ?, ?, ?, 'Admin')`,
          [
              data.email,
              data.first,
              data.last,               
              data.password
          ],
          (error, results, fields) => {
              if (error) {
                  return callBack(error)
              }
              return (results)
          }
      )
  },
    createTrain: (data, callBack) => {
      pool.query(
          `insert into trains values(?, ?, ?, ?, ?, ?, ?)`,
          [
              data.source,
              data.destination,
              data.departure,               
              data.arrival,
              data.train_id, 
              data.train_name,
              data.seats
          ],
          (error, results, fields) => {
              if (error) {
                  return callBack(error)
              }
              return (results)
          }
      )
  }, 
    getUserByUserEmail: (email, callBack) => {
        pool.query(
          `select * from registration where email = ?`,
          [email],
          (error, results, fields) => {
            if (error) {
              callBack(error);
            }
            return callBack(null, results[0]);
          }
        );
      },
      
      getTrainBySD: (data, callBack) => {
        pool.query(
          `select * from trains where source = ? AND destination = ?`,
          [
            data.source,
            data.destination
          ],
          (error, results, fields) => {
            if (error) {
              return callBack(error);
            }
            return callBack(null, results);
          }
        );
      },
      getBooking: (id, callBack) => {
        pool.query(
          `select * from bookings where booking_id = ?`,
          [id],
          (error, results, fields) => {
            if (error) {
              return callBack(error);
            }
            return callBack(null, results);
          }
        );
      },
      bookTrain: (data, callBack) => {
        pool.query(
          `update trains SET seats = seats - ? where train_id = ? `,
          [
            data.seats,
            data.train_id
          ],
          (error, results, fields) => {
            if (error) {
              return callBack(error);
            }
            else {
              pool.query(
                `insert into bookings(train_id, seats, user_id) values(?, ?, ?)`,
                [
                  data.train_id,
                  data.seats,
                  data.user_id
                ]
              )
              if (error) {
                return callBack(error);
              }
              return callBack(null, results);
            }
          }
        );
      },
      getUsers: callBack => {
        pool.query(
          `select first, last, gender, email, phone from registration`,
          [],
          (error, results, fields) => {
            if (error) {
              return callBack(error);
            }
            return callBack(null, results);
          }
        );
      },
            
}




// CREATE TABLE registration (
// 	first varchar(20),
//     last varchar(20),
//     gender ENUM ('M', 'F', 'O'),
//     phone varchar(20),
//     email varchar(20),
//     password TEXT
// )


// CREATE TABLE bookings (
// 	booking_id int AUTO_INCREMENT,
//     train_id varchar(20),
//     seats int,
//     user_id int,
//     PRIMARY KEY (booking_id),
//     FOREIGN KEY (train_id) REFERENCES trains(train_id),
//     FOREIGN KEY (user_id) REFERENCES users(user_id)
// )