import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import Product from "../typeorm/entities/Product";
import { ProductRepository } from "../typeorm/repositories/ProductsRepositories";

interface IRequest{
    id: string;
    name: string;
    price: number;
    quantity: number;
}
class UpdateProductService {
    public async execute({ id, name, price, quantity }: IRequest): Promise<Product> {
        const productsRepository = getCustomRepository(ProductRepository);

        //traz um produto especifico do repositorio.
        const product = await productsRepository.findOne(id);

        //verifica se existe o produto.
        if(!product){
            throw new AppError('Produto não existe.');
        }

        //verifica se ja esxite o nome do produto e guarda na const
        const productExists = await productsRepository.findByName(name);
        if(productExists){
            throw new AppError('Existe um produto com este nome');
        }

        //
        product.name = name;
        product.price = price;
        product.quantity = quantity;

        await productsRepository.save(product);

        return product;
    }
}

export default UpdateProductService;
