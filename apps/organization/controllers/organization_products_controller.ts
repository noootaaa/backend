import type { HttpContext } from '@adonisjs/core/http'
import ProductService from '#apps/products/services/product_service'
import { createProductValidator } from '#apps/products/validators/product'

export default class OrganizationProductsController {
  constructor(
    protected productService: ProductService,
  ) {}

  async index({ params }: HttpContext) {
    const organizationId = params.organizationId

    return this.productService.findAllByOrganizationId(organizationId)
  }

  async create({ params, request }: HttpContext) {
    const data = await request.validateUsing(createProductValidator)

    return this.productService.createByOrganizationId(params.organizationId, data)
  }
}