const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const  bodyParser = require('body-parser')

const productsRouter = require("./routes/product.route.js");
const cartRouter = require("./routes/cart.route.js");

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

//TODO:user authentication 
//user id is passed as input as of now

app.use(productsRouter);
app.use(cartRouter);

app.listen(port, () => {
  console.log("server is hosted on :", port);
});
