import vine from '@vinejs/vine'
import { Infer } from '@vinejs/vine/types'

/**
 * Validator to validate the payload when creating
 * a new subscription.ts.
 */
export const createSubscriptionValidator = vine.compile(
  vine.object({})
)

/**
 * Validator to validate the payload when updating
 * an existing subscription.ts.
 */
export const updateSubscriptionValidator = vine.compile(
  vine.object({})
)

export const getSubscriptionsValidator = vine.compile(
  vine.object({
    page: vine.number().optional(),
    limit: vine.number().optional(),
  })
)

export type CreateSubscriptionsSchema = Infer<typeof createSubscriptionValidator>
export type UpdateSubscriptionsSchema = Infer<typeof updateSubscriptionValidator>
export type GetSubscriptionsSchema = Infer<typeof getSubscriptionsValidator>
