import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

const ProductsController = () => import('#apps/products/controllers/products_controller')

router.group(() => {
  router.group(() => {
    router.get('/', [ProductsController, 'index'])

  })
  .prefix('/v1/products')
  .use(middleware.auth({ guards: ['jwt'] }))
})