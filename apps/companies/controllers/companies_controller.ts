import type { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'
import { getCompaniesValidator } from '#apps/companies/validators/company'
import CompanyService from '#apps/companies/services/company_service'

@inject()
export default class CompaniesController {
  constructor(private companyService: CompanyService) {}

  /**
   * Display a list of resource
   */
  async index({ request }: HttpContext) {
    const data = await request.validateUsing(getCompaniesValidator)

    return this.companyService.findAll(data)
  }

  async show({ params }: HttpContext) {
    const companyId = params.companyId

    return this.companyService.findById(companyId)
  }
}
