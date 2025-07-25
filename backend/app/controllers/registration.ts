import { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import { registerUserValidator } from '#validators/register_user'

export default class RegistrationsController {
  public async store ({ request, response, auth }: HttpContext) {
    // ⬇️ validates & sanitises
    const payload = await registerUserValidator.validate(request.all())

    const user = await User.create(payload)   // hooks will hash the password
    await auth.use('web').login(user)

    return response.created({ message: 'Account created' })
  }
}
