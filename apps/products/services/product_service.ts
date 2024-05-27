import Product from '#apps/products/models/product'

export default class ProductService {
  async findById(productId: string) {
    return Product.query()
      .where('id', productId)
      .preload('category')
      .preload('organization')
      .firstOrFail
  }

  async findAllByOrganizationId(organizationId: string) {
    return Product.query()
      .where('organizationId', organizationId)
      .preload('category')
  }


  async createByOrganizationId(organizationId: string, data: any) {

    return Product.create({
      ...data,
      organizationId
    })
}