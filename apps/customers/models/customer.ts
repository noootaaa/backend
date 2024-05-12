import { BaseModel, beforeCreate, belongsTo, column } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'
import { randomUUID } from 'node:crypto'
import Organization from '#apps/organization/models/organization'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import CustomerStatus from '#apps/customers/models/customer_status'
import CustomerContact from '#apps/customers/models/customer_contact'
import User from '#apps/user/models/user'

export default class Customer extends BaseModel {
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
  declare customerStatusId: string

  @column()
  declare customerContactId: string

  @column()
  declare referentId: string

  @belongsTo(() => User)
  declare referent: BelongsTo<typeof User>

  @belongsTo(() => Organization)
  declare organization: BelongsTo<typeof Organization>

  @belongsTo(() => CustomerStatus)
  declare customerStatus: BelongsTo<typeof CustomerStatus>

  @belongsTo(() => CustomerContact)
  declare customerContact: BelongsTo<typeof CustomerContact>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  @beforeCreate()
  static async generateUuid(model: Customer) {
    model.id = randomUUID()
  }
}
