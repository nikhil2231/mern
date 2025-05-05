

//middleware for error Handling if some error occurred or if user visits undefined routes



const notFound = (req, res, next)=> {
const error = new Error(`${req.originalUrl} not found`);

res.status(404);
next(error);
}


const errorHandler = (error, req, res, next) => {
 
 const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
 console.log(`from statussssssssss ${statusCode}`);

 res.status(statusCode);
 console.log(error);

 res.json({
    message : error.message, 
    stack: process.env.NODE_ENV === 'production' ? null : error.stack,

   
 })
}

export { notFound , errorHandler}