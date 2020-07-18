import { Router } from 'express';
import CreateUserService from '../services/CreateUserService';

const usersRouter = Router();

usersRouter.post('/', async (request, response) => {
  try {

    const { name, email, password } = request.body;
    const createUserService = new CreateUserService();
    const user = await createUserService.execute({ name, email, password });
    delete user.password;
    return response.json({ success: true, user });

  } catch (err) {
    response.status(400).json({ success: false, error: err.message });
  }
});

export default usersRouter;
