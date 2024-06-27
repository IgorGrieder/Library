import user from '../models/usersModel.js';

class UserController {
  // Method to validate if the user is a admin or not
  static async validateUser(req, res) {
    try {
      const userDB = await user.findOne({
        name: req.query.name,
        password: req.query.password,
      }); // Getting the proper user
      if (userDB) {
        // Checking if the user name and password are correct
        res.status(200).json({
          found: true,
          userInfo: {
            name: userDB.name,
            id: userDB._id,
            role: userDB.role,
            address: userDB.address,
            paymentMethod: userDB.paymentMethod,
          },
        });
      } else {
        res.status(200).json({ found: false });
      }
    } catch (err) {
      res.status(500).json({ message: `Error: ${err.message}` }); // Sending the response if a error happens
    }
  }

  // Method to add a user
  static async addUser(req, res) {
    try {
      // Creating a new user
      const userDB = await user.create({
        name: req.body.name,
        password: req.body.password,
        role: 'user',
        address: [],
        paymentMethod: [],
      });
      if (userDB._id) {
        // Checking if the user was created
        res.status(200).json({
          created: true,
        });
      } else {
        res.status(200).json({ created: false });
      }
    } catch (err) {
      res.status(500).json({ message: `Error: ${err.message}` }); // Sending the response if a error happens
    }
  }

  // Method to find a user in the DB
  static async hasUser(req, res) {
    try {
      const userDB = await user.findOne({
        name: req.query.name,
      });
      if (userDB) {
        // If there`s a user with that name it should return to the front end that the username is not available
        res.status(200).json({
          found: true,
        });
      } else {
        res.status(200).json({ found: false }); // If the username is available
      }
    } catch (err) {
      res.status(500).json({ message: `Error: ${err.message}` }); // Sending the response if a error happens
    }
  }

  // Method to add another address
  static async addAddress(req, res) {
    try {
      const filter = { _id: req.body.id };
      const addressInfo = {
        street: req.body.street,
        country: req.body.country,
        complement: req.body.complement,
        neighborhood: req.body.neighborhood,
        number: req.body.number,
      };

      const userDB = await user.findOne(filter); // Getting the proper user

      if (userDB) {
        await user.updateOne(filter, { $push: { address: addressInfo } });
        res
          .status(200)
          .json({ message: 'Address added successfully', found: true });
      } else {
        res.status(404).json({ found: false });
      }
    } catch (err) {
      res.status(500).json({ message: `Error: ${err.message}` }); // Sending the response if a error happens
    }
  }

  // method to add another card
  static async addPayment(req, res) {
    try {
      const filter = { _id: req.body.id };
      const cardInfo = {
        cvv: req.body.cvv,
        expDate: req.body.expDate,
        name: req.body.name,
        number: req.body.number,
      };

      const userDB = await user.findOne(filter); // Getting the proper user

      if (userDB) {
        await user.updateOne(filter, { $push: { paymentMethod: cardInfo } });
        res
          .status(200)
          .json({ message: 'Card added successfully', found: true });
      } else {
        res.status(404).json({ found: false });
      }
    } catch (err) {
      res.status(500).json({ message: `Error: ${err.message}` }); // Sending the response if a error happens
    }
  }
}

export default UserController;
