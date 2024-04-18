import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

const UserController = () => import('#apps/user/controllers/users_controller')

router.group(() => {
  router
    .group(() => {
      router.get('/', [UserController, 'index'])
    })
    .prefix('/v1/users')
    .use(
      middleware.auth({
        guards: ['jwt'],
      })
    )
})
