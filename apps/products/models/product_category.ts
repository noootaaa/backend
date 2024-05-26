import Organization from '#apps/organization/models/organization'
import { BaseModel, beforeCreate, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'
import { randomUUID } from 'node:crypto'

export default class ProductCategory extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare name: string

  @column()
  declare description?: string

  @column()
  declare organizationId: string

  @belongsTo(() => Organization)
  declare organization: BelongsTo<typeof Organization>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  @beforeCreate()
  public static async generateUuid(model: ProductCategory) {
    model.id = randomUUID()
  }
}