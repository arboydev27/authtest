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

router.post('/register', '#controllers/registration.store') 
router.post('/login', '#controllers/session.store')
router.post('/logout', '#controllers/session.destroy')

// any route after this will require a valid session cookie
router
  .get('/dashboard', async () => ({ secret: '🎉' }))
  .use(middleware.auth())   // defaults to the 'web' guard
