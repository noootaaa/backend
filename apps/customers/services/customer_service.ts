import Customer from '#apps/customers/models/customer'
import { CreateCustomersSchema, GetCustomersSchema } from "#apps/customers/validators/customer";
import { GetCustomersByOrganizationIdSchema } from "#apps/organization/validators/organization";

export default class CustomerService {
  async findAll({ page = 1, limit = 10 }: GetCustomersSchema) {
    return Customer.query()
      .preload('customerContact')
      .preload('customerStatus')
      .preload('organization')
      .paginate(page, limit)
  }

  async findByOrganizationId({ page = 1, limit = 10 }: GetCustomersByOrganizationIdSchema, organizationId: string) {
    return Customer.query()
      .whereHas('organization', (query) => {
        query.where('organization_id', organizationId)
      })
      .preload('customerContact')
      .preload('customerStatus')
      .paginate(page, limit)
  }

  async create(payload: CreateCustomersSchema) {
    return Customer.create(payload)
  }
}
