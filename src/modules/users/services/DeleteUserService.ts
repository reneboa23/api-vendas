import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import UsersRepository from '../typeorm/repositories/UsersRepository';

interface IRequest {
    id: string;
}
class DeleteUserService {
    public async execute({ id }: IRequest): Promise<void> {
        const usersRepository = getCustomRepository(UsersRepository);

        //traz um produto especifico do repositorio.
        const user = await usersRepository.findOne(id);

        //verifica se existe o produto.
        if (!user) {
            throw new AppError('Usuário não existe.');
        }

        await usersRepository.remove(user);
    }
}

export default DeleteUserService;
