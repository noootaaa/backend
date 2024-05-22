import { BaseModel, beforeCreate, column, hasOne } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'
import { randomUUID } from 'node:crypto'
import Customer from '#apps/companies/models/company'
import type { HasOne } from '@adonisjs/lucid/types/relations'

export default class CompanyStatus extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare label: string

  @hasOne(() => Customer)
  declare customer: HasOne<typeof Customer>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  @beforeCreate()
  static async generateUuid(model: CompanyStatus) {
    if (model.$dirty.id) {
      model.id = randomUUID()
    }
  }
}
