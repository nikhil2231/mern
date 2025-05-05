//user controller
import expressAsyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import tokenGenerator from "../utils/tokenGenerator.js";


//desc login
//POST api/users/login
const authUser = expressAsyncHandler(async(req, res)=> {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
   if(user && await user.matchPass(password) ) {
    res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: tokenGenerator(user._id)
    })
   }
   else {
    res.status(401);
    throw new Error ("invalid username or password")
   }
});


//desc for creating a new user 
// Post api/users/

const registerUser = expressAsyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
  
    const userExists = await User.findOne({ email });
     console.log(req.body);
    if (userExists) {
      res.status(400);
      throw new Error("User Already Registered");
    }
  
    const user = await User.create({ name, email, password });
    if (user) {
      const { _id, name, email, isAdmin } = user;
      res.status(201).json({
        _id,
        name,
        email,
        isAdmin,
        token: tokenGenerator(_id),
      });
    } else {
      res.status(400);
      throw new Error("Invalid user data");
    }
  });
  

//desc get user profile
//GET api/users/profile
const getUserProfile = expressAsyncHandler(async(req, res)=> {
    const user = await User.findById(req.user._id);

 if(user) {
    res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
       
    })


 } else {
    res.status(404)
    throw new Error("User not Found")

 }
})



//desc update user profile
//PUT api/users/profile
const updateUserProfile = expressAsyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      if (!(await user.matchPass(req.body.currentPassword))) {
        res.status(401);
        throw new Error('Wrong Password');
      }

      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;

      if (req.body.password) {
        user.password = req.body.password;
      }

      const updatedUser = await user.save();

      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
        token: tokenGenerator(updatedUser._id),
      });
    } else {
      res.status(404);
      throw new Error('User not Found');
    }
  } catch (error) {
    // Handle the error and send an appropriate response
    res.status(error.statusCode || 500).json({ message: error.message || 'Internal Server Error' });
  }
});



//desc get all users
//route get/api/users
//access private/admin 
const getUsers = expressAsyncHandler(async (req, res) => {
  console.log(req.user);
  const users = await User.find({}); 
  res.json(users);
});


//desc Delete all users
//route  Delete /api/users/:id
//access private/admin 
const deleteUser = expressAsyncHandler(async (req, res) => {
 const user = await User.findById(req.params.id);
   
 if(user) {
  await user.remove();
  res.json({message: "User has been removed successfully"})
 }
 else if(!user) {
  res.status(404)
  throw new Error("User not found")
 }

});



//desc Get User by Id
//route  Get /api/users/:id
//access private/admin 

const getUserById = expressAsyncHandler(async(req, res)=> {
  const user = await User.findById(req.params.id);
  if(user) {
    res.json(user)
  } else {
    res.status(404)
    throw new Error("User not found")
  }

});



//desc update user 
//PUT api/users/:id/
//@Access Admin/Private

const updateUser = expressAsyncHandler(async(req, res)=> {
  const user = await User.findById(req.params.id);

if(user) {
  user.name = req.body.name || user.name
  user.email = req.body.email || user.email
  user.isAdmin = req.body.isAdmin 

  const updatedUser = await user.save()

  res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
  })


} else {
  res.status(404)
  throw new Error("User not Found")

}
});


export { authUser,registerUser, getUserProfile, updateUserProfile, getUsers, deleteUser, getUserById, updateUser}