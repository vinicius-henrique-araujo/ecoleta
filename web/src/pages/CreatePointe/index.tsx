import React, { useEffect, useState, ChangeEvent } from 'react';

import './styles.css';
import { Link } from 'react-router-dom';
import { FiArrowDownLeft } from 'react-icons/fi';
import { Map, TileLayer, Marker } from 'react-leaflet';
import api from '../../services/api';



import logo from '../../assests/logo.svg'
import Axios from 'axios';


interface Item {
    id: number,
    title: string,
    image_url: string
}
interface IBGEUFResponse {
    sigla: string;
}
interface IBGECityResponse{
 nome:string;
}
const CreatePoint = () => {
    const [itens, setItens] = useState<Item[]>([]);
    const [ufs, setUfs] = useState<string[]>([]);
    const [citys, setCitys] = useState<string[]>([]);
    const [selectUF, setselectUF] = useState('0');

    useEffect(() => {
        api.get('itens').then(response => {
            setItens(response.data);
        })
    }, []);
    useEffect(() => {
        Axios.get<IBGEUFResponse[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados').then(Response => {

            const ufinitals = Response.data.map(uf => uf.sigla);
            setUfs(ufinitals);
        });
    });
    
    useEffect(() => {
        console.log('simbora brasil'+selectUF);
        if(selectUF === '0'){
            return;
        }
        Axios.get<IBGECityResponse[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectUF}/municipios`).then(Response => {

            const cityNames = Response.data.map(citys => citys.nome);
            setCitys(cityNames);
        });
        

      
    }, [selectUF]);

    useEffect(()=>{
      
    });
    function rendowSelectUf(event: ChangeEvent<HTMLSelectElement> ){
        const uf = event.target.value;
        //setselectUF(uf);
        setselectUF(uf);
    }
    return (
        <div id="page-create-point">
            <header>
                <img src={logo} alt="Ecoleta" />

                <Link to="/">
                    <FiArrowDownLeft />
                    volta para home
                </Link>
            </header>
            <form >
                <h1>Cadastro do <br />ponto de coleta</h1>
                <fieldset>
                    <legend>
                        <h2>Dados</h2>
                    </legend>
                    <div className="field">
                        <label htmlFor="name">Nome da entidadde</label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                        />
                    </div>
                    <div className="field-group">
                        <div className="field">
                            <label htmlFor="email">E-mail</label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                            />
                        </div>
                        <div className="field">
                            <label htmlFor="name">Whatsapp</label>
                            <input
                                type="text"
                                name="whatsapp"
                                id="whatsapp"
                            />
                        </div>
                    </div>
                </fieldset>

                <fieldset>
                    <legend>
                        <h2>Endereço</h2>
                        <span>Selecione o endereço do mapa</span>
                    </legend>

                    <Map center={[-11.3826558, -48.527156]} zoom={15}>
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                        />
                        <Marker position={[-11.3826558, -48.527156]} />
                    </Map>

                    <div className="fiel-group">
                        <div className="field">
                            <label htmlFor="uf">Estado</label>
                            <select onChange={rendowSelectUf} name="uf" value={selectUF} id="uf">
                                <option value="0">Selecione uma UF</option>
                                {ufs.map(uf => (
                                    <option key={uf} value={uf}>{uf}</option>
                                ))}
                            </select>
                        </div>
                        <div className="field">
                            <label htmlFor="city">Cidade</label>
                            <select name="city" id="city">
                                <option value="0">Selecione uma Cidade</option>
                                {citys.map(city => (
                                    <option key={city} value={city}>{city}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </fieldset>

                <fieldset>
                    <legend>
                        <h2>Itens de Coleta</h2>
                        <span>Selecione um ou mais Itens abaixo</span>
                    </legend>

                    <ul className="items-grid">

                        {itens.map(item => (
                            <li key={item.id}>
                                <img src={item.image_url} alt={item.title} />
                                <span>{item.title}</span>
                            </li>
                        ))}

                    </ul>
                </fieldset>

                <button type="submit">Cadastrar Ponto de Coleta</button>
            </form>
        </div>

    );
}

export default CreatePoint;