const express = require('express');
const request = require("request-promise");


const app  = express();
const PORT = process.env.PORT || 5000;

const generateScrapperURL = (apiKey)=> `http://api.scraperapi.com?api_key=${apiKey}&autoparse=true`
app.use(express.json());

app.get("/",(req,res)=>{
    res.send("Welcome to Amazon Scrapper API");
})
//https://www.amazon.in/dp/B08WB857GB/
// detail of specific product
app.get('/products/:productId',async(req,res)=>{
    const {productId} = req.params;
    const {api_key} = req.query;
    try {
        // const response = await request(`${generateScrapperURL(api_key)}&url=https://www.amazon.in/dp/${productId}`);
        const response = await request(`${generateScrapperURL(api_key)}&url=https://www.amazon.in/dp/${productId}`);
        res.json(JSON.parse(response));
    } catch (error) {
        console.log("Error in fetching product",error);
        res.status(400).json(error);
    }
})
// product reviews
app.get('/products/:productId/reviews',async(req,res)=>{
    const {productId} = req.params;
    const {api_key} = req.query;
    try {
        const response = await request(`${generateScrapperURL(api_key)}&url=https://www.amazon.in/product-reviews/${productId}`);
        res.json(JSON.parse(response));
    } catch (error) {
        console.log("Error in fetching product",error);
        res.status(400).json(error);
    }
})

// product offfers

app.get('/products/:productId/offers',async(req,res)=>{
    const {productId} = req.params;
    const {api_key} = req.query;
    try {
        const response = await request(`${generateScrapperURL(api_key)}&url=https://www.amazon.in/gp/offer-listing/${productId}`);
        res.json(JSON.parse(response));
    } catch (error) {
        console.log("Error in fetching product",error);
        res.status(400).json(error);
    }
})

// product listing
app.get('/search/:searchQuery',async(req,res)=>{
    const {searchQuery} = req.params;
    const {api_key} = req.query;
    try {
        const response = await request(`${generateScrapperURL(api_key)}&url=https://www.amazon.in/s?k=${searchQuery}`);
        res.json(JSON.parse(response));
    } catch (error) {
        console.log("Error in fetching product",error);
        res.status(400).json(error);
    }
})

app.listen(PORT,()=>{
    console.log(`Server is running on PORT ${PORT}`);
})