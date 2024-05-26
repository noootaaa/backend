import { BaseModel, beforeCreate, belongsTo, column } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'
import { randomUUID } from 'node:crypto'
import ProductCategory from '#apps/products/models/product_category'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Organization from '#apps/organization/models/organization'

export default class Product extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare name: string

  @column()
  declare description?: string

  @column()
  declare price: number

  @column()
  declare amount: number

  @column()
  declare thhumbnail?: string

  @column()
  declare categoryId: string

  @column()
  declare organizationId: string

  @column()
  declare customFields: { [key: string]: string }

  @belongsTo(() => ProductCategory)
  declare category: BelongsTo<typeof ProductCategory>

  @belongsTo(() => Organization)
  declare organization: BelongsTo<typeof Organization>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  @beforeCreate()
  public static async generateUuid(model: Product) {
    model.id = randomUUID()
  }
}