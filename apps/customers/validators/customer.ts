import vine from '@vinejs/vine'
import { Infer } from '@vinejs/vine/types'

/**
 * Validator to validate the payload when creating
 * a new customer.ts.
 */
export const createCustomerValidator = vine.compile(
  vine.object({
    firstname: vine.string(),
    lastname: vine.string(),
    organizationId: vine.string(),
    customerStatusId: vine.string().optional(),
    customerContactId: vine.string().optional(),
  })
)

/**
 * Validator to validate the payload when updating
 * an existing customer.ts.
 */
export const updateCustomerValidator = vine.compile(
  vine.object({})
)

export const getCustomersValidator = vine.compile(
  vine.object({
    page: vine.number().optional(),
    limit: vine.number().optional(),
  })
)

export type CreateCustomersSchema = Infer<typeof createCustomerValidator>
export type UpdateCustomersSchema = Infer<typeof updateCustomerValidator>
export type GetCustomersSchema = Infer<typeof getCustomersValidator>
