import {Request, Response} from 'express';
import Knex from '../database/connection';

class ItensControllers {
    async index(request: Request, response: Response){
    const itens = await Knex('itens').select('*');

    const serializedItens = itens.map(item => {
        return {
            id: item.id,
            title: item.title,
            image_url: `http://localhost:3333/uploads/${item.image}`,
        };
    });

    return response.json(serializedItens);
    }

}
export default ItensControllers;