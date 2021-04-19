import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { ProductRepository } from '../typeorm/repositories/ProductsRepositories';

interface IRequest {
    id: string;
}
class DeleteProductService {
    public async execute({ id }: IRequest): Promise<void> {
        const productsRepository = getCustomRepository(ProductRepository);

        //traz um produto especifico do repositorio.
        const product = await productsRepository.findOne(id);

        //verifica se existe o produto.
        if (!product) {
            throw new AppError('Produto não existe.');
        }

        await productsRepository.remove(product);
    }
}

export default DeleteProductService;
