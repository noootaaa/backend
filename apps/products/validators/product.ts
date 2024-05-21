import vine from '@vinejs/vine'
import { Infer } from '@vinejs/vine/types'

/**
 * Validator to validate the payload when creating
 * a new product.ts.
 */
export const createProductValidator = vine.compile(
  vine.object({})
)

/**
 * Validator to validate the payload when updating
 * an existing product.ts.
 */
export const updateProductValidator = vine.compile(
  vine.object({})
)

export type CreateProductsSchema = Infer<typeof createProductValidator>
export type UpdateProductsSchema = Infer<typeof updateProductValidator>