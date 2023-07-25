import { RequestHandler } from "express";
import { Product } from "../models/Product";

type queryProduct = {
  name?: { $regex: string; $options: string };
  featured?: boolean;
  company?: string;
  price?: { [x: string]: number };
  rating?: { [x: string]: number };
};
export const getProducts: RequestHandler = async (req, res) => {
  const { name, featured, company, sort, numeric } = req.query;
  console.log(req.query);
  let queryObject: queryProduct = {};
  if (featured) {
    queryObject.featured = featured === "true" ? true : false;
  }
  if (name) {
    queryObject.name = { $regex: name.toString(), $options: "i" };
  }
  if (company) {
    queryObject.company = company.toString();
  }
  if (numeric) {
    const operatorMap = {
      ">": "$gt",
      ">=": "$gte",
      "=": "$eq",
      "<": "$lt",
      "<=": "$lte",
    };

    type operatorKey = keyof typeof operatorMap;
    const regEx = /\b(<|>|>=|=|<|<=)\b/g;
    let filters = numeric
      .toString()
      .replace(regEx, (match: operatorKey) => `-${operatorMap[match]}-`);

    filters.split(",").forEach((item) => {
      const [field, operator, value] = item.split("-");
      if (field === "price") {
        queryObject.price = { [operator]: Number(value) };
      }
      if (field === "rating") {
        queryObject.rating = { [operator]: Number(value) };
      }
    });
  }

  let sortString = "createdAt";
  if (sort) {
    sortString = sort.toString();
    console.log(sortString);
  }
  const limit = Number(req.query.limit) || 10;
  const page = Number(req.query.page) || 1;
  const skip = (page - 1) * limit;

  let products = await Product.find(queryObject)
    .sort(sortString)
    .skip(skip)
    .limit(limit);
  res.json({ productNum: products.length, products });
};
