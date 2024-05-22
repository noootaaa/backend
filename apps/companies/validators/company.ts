import vine from '@vinejs/vine'
import { Infer } from '@vinejs/vine/types'

/**
 * Validator to validate the payload when creating
 * a new customer.ts.
 */
export const createCompanyValidator = vine.compile(
  vine.object({
    firstname: vine.string(),
    lastname: vine.string(),
    organizationId: vine.string().optional(),
    companyStatusId: vine.string().optional(),
    companyContactId: vine.string().optional(),
  })
)

/**
 * Validator to validate the payload when updating
 * an existing customer.ts.
 */
export const updateCompanyValidator = vine.compile(
  vine.object({
    firstname: vine.string().optional(),
    lastname: vine.string().optional(),
    type: vine.string().optional(),
    referentId: vine.string().optional(),
  })
)

export const getCompaniesValidator = vine.compile(
  vine.object({
    page: vine.number().optional(),
    limit: vine.number().optional(),
  })
)

export type CreateCompanySchema = Infer<typeof createCompanyValidator>
export type UpdateCompanySchema = Infer<typeof updateCompanyValidator>
export type GetCompaniesSchema = Infer<typeof getCompaniesValidator>
