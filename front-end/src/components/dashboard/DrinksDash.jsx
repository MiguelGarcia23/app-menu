import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Table from 'react-bootstrap/Table';

import NavBar from './NavBar';

import authenticatedRoute from '../../auth/AuthenticatedRoute';


const DrinksDash = () => {

    let [ drinks, setDrinks ] = useState( [] );
    let [ activeDrinks, setActiveDrinks ] = useState( [] );

    let [ search, setSearch ] = useState('');

    useEffect(() => {

        fetch('http://localhost:3030/drinks')
            .then(( response ) => response.json())
            .then(( data ) => {
                setDrinks( data.drinks );
                setActiveDrinks( data.drinks );
            })
            .catch((e) => console.log(e));

    }, []);

    const searchRealTime = (e) => {
        setSearch( e.target.value );
        filter( e.target.value );
    };

    const filter = ( wordSearched ) => {

        let resultSearch = drinks.filter( ( drink ) => {
            if (
                drink.title
                    .toLowerCase()
                    .includes( wordSearched.toLowerCase() ) ||
                drink.category
                    .toLowerCase()
                    .includes( wordSearched.toLowerCase() ) ||
                drink.description
                    .toLowerCase()
                    .includes( wordSearched.toLowerCase() )
            ) {
                return drink;
            }
        });

        setActiveDrinks( resultSearch );

    };

    const navigate = useNavigate();
    
    const goCreatePage = () => {
        navigate('/dashboard/drinks/create');
    }

    return (

        <>

            <NavBar />
            
            <div className='py-5 px-4'>

                <h1 className='mb-4'>Lista de bebidas</h1>

                <Button className='bg-transparent border-warning text-warning fs-5 fw-bold py-2 px-4 mb-4' onClick={ goCreatePage }>Crear bebida</Button>
                
                <InputGroup className='container mb-4' onChange={ searchRealTime }>
                    <InputGroup.Text className='bg-warning text-dark fw-bold' value={ search }>
                        Buscar bebida:
                    </InputGroup.Text>
                    <Form.Control />
                </InputGroup>
                
                <Table striped bordered hover className='border-warning'>
                    <thead className='bg-warning border-text'>
                        <tr>
                            <th className='text-dark'>#</th>
                            <th className='text-dark'>Título</th>
                            <th className='text-dark'>Categoría</th>
                            <th className='text-dark'>Descripción</th>
                            <th className='text-dark'>Precio</th>
                            <th className='text-dark'>Disponible</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        { activeDrinks.map( ( drink, i ) => {
                            return (
                                <tr key={ i }>
                                    <td className='text-light'>{ drink.id }</td>
                                    <td className='text-light'>{ drink.title }</td>
                                    <td className='text-light text-capitalize'>{ drink.category }</td>
                                    <td className='text-light'>{ drink.description }</td>
                                    <td className='text-light'>${ drink.price }</td>
                                    <td className='text-light'>
                                        { drink.available ? 'Sí' : 'No' }
                                    </td>
                                    <td>
                                        <Link
                                            to={{
                                                pathname: `/dashboard/drinks/${ drink.id }`,
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

export default authenticatedRoute( DrinksDash );