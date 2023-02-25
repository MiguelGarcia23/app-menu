import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Table from 'react-bootstrap/Table';

import NavBar from './NavBar';

import authenticatedRoute from '../../auth/AuthenticatedRoute';

import '../../styles/dashboard.css';


const PendingSales = () => {
    
    let [ fullSales, setFullSales ] = useState( [] );
    
    useEffect(() => {

        const getSales = async () => {

            let listSales = [];

            await fetch('http://localhost:3030/sales/pending')
                .then(( response ) => response.json())
                .then(( data ) => {
                    listSales = data.sales;
                })
                .catch((e) => console.log(e));

            setFullSales( listSales );

        }

        getSales();
      
    }, []);

    const navigate = useNavigate();

    const declineSale = (e) => {

        let id = e.target.id;

        fetch(`http://localhost:3030/sales/pending/decline/${ id }`, {
            method: 'POST',
            headers: {
                'Content-Type': 'Application/json',
            }
        })
            .then(response => response.json())

        navigate('/dashboard/sales');

    };

    const approveSale = (e) => {

        let id = e.target.id;

        fetch(`http://localhost:3030/sales/pending/approve/${ id }`, {
            method: 'POST',
            headers: {
                'Content-Type': 'Application/json',
            }
        })
            .then(response => response.json())

        navigate(`/dashboard/sales/print/${ id }`);

    };

    return (

        <>

            <NavBar />
            
            <div className='py-5 px-4'>

                <h1 className='mb-4'>Pedidos pendientes</h1>
                
                <Table striped bordered hover className='border-warning'>

                    <thead className='bg-warning border-text'>
                        <tr>
                            <th className='text-dark'>#</th>
                            <th className='text-dark'>Cliente</th>
                            <th className='text-dark'>Mesa</th>
                            <th className='text-dark'>Categoría</th>
                            <th className='text-dark'>Fecha</th>
                            <th className='text-dark'>Hora</th>
                            <th className='text-dark'>Precio</th>
                            <th className='text-dark'>Procesar</th>
                            <th></th>
                        </tr>
                    </thead>

                    <tbody>
                        { fullSales.map( ( sale, i ) => {

                            let compra = [];

                            if( sale.foods.length > 0 ) {
                                compra.push('Comidas');
                            }

                            if( sale.drinks.length > 0 ) {
                                compra.push('Bebidas')
                            }

                            return (
                                <tr key={ i }>
                                    <td className='text-light'>{ sale.id }</td>
                                    <td className='text-light'>{ sale.client }</td>
                                    <td className='text-light'>{ sale.table }</td>
                                    <td className='text-light'>{ compra.join(' & ') }</td>
                                    <td className='text-light'>{ sale.date }</td>
                                    <td className='text-light'>{ sale.time }</td>
                                    <td className='text-light'>${ sale.finalAmount }</td>
                                    <td className='d-flex justify-content-around align-items-center mt-1'>
                                        <i className='fa-solid fa-x text-danger' id={ sale.id } style={{ cursor: 'pointer' }} onClick={ declineSale } />
                                        <i className='fa-solid fa-check text-success' id={ sale.id } style={{ cursor: 'pointer' }} onClick={ approveSale } />
                                    </td>
                                    <td>
                                        <Link
                                            to={{
                                                pathname: `/dashboard/sales/${ sale.id }`,
                                            }}
                                            className='text-warning'
                                        >
                                        Ver detalle
                                        </Link>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>

                </Table>

            </div>
        

        </>

    )
}

export default authenticatedRoute( PendingSales );