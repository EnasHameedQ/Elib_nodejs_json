var express = require('express');
var router = express.Router();
const axios = require("axios").default; // default means auto complite 

/* GET home page. */
router.get('/', (req, res, next) => { // this =>  means function (req, res, next)


    res.render('index', { title: 'home' });
});
//  axios way
// router.get('/products', (req, res, next) => {
//     axios.get("https://dummyjson.com/products").then((data) => {
//         console.log(data)
//         res.render('products', {
//             title: 'products page',
//             // products: JSON.stringify(data.data.products), // stringify  replaces objects to string
//             products: data.data.products,
//         });
//     });
// });
// async  way
router.get('/products', async(req, res, next) => {
    try {
        let responce = await axios.get("https://dummyjson.com/products");
        res.render('products', {
            title: 'products page here',
            products: responce.data.products,

        });
        // console.log(products.data)
        //     // res.end('done...'))
        // res.end(JSON.stringify(products.data))
    } catch (err) {
        console.log(err)
        res.send('sory thairs error')
    }
});

router.get('/products/:id', async(req, res, next) => {
    try {
        const productId = req.params.id;
        let responce = await axios.get(`https://dummyjson.com/products/${productId}`); //${productId} for id 
        res.render('product', {

            product: responce.data,

        });

    } catch (err) {
        console.log(err);
        res.send('sory thairs error')


    }
});

router.get('/products/search', async(req, res, next) => {
    try {
        const query = req.query.q;
        let responce = await axios.get(`https://dummyjson.com/products/search?q=${query}`);
        res.render('search', {

            products: responce.data.products,

        });

    } catch (err) {
        console.log(err)
        res.send('sory search error')
    }
});

router.get('products/category', async(req, res, next) => {
    try {
        let responce = await axios.get("https://dummyjson.com/products/categories");
        res.render('category', {
            title: 'category page here',
            search: responce.data.search,

        });

    } catch (err) {
        console.log(err)
        res.send('sory thairs error category')
    }
});

router.get('/products/:category', async(req, res, next) => {
    try {
        const productCategory = req.params.category;
        let responce = await axios.get(`https://dummyjson.com/products/${productCategory}`); //${productId} for id 
        res.render('product', {

            product: responce.data,

        });

    } catch (err) {
        console.log(err);
        res.send('sory thairs error')


    }
});
module.exports = router;