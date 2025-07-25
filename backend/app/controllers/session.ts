import User from '#models/user'
import { HttpContext } from '@adonisjs/core/http'

export default class SessionController {
  // POST /login
  async store({ request, auth, response }: HttpContext) {
    /**
     * Step 1: Get credentials from the request body
     */
    const { email, password } = request.only(['email', 'password'])

    /**
     * Step 2: Verify credentials
     */
    const user = await User.verifyCredentials(email, password)

    /**
     * Step 3: Login user
     */
    await auth.use('web').login(user)

    /**
     * Step 4: Send them to a protected route
     */
    // response.redirect('/dashboard')

    /**
     * Step 5: Return a success message
     */
     // This is optional, you can return a message or redirect to a different page
     // For example, you can return a JSON response
     // return response.json({ message: 'Logged in successfully' })
     // Or just return a success status
    return response.ok({ message: 'Logged in' })
  }

  // POST /logout
  async destroy({ auth, response }: HttpContext) {
    await auth.use('web').logout()
    return response.ok({ message: 'Logged out' })
  }
}
