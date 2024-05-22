import type { HttpContext } from '@adonisjs/core/http'
import { getCustomersByOrganizationIdValidator } from '#apps/organization/validators/organization'
import { inject } from '@adonisjs/core'
import { createCompanyValidator } from '#apps/companies/validators/company'
import UserService from '#apps/user/services/user_service'
import CompanyService from '#apps/companies/services/company_service'

@inject()
export default class OrganizationCompaniesController {
  constructor(
    private companyService: CompanyService,
    private userService: UserService
  ) {}

  async index({ request, bouncer, params, auth }: HttpContext) {
    const oidcId = auth.use('jwt').payload?.sub as string
    const user = await this.userService.findByOidcId(oidcId)

    await bouncer
      .with('OrganizationCompaniesPolicy')
      .authorize('view', user.organizationId, params.organizationId)
    const data = await request.validateUsing(getCustomersByOrganizationIdValidator)
    const organizationId = request.param('organizationId')

    return this.companyService.findByOrganizationId(data, organizationId)
  }

  async create({ request, auth, bouncer }: HttpContext) {
    const oidcId = auth.use('jwt').payload?.sub as string
    const user = await this.userService.findByOidcId(oidcId)
    const organizationId = request.param('organizationId')

    await bouncer
      .with('OrganizationCompaniesPolicy')
      .authorize('create', user.organizationId, organizationId)
    const data = await request.validateUsing(createCompanyValidator)

    return this.companyService.create({
      ...data,
      organizationId: data.organizationId ?? organizationId,
    })
  }

  async show({ params, bouncer, auth }: HttpContext) {
    const oidcId = auth.use('jwt').payload?.sub as string
    const user = await this.userService.findByOidcId(oidcId)

    await bouncer
      .with('OrganizationCompaniesPolicy')
      .authorize('view', user.organizationId, params.organizationId)

    return this.companyService.findById(params.id)
  }
}
