const express = require("express");
const Promotion = require("../models/promotion");
const Product = require("../models/product");

const router = express.Router();

router.get('/', async function(req, res){
  return res.json(await Promotion.find({}).exec());
}).post("/", async function (req, res) {
  const { code, active, discount, product_id } = req.body || {};

  if (!code || !active || !product_id || (!discount && Number(discount) !== 0))
    return res.status(400).send("code, active, discount and product_id are required");

  const codeExists = (await Promotion.find({ code }).exec()).length !== 0;
  if (codeExists) {
    return res.status(400).send("A promotion with that code already exists");
  }

  const productDoesntExist = !(await Product.findById(product_id).exec());
  if (productDoesntExist)
    return res.status(400).send("No product exists with that id");

  const promotion = new Promotion({ code, active, discount, product_id });
  await promotion.save();
  return res.send(promotion.toJSON());
});

module.exports = router;
