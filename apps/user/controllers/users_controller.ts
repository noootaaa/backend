import type { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'
import UserService from '#apps/user/services/user_service'
import { getUserValidator } from '#apps/user/validators/user'
@inject()
export default class UsersController {
  constructor(private userService: UserService) {}

  /**
   * Display a list of resource
   */
  async index({ request, bouncer }: HttpContext) {
    await bouncer.with('UserPolicy').authorize('view' as never)
    const getUserSchema = await request.validateUsing(getUserValidator)

    return this.userService.findAll(getUserSchema)
  }
}
