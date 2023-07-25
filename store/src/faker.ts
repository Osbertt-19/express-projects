import { faker } from "@faker-js/faker";
import { Product } from "./models/Product";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const companyList = ["nike", "adidas", "yonex", "victor", "mizuno"];

export interface IProduct {
  name: string;
  price: number;
  featured: boolean;
  rating: number;
  company: string;
}

const seed = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  for (let i = 0; i < 100; i++) {
    const randomProduct: IProduct = {
      name: faker.commerce.productName(),
      price: faker.number.int({ min: 10, max: 1000 }),
      featured: Math.random() < 0.5,
      rating: faker.number.int({ min: 1, max: 5 }),
      company: companyList[Math.floor(Math.random() * companyList.length)],
    };
    const product = Product.create(randomProduct);
  }
};
seed();
