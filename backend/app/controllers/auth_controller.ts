import { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import { registerUserValidator } from '#validators/register_user'

export default class AuthController {
    /**
     * POST /register - Create account & instantly log in
     */
      public async register ({ request, auth, response }: HttpContext) {
        // ⬇️ validates & sanitises
        const payload = await registerUserValidator.validate(request.all()) // Validate the registration data
        const user = await User.create(payload)         // Password will be hashed by model hooks
        await auth.use('web').login(user)               // Sets session cookie
        return response.created({ message: 'Account created' }) // Respond with a success message
      }

      /**
       * POST /login - Log in an existing user, verify credentials & start session
       */
      public async login({ request, auth, response }: HttpContext) {
        const { email, password, remember_me } = request.only(['email', 'password', 'remember_me']) // Extract credentials from request
        const user = await User.verifyCredentials(email, password) // Verify credentials using model method
        await auth.use('web').login(user, !!remember_me) // Log in the user and set session cookie
        return response.ok({ message: 'Logged in successfully' }) // Respond with a success message
      }

      /**
       * POST /logout - Log out the current user & destroy session
       */
      public async logout({ auth, response }: HttpContext) {
        await auth.use('web').logout() // Log out the user and destroy session
        return response.ok({ message: 'Logged out successfully' }) // Respond with a success message
      }
}