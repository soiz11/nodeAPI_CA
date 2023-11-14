const express = require("express");
const mongoose = require("mongoose");
const Product = require("./models/productModel");

const app = express();
const PORT = 3000;

app.use(express.json())
app.use(express.urlencoded({extended:false}))

/*app.listen(PORT,()=>{
    console.log(`node running on port ${PORT}`);
})*/

//data saving
app.post("/products",async (req,res)=>{
   try{
    const product = await Product.create(req.body)
    res.status(200).json(product);
   }
   catch(e){
    console.log(e,message);
    res.status(500).json({message:e.message})
   }
})

//get all product data
app.get("/products",async (req,res)=>{
    try{
     const products = await Product.find({});
     res.status(200).json(products);
    }
    catch(e){
     res.status(500).json({message:e.message});
    }
 })

 //get unique product data
 app.get("/products/:id",async (req,res)=>{
    try{
        const {id} = req.params;
     const product = await Product.findById(id);
     res.status(200).json(product);
    }
    catch(e){
     res.status(500).json({message:e.message});
    }
 })

 //update product
 app.put("/products/:id",async (req,res)=>{
    try{
     const {id} = req.params;
     const product = await Product.findByIdAndUpdate(id, req.body);
     if(!product){
        return res.status(404).json({message:"cannot find product"});
     }
     const updatedProduct = await Product.findById(id)
     res.status(200).json(updatedProduct);
    }
    catch(e){
     res.status(500).json({message:e.message});
    }
 })

 //delete product
 app.delete("/products/:id",async (req,res)=>{
    try{
     const {id} = req.params;
     const product = await Product.findByIdAndDelete(id, req.body);
     if(!product){
        return res.status(404).json({message:"cannot find product"});
     }
     res.status(200).json(product);
    }
    catch(e){
     res.status(500).json({message:e.message});
    }
 })


 const dbUrl = "mongodb+srv://itumadmin:itumprotect@sohanapi.dxxtlls.mongodb.net/Node-API?retryWrites=true&w=majority";
mongoose.connect(dbUrl)
 .then(()=>{
    console.log("connected to mongoDB");
    app.listen(PORT,()=>{
        console.log(`node running on port ${PORT}`);
    })
     
 })
 .catch((e)=>{
    console.log("db connection error :",e);
 })