import { z } from 'zod';

const loginSchema = z.object({
  login: z.string().min(1, { message: 'O usuário é obrigatório' }),
  password: z.string().min(1, { message: 'A senha é obrigatória' }),
});

export default loginSchema;