import {
  CreateOrganizationSchema,
  GetOrganizationsSchema,
} from '#apps/organization/validators/organization'
import Organization from '#apps/organization/models/organization'
import User from '#apps/user/models/user'
import db from '@adonisjs/lucid/services/db'

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

  async findByUserId(userId: string): Promise<Organization | null> {
    return Organization.query()
      .whereHas('users', (query) => {
        query.where('id', userId)
      })
      .first()
  }

  async create(payload: CreateOrganizationSchema, user: User) {
    const organization = await db.transaction(async (trx) => {
      const organizationEntity = await Organization.create(
        {
          ...payload,
          ownerId: user.id,
        },
        { client: trx }
      )

      await user
        .useTransaction(trx)
        .merge({
          organizationId: organizationEntity.id,
        })
        .save()

      return organizationEntity
    })

    return organization
  }

  async deleteById(organizationId: string) {
    const organization = await this.findById(organizationId)
    organization.users.map(async (user) => {
      await user
        //.useTransaction(trx)
        .merge({
          organizationId: null,
        })
        .save()
    })
    await organization.delete()
  }
}
