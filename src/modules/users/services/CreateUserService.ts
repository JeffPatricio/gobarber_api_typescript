import { hash } from 'bcryptjs';
import User from '../infra/typeorm/entities/User';
import AppError from '../../../shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {

  private usersRepository: IUsersRepository;

  constructor(usersRepository: IUsersRepository) {
    this.usersRepository = usersRepository;
  }

  public async execute({ name, email, password }: IRequest): Promise<User | undefined> {
    const checkUserExists = await this.usersRepository.findByEmail(email);
    if (checkUserExists) throw new AppError('Email address already used');
    const hashedPassword = await hash(password, 8);
    const user = await this.usersRepository.create({ name, email, password: hashedPassword });
    return user;
  }
}

export default CreateUserService;
