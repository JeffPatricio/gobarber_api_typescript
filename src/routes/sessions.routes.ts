import { Router } from 'express';
import AuthenticateUserService from '../services/AuthenticateUserService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
  try {

    const { email, password } = request.body;
    const authenticateUser = new AuthenticateUserService();
    const { user, token } = await authenticateUser.execute({ email, password });
    delete user.password;
    return response.json({ success: true, user, token });

  } catch (err) {
    response.status(400).json({ success: false, error: err.message });
  }
});

export default sessionsRouter;
