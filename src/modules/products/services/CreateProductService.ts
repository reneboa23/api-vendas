import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Product from '../typeorm/entities/Product';
import { ProductRepository } from '../typeorm/repositories/ProductsRepositories';

//a interface é o que recebemos da requisição do fontend.
interface IRequest {
    name: string;
    price: number;
    quantity: number;
}

class CreateProductService {
    public async execute({
        name,
        price,
        quantity,
    }: IRequest): Promise<Product> {
        const productsRepository = getCustomRepository(ProductRepository);
        const productExists = await productsRepository.findByName(name);

        //verifica se ja esxite o nome do produto e guarda na const
        if (productExists) {
            throw new AppError('Existe um produto com este nome');
        }

        //cria dentro do repositorio caso o nome seja validado
        const product = productsRepository.create({
            name,
            price,
            quantity,
        });

        //salva o produto no repositorio
        await productsRepository.save(product);

        return product;
    }
}

export default CreateProductService;
