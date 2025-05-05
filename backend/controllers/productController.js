
import expressAsyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';


//fetch all products

const getProducts = expressAsyncHandler(async(req, res)=> {
    const Products = await Product.find({});
    res.json({Products});

});

const getProductById = expressAsyncHandler(async(req, res)=> {
    const product = await Product.findById(req.params.id)
    console.log(product);

    if(!product) {
        res.status(404)
        throw new Error ('Product not Found')
    }
    else {
        res.json({product });
    }

});






//desc Delete Product
//DELETE api/products/:id
//@Access Admin

const deleteProduct = expressAsyncHandler(async(req, res, next)=> {
    const product = await Product.findById(req.params.id);

    if(product) {
        await product.remove();
        res.status(204).json({
            message: "Product deleted successfully"
        })
    }
    else {
        res.status(404).json(
            {
                message: "Product not found"
            }
        )

    }



});

//desc Add product
//POST api/products
//ACCESS admin/private 

const createProduct = expressAsyncHandler(async (req, res, next)=> {

    const product = new Product({
        name: 'Sample',
        price: 0,
        user: req.user._id,
        image: '/images/sample.jpg',
        brand: 'sample brand',
        category: 'sample category',
        countInStock: 0,
        numReviews: 0,
        description: 'sample desc'
    })  

    const createdProduct = await product.save();

    res.status(201).json(createdProduct)
})



//desc Add product
//POST api/products/:id
//ACCESS admin/private 
const updateProduct = expressAsyncHandler(async (req, res, next) => {
    const { name, price, image, brand, category, countInStock, numReviews, description } = req.body;
    const product = await Product.findById(req.params.id);
  
    if (product) {
      product.name = name;
      product.price = price;
      product.image = image;
      product.brand = brand;
      product.category = category;
      product.countInStock = countInStock;
      product.numReviews = numReviews;
      product.description = description;
  
      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } else {
      throw new Error('Product not found');
    }
  });


  //desc Add Review
  //POST api/products/:id/review
  //@access private or admin

  const addReviews = expressAsyncHandler(async (req, res, next)=> {
    const { comment, rating, datePosted} =  req.body;

    const product = await Product.findById(req.params.id);
    if(product) {
        const existingReview = product.reviews.find((  review   ) => review.user.toString() === req.user._id.toString() );
        if(existingReview) {
        res.status(400);
        throw new Error('You already have a review'); }

        const review = {
            name: req.user.name,
            rating: Number(rating),
            comment,
            datePosted,
            user: req.user._id
        }

        product.reviews.unshift(review); 
        product.numReviews = product.reviews.length;
        product.rating = product.reviews.reduce((accum, item)=>   item.rating + accum, 0) / product.reviews.length;

        await product.save();
        res.status(201).json({message: "Review Added Successfully"})





    } else {
        res.status(404)
        throw new Error('Product not found');
    }



  });
  
export { getProducts, getProductById, deleteProduct, createProduct, updateProduct, addReviews}