import vine from '@vinejs/vine'
import { Infer } from '@vinejs/vine/types'

/**
 * Validator to validate the payload when creating
 * a new organization.ts.
 */
export const createOrganizationValidator = vine.compile(
  vine.object({})
)

/**
 * Validator to validate the payload when updating
 * an existing organization.ts.
 */
export const updateOrganizationValidator = vine.compile(
  vine.object({})
)

export const getOrganizationsValidator = vine.compile(
  vine.object({
    page: vine.number().optional(),
    limit: vine.number().optional(),
    user: vine.boolean().optional(),
  })
)

export type CreateOrganizationSchema = Infer<typeof createOrganizationValidator>
export type UpdateOrganizationSchema = Infer<typeof updateOrganizationValidator>
export type GetOrganizationsSchema = Infer<typeof getOrganizationsValidator>
