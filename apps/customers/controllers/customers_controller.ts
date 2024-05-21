import type { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'
import CustomerService from '#apps/customers/services/customer_service'
import { getCustomersValidator } from '#apps/customers/validators/customer'
@inject()
export default class CustomersController {
  constructor(private customerService: CustomerService) {}

  /**
   * Display a list of resource
   */
  async index({ request }: HttpContext) {
    const data = await request.validateUsing(getCustomersValidator)

    return this.customerService.findAll(data)
  }

  async show({ params }: HttpContext) {
    const customerId = params.customerId

    return this.customerService.findById(customerId)
  }
}
