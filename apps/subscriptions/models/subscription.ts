import { BaseModel, beforeCreate, belongsTo, column } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'
import { randomUUID } from 'node:crypto'
import Offer from '#apps/subscriptions/models/offer'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Organization from '#apps/organization/models/organization'

export default class Subscription extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare organizationId: string

  @column()
  declare offerId: string

  @column()
  declare status: string

  @belongsTo(() => Offer)
  declare offer: BelongsTo<typeof Offer>

  @belongsTo(() => Organization)
  declare organization: BelongsTo<typeof Organization>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  @beforeCreate()
  static async generateUuid(model: Subscription) {
    if (model.$dirty.id) {
      model.id = randomUUID()
    }
  }
}
