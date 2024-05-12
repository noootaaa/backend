import type { HttpContext } from '@adonisjs/core/http'
import CustomerService from '#apps/customers/services/customer_service'
import { getCustomersByOrganizationIdValidator } from '#apps/organization/validators/organization'
import { inject } from '@adonisjs/core'
import { createCustomerValidator } from '#apps/customers/validators/customer'
import UserService from '#apps/user/services/user_service'

@inject()
export default class OrganizationCustomersController {
  constructor(
    private customerService: CustomerService,
    private userService: UserService
  ) {}

  async index({ request, bouncer, params, auth }: HttpContext) {
    const oidcId = auth.use('jwt').payload?.sub as string
    const user = await this.userService.findByOidcId(oidcId)

    await bouncer
      .with('OrganizationCustomerPolicy')
      .authorize('view', user.organizationId, params.organizationId)
    const data = await request.validateUsing(getCustomersByOrganizationIdValidator)
    const organizationId = request.param('organizationId')

    return this.customerService.findByOrganizationId(data, organizationId)
  }

  async create({ request, auth, bouncer }: HttpContext) {
    const oidcId = auth.use('jwt').payload?.sub as string
    const user = await this.userService.findByOidcId(oidcId)

    await bouncer
      .with('OrganizationCustomerPolicy')
      .authorize('create', user.organizationId, user.organizationId)
    const data = await request.validateUsing(createCustomerValidator)

    return this.customerService.create(data)
  }
}
