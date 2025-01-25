const { User: UserModel } = require('../models');
const HTTPSTATUS = require('http-status');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;


// Login
const login = async (req, res) => {
  const { identifier, password, otp } = req.body;

  try {
    // Find the user by email address
    const user = await UserModel.findOne({
      where: { emailaddress: identifier },
    });

    if (!user) {
      return res.status(404).json({ status: 'error', message: 'User not found' });
    }

    // Password validation
    if (password) {
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        return res.status(HTTPSTATUS.UNAUTHORIZED).json({ status: 'error', message: 'Invalid password' });
      }
    } else if (otp) {
      return res.status(HTTPSTATUS.BAD_REQUEST).json({ status: 'error', message: 'OTP not implemented' });
    }

    // Generate a JWT token
    const token = jwt.sign(
      { uuid: user.uuid, role: user.roleUuid },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    return res.status(HTTPSTATUS.OK).json({
      status: 'success',
      data: {
        token,
        user: {
          uuid: user.uuid,
          role: user.roleUuid,
        },
      },
    });
  } catch (error) {
    return res.status(HTTPSTATUS.INTERNAL_SERVER_ERROR).json({ status: 'error', message: error.message });
  }
};

// Signup
const signup = async (req, res) => {
  const { firstname, lastname, emailaddress, phonenumber, password, roleUuid } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await UserModel.create({
      firstname,
      lastname,
      emailaddress,
      phonenumber,
      password: hashedPassword,
      roleUuid: roleUuid
    });

    return res.status(HTTPSTATUS.OK).json({
      status: 'success',
      data: {
        user: newUser,
      },
    });
  } catch (error) {
    return res.status(HTTPSTATUS.INTERNAL_SERVER_ERROR).json({ status: 'error', message: error.message });
  }
};

module.exports = {
  login,
  signup
};
