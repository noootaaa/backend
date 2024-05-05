import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'customer_contacts'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.string('id').primary()
      table.string('email')
      table.string('mobile_phone').nullable()
      table.string('landline_phone').nullable()
      table.string('address').nullable()
      table.string('city').nullable()
      table.string('zip_code').nullable()

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
