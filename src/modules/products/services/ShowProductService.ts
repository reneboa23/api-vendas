import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import Product from "../typeorm/entities/Product";
import { ProductRepository } from "../typeorm/repositories/ProductsRepositories";

interface IRequest{
    id: string
}
class ShowProductService {
    public async execute({ id }: IRequest): Promise<Product> {
        const productsRepository = getCustomRepository(ProductRepository);

        //traz um produto especifico do repositorio.
        const product = await productsRepository.findOne(id);

        //verifica se existe o produto.
        if(!product){
            throw new AppError('Produto não existe.');
        }

        return product;
    }
}

export default ShowProductService;
