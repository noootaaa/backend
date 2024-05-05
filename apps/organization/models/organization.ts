import { BaseModel, beforeCreate, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'
import { randomUUID } from 'node:crypto'
import User from '#apps/user/models/user'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'

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

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  @beforeCreate()
  static async generateUuid(model: Organization) {
    if (model.$dirty.id) {
      model.id = randomUUID()
    }
  }
}