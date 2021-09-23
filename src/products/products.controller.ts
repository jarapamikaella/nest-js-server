import { Body, Controller, Post, Get, Param, Patch, Delete  } from "@nestjs/common";
import { ProductService } from "./products.service";

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductService) {

    }

    @Post()
    addProduct(@Body('name') name: string, @Body('price') price: string): any {
        const createdKey = this.productsService.addProduct(name, price);
        return { id: createdKey };
    }

    @Get()
    getAllProducts() {
        return this.productsService.getProducts();
    }

    @Get(':id')
    getProduct(@Param('id') productId: string,) {
        return this.productsService.getProduct(productId);
    }

    @Patch(':id')
    updateProduct(
        @Param('id') productId: string,
        @Body('name') productName: string,
        @Body('price') productPrice: string
    ) {
        this.productsService.updateProduct(productId, productName, productPrice)
        return null
    }

    @Delete(':id')
    removeProduct(@Param('id') productId: string,) {
        this.productsService.deleteProdcut(productId);
        return null;
    }
}