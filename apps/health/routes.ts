import router from '@adonisjs/core/services/router'

const HealthController = () => import('#apps/health/controllers/health_controller')
router.group(() => {

  router.get('/live',[HealthController, 'live'])
  router.get('/readiness',[HealthController, 'readiness'])
}).prefix('health')
