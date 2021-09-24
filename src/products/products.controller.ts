import { Body, Controller, Post, Get, Param, Patch, Delete  } from "@nestjs/common";

import { ProductService } from "./products.service";

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductService) {

    }

    @Post()
    async addProduct(@Body('name') name: string, @Body('price') price: number) {
        const createdKey = await this.productsService.addProduct(name, price);
        return { id: createdKey };
    }

    @Get()
    async getAllProducts() {
        const products = await this.productsService.getProducts();
        return products;
    }

    @Get(':id')
    async getProduct(@Param('id') productId: string,) {
        const product = await this.productsService.getProduct(productId);
        return product;
    }

    @Patch(':id')
    async updateProduct(
        @Param('id') productId: string,
        @Body('name') productName: string,
        @Body('price') productPrice: number
    ) {
        await this.productsService.updateProduct(productId, productName, productPrice)
        return null
    }

    @Delete(':id')
    async removeProduct(@Param('id') productId: string,) {
        await this.productsService.deleteProduct(productId);
        return null;
    }
}