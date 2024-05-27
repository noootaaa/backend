import type { HttpContext } from '@adonisjs/core/http'
import ProductService from '#apps/products/services/product_service'

export default class OrganizationProductsController {
  constructor(
    protected productService: ProductService,
  ) {}

  async index({ params }: HttpContext) {
    const organizationId = params.organizationId

    return this.productService.findAllByOrganizationId(organizationId)
  }
}