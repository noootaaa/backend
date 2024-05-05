import { GetSubscriptionsSchema } from '#apps/subscriptions/validators/subscription'
import Subscription from '#apps/subscriptions/models/subscription'

export default class SubscriptionService {
  async findAll({ page = 1, limit = 10 }: GetSubscriptionsSchema) {
    return Subscription.query().paginate(page, limit)
  }
}
