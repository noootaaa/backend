import vine from '@vinejs/vine'
import { Infer } from '@vinejs/vine/types'

/**
 * Validator to validate the payload when creating
 * a new health.ts.
 */
export const createHealthValidator = vine.compile(
  vine.object({})
)

/**
 * Validator to validate the payload when updating
 * an existing health.ts.
 */
export const updateHealthValidator = vine.compile(
  vine.object({})
)

export type CreateHealthSchema = Infer<typeof createHealthValidator>
export type UpdateHealthSchema = Infer<typeof updateHealthValidator>