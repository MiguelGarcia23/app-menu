import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Table from 'react-bootstrap/Table';

import authenticatedRoute from '../../auth/AuthenticatedRoute';
import logo from '../../assets/logo-ticket.svg';


const TicketSale = () => {

    let { id } = useParams();
    id = JSON.parse( id );

    let [ sale, setSale ] = useState( 0 );
    let [ isLoad, setLoad ] = useState( true );

    useEffect(() => {

        const getAPI = async () => {

            await fetch(`http://localhost:3030/sales/${ id }`)
                .then(( response ) => response.json())
                .then(( data ) => {
                    setSale( data.sale );
                })
                .catch((e) => console.log(e));

            setLoad( false );

        }

        getAPI();

    }, []);

    const navigate = useNavigate();

    if( !isLoad ) {
        setTimeout(() => {
            window.print();
        }, 1000);
    }

    window.onafterprint = () => {
        navigate('/dashboard/sales');
    };
    
    return (

        <div className='bg-light p-2' style={{ width: '150px' }}>

            <img src={ logo } alt='Logo del Restaurante' className='d-block mx-auto mb-2' style={{ width: '50px', height: '40px' }} />

            <p className='text-dark text-center mb-1' style={{ fontSize: '0.5rem' }}>Pedido: #{ sale.id }</p>

            <div className='d-flex flex-nowrap justify-content-between align-items-center mb-2'>
                <div>
                    <p className='text-dark text-start m-0' style={{ fontSize: '0.5rem' }}>Cliente: { sale.client }</p>
                    <p className='text-dark text-start m-0' style={{ fontSize: '0.5rem' }}>Mesa: { sale.table }</p>
                </div>
                <div>
                    <p className='text-dark text-start m-0' style={{ fontSize: '0.5rem' }}>Fecha: { sale.date }</p>
                    <p className='text-dark text-start m-0' style={{ fontSize: '0.5rem' }}>Hora: { sale.time }</p>
                </div>
            </div>
            
            <Table striped bordered className='w-100 mb-1'>

                <thead>
                    <tr>
                        <td style={{ width: '23px', fontSize: '0.5rem', padding: '2px' }}>Cant.</td>
                        <td style={{ fontSize: '0.5rem', padding: '2px' }}>Comida</td>
                        <td style={{ width: '28px', fontSize: '0.5rem', padding: '2px' }}>Total</td>
                    </tr>
                </thead>

                <tbody>
                    {      
                        !isLoad &&
                        sale.foods.map( ( food, i ) => {
                            return(
                                <tr key={ i }>
                                    <td style={{ width: '23px', fontSize: '0.5rem', padding: '2px' }}>{ food.quantity }</td>
                                    <td style={{ fontSize: '0.5rem', padding: '2px' }}>{ food.title }</td>
                                    <td style={{ width: '28px', fontSize: '0.5rem', padding: '2px' }}>${ food.finalPrice }</td>
                                </tr>
                            )
                        })
                    }
                </tbody>

            </Table>

            <Table striped bordered className='w-100 mb-1'>

                <thead>
                    <tr>
                        <td style={{ width: '23px', fontSize: '0.5rem', padding: '2px' }}>Cant.</td>
                        <td style={{ fontSize: '0.5rem', padding: '2px' }}>Bebida</td>
                        <td style={{ width: '28px', fontSize: '0.5rem', padding: '2px' }}>Total</td>
                    </tr>
                </thead>

                <tbody>
                    {      
                        !isLoad &&
                        sale.drinks.map( ( drink, i ) => {
                            return(
                                <tr key={ i }>
                                    <td style={{ width: '23px', fontSize: '0.5rem', padding: '2px' }}>{ drink.quantity }</td>
                                    <td style={{ fontSize: '0.5rem', padding: '2px' }}>{ drink.title }</td>
                                    <td style={{ width: '28px', fontSize: '0.5rem', padding: '2px' }}>${ drink.finalPrice }</td>
                                </tr>
                            )
                        })
                    }
                </tbody>

            </Table>

            <p className='text-dark text-end m-0' style={{ fontSize: '0.5rem' }}>Subtotal: ${ sale.totalAmountBeforeIVA }</p>
            <p className='text-dark text-end m-0' style={{ fontSize: '0.5rem' }}>IVA: ${ sale.iva }</p>
            <p className='text-dark text-end fw-bold m-0 mb-1' style={{ fontSize: '0.625rem' }}>Total: ${ sale.finalAmount }</p>

            <p className='text-dark text-center m-0' style={{ fontSize: '0.5rem' }}>¡GRACIAS POR SU COMPRA!</p>

        </div>

    )
}

export default authenticatedRoute( TicketSale );