import type { HttpContext } from '@adonisjs/core/http'
import CustomerService from "#apps/customers/services/customer_service";
import { getCustomersByOrganizationIdValidator } from "#apps/organization/validators/organization";
import { inject } from "@adonisjs/core";

@inject()
export default class OrganizationCustomersController {
  constructor(
    private customerService: CustomerService
  ) {
  }


  async index({ request }: HttpContext) {
    const data = await request.validateUsing(getCustomersByOrganizationIdValidator)
    const organizationId = request.param('organizationId')

    return this.customerService.findByOrganizationId(data, organizationId)
  }
}
