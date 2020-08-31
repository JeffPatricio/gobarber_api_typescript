import { getRepository, Repository } from 'typeorm';
import User from '../entities/User';
import IUsersRepository from '../../../repositories/IUsersRepository';
import ICreateUserDTO from '../../../dtos/ICreateUserDTO';

class UsersRepository implements IUsersRepository {

  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async findById(id: string): Promise<User | undefined> {
    return this.ormRepository.findOne(id);
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    return this.ormRepository.findOne({ where: { email } });
  }

  public async create(userData: ICreateUserDTO): Promise<User | undefined> {
    const user = this.ormRepository.create(userData);
    await this.ormRepository.save(user);
    return user;
  }

  public async save(user: User): Promise<User | undefined> {
    return this.ormRepository.save(user);
  }

}

export default UsersRepository;
