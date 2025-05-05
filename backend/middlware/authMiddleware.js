import jwt from "jsonwebtoken";
import expressAsyncHandler from "express-async-handler";
import User from "../models/userModel.js"; // import your User model here

const protect = expressAsyncHandler(async (req, res, next) => {
  let token;
  console.log(req.headers.authorization);
  console.log("protect middleware");

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(" ")[1];
      //jwt verifies the token using the id and the secret key if its valid it returns the id we can use that id to find our user
      const decoded = jwt.verify(token, process.env.JWT_KEY);
      console.log(token);
      const user = await User.findById(decoded.id).select('-password');
      //make sure the user is still in the database 
      if(user) {
        req.user = user;
      } else {
        throw new Error("User doesn't exist");
      }
      console.log(token);
      console.log("im from uSERRR" + token);
      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error("Not Authorized as an admin");
  }
};

export { protect, admin };
