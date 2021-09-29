import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from '@nestjs/mongoose'
import { Model } from "mongoose";

import { Product } from "./product.model";

@Injectable()
export class ProductService {
    private products: Product[] = [];

    constructor(
        @InjectModel('Product') private readonly productModel: Model<Product>,
    ) { }

    async addProduct(name: string, price: number) {
        const newProduct = new this.productModel({ name, price });
        await newProduct.save();
    }

    async getProducts() {
        const products = await this.productModel.find()
        return products.map((prod) => ({
            id: prod.id,
            name: prod.name,
            price: prod.price,
        }));
    }

    async getProduct(productId: string) {
        const product = await this.findProduct(productId)
        return { id: product.id, name: product.name, price: product.price };
    }

    async updateProduct(productId: string, name: string, price: number) {
        const updateProduct = await this.findProduct(productId);
        if (name) {
            updateProduct.name = name;
        }
        if (price) {
            updateProduct.price = price;
        }
        updateProduct.save()
    }

    async deleteProduct(productId: string) {
        const result = await this.productModel.deleteOne({ _id: productId }).lean().exec()
        if (result.n === 0) {
            throw new NotFoundException('Oh crap! No results found')
        }
    }

    private async findProduct(id: string): Promise<Product> {
        let product;
        try {
            product = await this.productModel.findById(id)
        } catch (error) {
            throw new NotFoundException('Oh crap! No results found')
        }
        if (!product) {
            throw new NotFoundException('Oh crap! No results found')
        }
        return product;
    }
}