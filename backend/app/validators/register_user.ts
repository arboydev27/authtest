// app/validators/auth_validator.ts
import vine from '@vinejs/vine'

// ✔ function–style
export const registerUserValidator = vine.compile(
  vine.object({
    fullName : vine.string().trim().minLength(2).maxLength(40),
    email    : vine.string().trim().email(),
    password : vine.string().minLength(8),   // requires passwordConfirmation
  })
)
