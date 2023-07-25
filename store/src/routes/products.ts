import { getProducts } from "../controllers/products";
import express from "express";

export const router = express.Router();

router.route("/").get(getProducts);
