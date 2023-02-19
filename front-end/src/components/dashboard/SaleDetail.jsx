import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import NavBar from './NavBar';
import SaleDetailItem from './SaleDetailItem';

import authenticatedRoute from '../../auth/AuthenticatedRoute';


const SaleDetail = () => {

    let { id } = useParams();
    id = JSON.parse( id );

    let [ isLoad, setLoad ] = useState( true );
    let [ sale, setSale ] = useState(0);

    useEffect(() => {

        const getSales = async () => {

            await fetch(`http://localhost:3030/sales/${ id }`)
                .then(( response ) => response.json())
                .then(( data ) => {
                    setSale( data.sale );
                })
                .catch((e) => console.log(e));
    
            setLoad( false );
            
        }

        getSales();
        
    }, []);

    return (

        <>
        
            <NavBar />

            <div className='p-5'>

                <h1>Pedido #{ sale.id }</h1>

                <div className='d-flex flex-wrap justify-content-between align-items-center w-100 mb-5 pb-3 border-bottom border-3 border-warning'>
                    <div>
                        <p className='text-start mb-2'><strong className='fw-bolder'>Pedido: </strong>#{ sale.id }</p>
                        <p className='text-start mb-2'><strong className='fw-bolder'>Cliente: </strong>{ sale.client }</p>
                    </div>
                    <div>
                        <p className='text-end mb-2'><strong className='fw-bolder'>Fecha: </strong>{ sale.date }</p>
                        <p className='text-end mb-2'><strong className='fw-bolder'>Hora: </strong>{ sale.time }</p>
                    </div>
                </div>

                <div className='d-flex flex-wrap justify-content-between pb-3 border-bottom border-1 border-warning'>

                    <div className='w-50 pe-3'>
                        <div className='d-flex flex-nowrap align-items-center mb-3'>
                            <i className="fa-solid fa-burger text-warning fs-3 me-2"></i>
                            <p className='text-white text-start p-0 m-0'>Comidas: { !isLoad && sale.foods.length }</p>
                        </div>

                        <ul className='text-start p-0 mb-4' style={{ listStyle: 'none' }}>
                            {   
                                !isLoad &&
                                sale.foods.map( ( food, i ) => {
                                    return <SaleDetailItem 
                                                key={ `food-${ i }` }
                                                title={ food.title } 
                                                category={ food.category } 
                                                price={ food.price }
                                                quantity={ food.quantity }
                                                finalPrice={ food.finalPrice }
                                            />
                                })}
                        </ul>
                    </div>

                    <div className='w-50 ps-3'>
                        <div className='d-flex flex-nowrap align-items-center mb-3'>
                            <i className="fa-solid fa-wine-glass text-warning fs-3 me-2"></i>
                            <p className='text-white text-start p-0 m-0'>Bebidas: { !isLoad && sale.drinks.length }</p>
                        </div>

                        <ul className='text-start p-0 mb-4' style={{ listStyle: 'none' }}>
                            {   
                                !isLoad &&
                                sale.drinks.map( ( drink, i ) => {
                                    return <SaleDetailItem 
                                                key={ `drink-${ i }` }
                                                title={ drink.title } 
                                                category={ drink.category } 
                                                price={ drink.price }
                                                quantity={ drink.quantity }
                                                finalPrice={ drink.finalPrice }
                                            />
                                })}
                        </ul>
                    </div>

                </div>

                <p className='fs-3 text-warning fw-bold text-end pt-3'>Total: ${ sale.finalAmount }</p>

            </div>

        </>

    )
}

export default authenticatedRoute( SaleDetail );