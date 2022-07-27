const { default: axios } = require("axios");
require("dotenv").config();

exports.home = (req, res) => {
  res.render("index");
};

exports.list_product = (req, res) => {
  axios
    .get(process.env.NODEJS_APP_URL + "/api/products")
    .then(function (response) {
      res.render("list_product", { products: response.data.products });
    })
    .catch((err) => {
      res.send(err);
    });
};

exports.list_product_detail = (req, res) => {
  axios
    .get(process.env.NODEJS_APP_URL + "/api/productdetails")
    .then(function (response) {
      res.render("list_product_detail", {
        productDetails: response.data.productDetails,
      });
    })
    .catch((err) => {
      res.send(err);
    });
};

exports.add_product = (req, res) => {
  axios
    .get(process.env.NODEJS_APP_URL + "/api/categories")
    .then(function (response) {
      res.render("add_product", { categories: response.data.categories });
    })
    .catch((err) => {
      res.send(err);
    });
};

exports.update_product = (req, res) => {
  var _id = req.query.id;
  function getCategories() {
    return axios.get(process.env.NODEJS_APP_URL + "/api/categories");
  }

  function getProductById() {
    return axios.get(process.env.NODEJS_APP_URL + "/api/products/" + _id);
  }

  Promise.all([getCategories(), getProductById()])
    .then(function (results) {
      const categories = results[0].data.categories;
      const product = results[1].data.product;
      res.render("update_product", {
        product: product,
        categories: categories,
      });
    })
    .catch((err) => {
      res.send(err);
    });
};

exports.add_product_detail = (req, res) => {
  axios
    .get(process.env.NODEJS_APP_URL + "/api/products")
    .then(function (response) {
      res.render("add_product_detail", { products: response.data.products });
    })
    .catch((err) => {
      res.send(err);
    });
};

exports.update_product_detail = (req, res) => {
  var _id = req.query.id;
  function getProducts() {
    return axios.get(process.env.NODEJS_APP_URL + "/api/products");
  }

  function getProductDetailById() {
    return axios.get(process.env.NODEJS_APP_URL + "/api/productdetails/" + _id);
  }

  Promise.all([getProducts(), getProductDetailById()])
    .then(function (results) {
      const products = results[0].data.products;
      const productDetail = results[1].data.productDetail;
      res.render("update_product_detail", {
        productDetail: productDetail,
        products: products,
      });
    })
    .catch((err) => {
      res.send(err);
    });

};

exports.list_category = (req, res) => {
  axios
    .get(process.env.NODEJS_APP_URL + "/api/categories")
    .then(function (response) {
      res.render("list_category", { categories: response.data.categories });
    })
    .catch((err) => {
      res.send(err);
    });
};

exports.add_category = (req, res) => {
  res.render("add_category");
};

exports.update_category = (req, res) => {
  var _id = req.query.id;
  axios
    .get(process.env.NODEJS_APP_URL + "/api/categories/" + _id)
    .then(function (categorydata) {
      console.log(categorydata.data);
      res.render("update_category", { category: categorydata.data.category });
    })
    .catch((err) => {
      res.send(err);
    });
};

exports.list_size = (req, res) => {
  axios
    .get(process.env.NODEJS_APP_URL + "/api/sizes")
    .then(function (response) {
      res.render("list_size", { sizes: response.data.sizes });
    })
    .catch((err) => {
      res.send(err);
    });
};

exports.add_size = (req, res) => {
  axios
    .get(process.env.NODEJS_APP_URL + "/api/productDetails")
    .then(function (response) {
      res.render("add_size", { productDetails: response.data.productDetails });
    })
    .catch((err) => {
      res.send(err);
    });
};

exports.update_size = (req, res) => {


  var _id = req.query.id;
  function getProductDetails() {
    return axios.get(process.env.NODEJS_APP_URL + "/api/productdetails");
  }

  function getSizeById() {
    return axios.get(process.env.NODEJS_APP_URL + "/api/sizes/" + _id);
  }

  Promise.all([getProductDetails(), getSizeById()])
    .then(function (results) {
      const productDetails = results[0].data.productDetails;
      const size = results[1].data.size;
      res.render("update_size", {
        size: size,
        productDetails: productDetails,
      });
    })
    .catch((err) => {
      res.send(err);
    });

};
exports.list_sale = (req, res) => {
  axios
    .get(process.env.NODEJS_APP_URL + "/api/sales")
    .then(function (response) {
      res.render("list_sale", { sales: response.data.sales });
    })
    .catch((err) => {
      res.send(err);
    });
};

exports.add_sale = (req, res) => {
  res.render("add_sale");
};

exports.update_sale = (req, res) => {
  var _id = req.query.id;
  axios
    .get(process.env.NODEJS_APP_URL + "/api/sales/" + _id)
    .then(function (response) {
      res.render("update_sale", { sale: response.data.sale });
    })
    .catch((err) => {
      res.send(err);
    });
};

exports.list_order = (req, res) => {
  axios
    .get(process.env.NODEJS_APP_URL + "/api/orders")
    .then(function (response) {
      res.render("list_order", { orders: response.data.orders });
    })
    .catch((err) => {
      res.send(err);
    });
};