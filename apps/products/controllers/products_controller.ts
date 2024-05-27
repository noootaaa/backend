import { inject } from '@adonisjs/core'
import ProductService from '#apps/products/services/product_service'

@inject()
export default class ProductsController {
  constructor(
    protected productService: ProductService,
  ) {}
  
  async index() {
    return "Route /v1/products work!"
  }
}