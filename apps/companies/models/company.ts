import { BaseModel, beforeCreate, belongsTo, column } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'
import { randomUUID } from 'node:crypto'
import Organization from '#apps/organization/models/organization'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import User from '#apps/user/models/user'
import CompanyStatus from '#apps/companies/models/company_status'
import CompanyContact from './company_contact.js'

export default class Company extends BaseModel {
  static table = 'companies'

  @column({ isPrimary: true })
  declare id: string

  @column()
  declare firstname: string

  @column()
  declare lastname: string

  @column()
  declare type: string

  @column()
  declare organizationId: string

  @column()
  declare companyStatusId: string

  @column()
  declare companyContactId: string

  @column()
  declare referentId: string

  @belongsTo(() => User, {
    localKey: 'id',
    foreignKey: 'referentId',
  })
  declare referent: BelongsTo<typeof User>

  @belongsTo(() => Organization)
  declare organization: BelongsTo<typeof Organization>

  @belongsTo(() => CompanyStatus)
  declare companyStatus: BelongsTo<typeof CompanyStatus>

  @belongsTo(() => CompanyContact)
  declare companyContact: BelongsTo<typeof CompanyContact>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  @beforeCreate()
  static async generateUuid(model: Company) {
    model.id = randomUUID()
  }
}
