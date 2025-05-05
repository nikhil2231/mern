import bcrypt from 'bcryptjs';


//using bcrypt to not store password in plain texts

const users = [
{

    name: "Admin User",
    email: "Admin@example.com",
    password: bcrypt.hashSync('12345', 10),
    isAdmin: true,
},
{
    name: "John Doe",
    email: 'john@example.com',
    password: bcrypt.hashSync('12345', 10)
}, 
{
    name: "Johnny Doe",
    email: 'johnny@example.com',
    password: bcrypt.hashSync('1245', 10)
}




];


export default users;