import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

const CustomersController = () => import('#apps/customers/controllers/customers_controller')

router.group(() => {
  router
    .group(() => {
      router.get('/', [CustomersController, 'index'])
      router.post('/', [CustomersController, 'create'])
    })
    .prefix('/v1/customers')
    .use(middleware.auth({ guards: ['jwt'] }))
})