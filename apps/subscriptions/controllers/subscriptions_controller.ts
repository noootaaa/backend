import type { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'
import SubscriptionService from '#apps/subscriptions/services/subscription_service'
import { getSubscriptionsValidator } from '#apps/subscriptions/validators/subscription'
@inject()
export default class SubscriptionsController {
  constructor(private subscriptionService: SubscriptionService) {}

  /**
   * Display a list of resource
   */
  async index({ request }: HttpContext) {
    const data = await request.validateUsing(getSubscriptionsValidator)

    return this.subscriptionService.findAll(data)
  }
}
