import Knex from "knex"

export async function seed(Knex: Knex){
   await Knex('itens').insert([
        {title: 'lampadas', image:'lampadas.svg'},
        {title: 'Pilhas e Bateria', image:'baterias.svg'},
        {title: 'Papéis e papelão', image:'papeis-papelao.svg'},
        {title: 'Residuos Eletrrônicos', image:'eletronicos.svg'},
        {title: 'residuos Orgânicos', image:'organicos.svg'},
        {title: 'Óleo de cozinha', image:'oleo.svg'},
    ]);
}