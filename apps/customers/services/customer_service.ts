import Customer from '#apps/customers/models/customer'
import type { CreateCustomersSchema, GetCustomersSchema, UpdateCustomersSchema } from '#apps/customers/validators/customer'
import type { GetCustomersByOrganizationIdSchema } from '#apps/organization/validators/organization'
import type { ModelPaginatorContract } from '@adonisjs/lucid/types/model'

export default class CustomerService {
  async findAll({ page = 1, limit = 10 }: GetCustomersSchema) {
    return Customer.query()
      .preload('customerContact')
      .preload('customerStatus')
      .preload('organization')
      .paginate(page, limit)
  }

  async findByOrganizationId({ page = 1, limit = 10, type }: GetCustomersByOrganizationIdSchema, organizationId: string): Promise<ModelPaginatorContract<Customer>> {
    return Customer.query()
      .whereHas('organization', (query) => {
        query.where('organization_id', organizationId)
      })
      .if(type, (query) => {
        query.where('type', type!)
      })
      .preload('customerContact')
      .preload('customerStatus')
      .paginate(page, limit)
  }

  async findById(customerId: string): Promise<Customer> {
    return Customer.query()
      .where('id', customerId)
      .preload('customerContact')
      .preload('customerStatus')
      .preload('organization')
      .preload('referent')
      .firstOrFail()
  }

  async create(payload: CreateCustomersSchema): Promise<Customer> {
    return Customer.create(payload)
  }
  
  async updateById(customerId: string, payload: UpdateCustomersSchema): Promise<Customer> {
    const customer = await this.findById(customerId)

    return customer.merge(payload)
      .save()
  }

  async deleteById(customerId: string): Promise<void> {
    const customer = await this.findById(customerId)

    return customer.delete()
  }
}
