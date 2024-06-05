import user from '../models/usersModel';

class UserController {

  // Method to validate if the user is a admin or not
  static async validateUser(req, res) {
    try {
      const userDB = user.findById(req.query.id) // Getting the proper user
      res.status(200).json({ isAdmin: userDB.role === 'admin' ? true : false })
    } catch (err) {
      res.status(500).json({ message: `Error: ${err.message}` }) // Sending the response if a error happens
    }

  }
}

export default UserController