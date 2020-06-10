import { Request, Response } from 'express';
import Knex from "../database/connection";


class PointsController {

    async index(request: Request, response: Response){
        //cidade uf itens query,params
        const {city,uf, itens} = request.query;

        const parseItens = String(itens)
        .split(',')
        .map(item=> Number(item.trim()));

        const points = await Knex('points')
            .join('points_itens','point_id','=','points_itens.point_id')
            .whereIn('points_itens.itens_id',parseItens)
            .where('city',String(city))
            .where('uf',String(uf))
            .distinct()
            .select('points.*');
        
        return response.json(points);
    }

    async show(request: Request, response: Response) {
        const { id } = request.params;

        const point = await Knex('points').where('id', id).first();

        if (!point) {
            return response.status(400).json({ message: 'POint Not Found.' });
        }
        const itens = await Knex('itens')
            .join('points_itens', 'itens.id', '=', 'points_itens.itens_id')
            .where('points_itens.itens_id', id)
            .select('itens.title');
        return response.json({ point,itens});

    }
    async  create(request: Request, response: Response) {
        const {
            name,
            email,
            whattsapp,
            latitude,
            longitude,
            city,
            uf,
            itens
        } = request.body;


        const trx = await Knex.transaction();
        const point = {
            name,
            email,
            whattsapp,
            latitude,
            longitude,
            city,
            uf
        }
        
        const insertedIds = await trx('points').insert(point );

        const point_id = insertedIds[0];

        const pointItens = itens.map((itens_id: number) => {
            return {
                itens_id,
                point_id,
            }
        })
        await trx('points_itens').insert(pointItens);
        await trx.commit();

        return response.json({
            id:point_id,
            ...point,
        });
    }
}

export default PointsController;