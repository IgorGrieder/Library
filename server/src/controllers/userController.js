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
}

export default UserController;
