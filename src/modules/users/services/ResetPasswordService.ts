import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import { isAfter, addHours } from 'date-fns';
import UsersRepository from '../typeorm/repositories/UsersRepository';
import UsersTokensRepository from '../typeorm/repositories/UsersTokensRepository';

interface IRequest {
    token: string;
    password: string;
}

class ResetPasswordService {
    public async execute({ token, password }: IRequest): Promise<void> {
        const usersRepository = getCustomRepository(UsersRepository);
        const userTokensRepository = getCustomRepository(UsersTokensRepository);

        const userToken = await userTokensRepository.findByToken(token);

        if (!userToken) {
            throw new AppError('Token do usuário não existe');
        }
        const user = await usersRepository.findById(userToken.user_id);

        if (!user) {
            throw new AppError('Usuário não existe');
        }

        const tokenCreatedAt = userToken.created_at;
        const compareDate = addHours(tokenCreatedAt, 2);

        if (isAfter(Date.now(), compareDate)) {
            throw new AppError('Token expirado');
        }
        user.password = await hash(password, 8);

        await usersRepository.save(user);
    }
}

export default ResetPasswordService;
