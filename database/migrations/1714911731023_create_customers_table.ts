import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'customers'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.string('id').primary()

      table.string('firstname')
      table.string('lastname')
      table.string('type')
      table
        .string('organization_id')
        .nullable()
        .references('id')
        .inTable('organizations')
        .onUpdate('CASCADE')
      table
        .string('customer_status_id')
        .nullable()
        .references('id')
        .inTable('customer_status')
        .onUpdate('CASCADE')
      table
        .string('customer_contact_id')
        .nullable()
        .references('id')
        .inTable('customer_contacts')
        .onUpdate('CASCADE')

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
