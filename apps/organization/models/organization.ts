import { BaseModel, beforeCreate, belongsTo, column, hasMany, hasOne } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'
import { randomUUID } from 'node:crypto'
import User from '#apps/user/models/user'
import type { BelongsTo, HasMany, HasOne } from '@adonisjs/lucid/types/relations'
import Customer from '#apps/companies/models/company'
import Subscription from '#apps/subscriptions/models/subscription'

export default class Organization extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare name: string

  @column()
  declare description: string

  @column()
  declare ownerId: string

  @belongsTo(() => User)
  declare owner: BelongsTo<typeof User>

  @hasMany(() => User)
  declare users: HasMany<typeof User>

  @hasMany(() => Customer)
  declare customers: HasMany<typeof Customer>

  @hasOne(() => Subscription)
  declare subscription: HasOne<typeof Subscription>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  @beforeCreate()
  static async generateUuid(model: Organization) {
    model.id = randomUUID()
  }
}
