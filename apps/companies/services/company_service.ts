import type { GetCustomersByOrganizationIdSchema } from '#apps/organization/validators/organization'
import type { ModelPaginatorContract } from '@adonisjs/lucid/types/model'
import { CreateCompanySchema, GetCompaniesSchema, UpdateCompanySchema } from '../validators/company.js'
import Company from '#apps/companies/models/company'

export default class CompanyService {
  async findAll({ page = 1, limit = 10 }: GetCompaniesSchema): Promise<ModelPaginatorContract<Company>> {
    return Company.query()
      .preload('companyContact')
      .preload('companyStatus')
      .preload('organization')
      .paginate(page, limit)
  }

  async findByOrganizationId({ page = 1, limit = 10, type }: GetCustomersByOrganizationIdSchema, organizationId: string): Promise<ModelPaginatorContract<Company>> {
    return Company.query()
      .whereHas('organization', (query) => {
        query.where('organization_id', organizationId)
      })
      .if(type, (query) => {
        query.where('type', type!)
      })
      .preload('companyContact')
      .preload('companyStatus')
      .paginate(page, limit)
  }

  async findById(customerId: string): Promise<Company> {
    return Company.query()
      .where('id', customerId)
      .preload('companyContact')
      .preload('companyStatus')
      .preload('organization')
      .preload('referent')
      .firstOrFail()
  }

  async create(payload: CreateCompanySchema): Promise<Company> {
    return Company.create(payload)
  }
  
  async updateById(companyId: string, payload: UpdateCompanySchema): Promise<Company> {
    const company = await this.findById(companyId)

    return company.merge(payload)
      .save()
  }

  async deleteById(companyId: string): Promise<void> {
    const company = await this.findById(companyId)

    return company.delete()
  }
}
