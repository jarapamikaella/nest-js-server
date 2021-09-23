import { Injectable, NotFoundException } from "@nestjs/common";
import { Product } from "./product.model";

@Injectable()
export class ProductService {
    private products: Product[] = [];

    addProduct(name: string, price: string) {
        const productId = Math.random().toString();
        const newProduct = new Product(productId, name, price)
        this.products.push(newProduct)
        return productId;
    }

    getProducts() {
        return [...this.products];
    }

    getProduct(productId: string) {
        const product = this.findProduct(productId)[0]
        return { ...product }
    }

    updateProduct(productId: string, name: string, price: string) {
        const [product, index] = this.findProduct(productId);
        const updateProduct = { ...product };
        if (name) {
            updateProduct.name = name;
        }
        if (price) {
            updateProduct.price = price;
        }
        this.products[index] = { ...updateProduct }
    }

    deleteProdcut(productId: string){
        const productIndex = this.findProduct(productId)[1];
        this.products.splice(productIndex, 1)
    }

    private findProduct(id: string): [Product, number] {
        const productIndex = this.products.findIndex((prod) => prod.id === id);
        const product = this.products[productIndex]
        if (!product) {
            throw new NotFoundException('Ooops Sorry I can find your product')
        }
        return [product, productIndex];
    }
}