import { GetOrganizationsSchema } from '#apps/organization/validators/organization'
import Organization from '#apps/organization/models/organization'

export default class OrganizationService {
  async findAll({ page = 1, limit = 10, user = false }: GetOrganizationsSchema) {
    return Organization.query()
      .if(user, (query) => {
        query.preload('users')
      })
      .paginate(page, limit)
  }

  async findById(id: string): Promise<Organization> {
    return Organization.query().where('id', id).preload('users').firstOrFail()
  }
}
