/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

// start/routes.ts
import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

// Define your routes to be used in the application
router.post('/register', '#controllers/auth_controller.register') 
router.post('/login', '#controllers/auth_controller.login')
router.post('/logout', '#controllers/auth_controller.logout')


// Protecting routes with authentication middleware
router
  .get('/dashboard', async ({ auth }) => {
    await auth.check()            // returns 401 if not logged‑in
    return auth.user
  })
  .use(middleware.auth())         // protect it
