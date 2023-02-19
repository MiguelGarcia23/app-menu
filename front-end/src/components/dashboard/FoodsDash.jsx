import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Table from 'react-bootstrap/Table';

import NavBar from './NavBar';

import authenticatedRoute from '../../auth/AuthenticatedRoute';


const FoodsDash = () => {

    let [ foods, setFoods ] = useState( [] );
    let [ activeFoods, setActiveFoods ] = useState( [] );

    let [ search, setSearch ] = useState('');

    useEffect(() => {

        fetch('http://localhost:3030/foods')
            .then(( response ) => response.json())
            .then(( data ) => {
                setFoods( data.foods );
                setActiveFoods( data.foods );
            })
            .catch((e) => console.log(e));

    }, []);

    const searchRealTime = (e) => {
        setSearch( e.target.value );
        filter( e.target.value );
    };

    const filter = ( wordSearched ) => {

        let resultSearch = foods.filter( ( food ) => {
            if (
                food.title
                    .toLowerCase()
                    .includes( wordSearched.toLowerCase() ) ||
                food.category
                    .toLowerCase()
                    .includes( wordSearched.toLowerCase() ) ||
                food.description
                    .toLowerCase()
                    .includes( wordSearched.toLowerCase() )
            ) {
                return food;
            }
        });

        setActiveFoods( resultSearch );

    };

    const navigate = useNavigate();
    
    const goCreatePage = () => {
        navigate('/dashboard/foods/create');
    }

    return (

        <>

            <NavBar />
            
            <div className='py-5 px-4'>

                <h1 className='mb-4'>Lista de comidas</h1>

                <Button className='bg-transparent border-warning text-warning fs-5 fw-bold py-2 px-4 mb-4' onClick={ goCreatePage }>Crear comida</Button>
                
                <InputGroup className='container mb-4' onChange={ searchRealTime }>
                    <InputGroup.Text className='bg-warning text-dark fw-bold' value={ search }>
                        Buscar comida:
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
                        { activeFoods.map( ( food, i ) => {
                            return (
                                <tr key={ i }>
                                    <td className='text-light'>{ food.id }</td>
                                    <td className='text-light'>{ food.title }</td>
                                    <td className='text-light text-capitalize'>{ food.category }</td>
                                    <td className='text-light'>{ food.description }</td>
                                    <td className='text-light'>${ food.price }</td>
                                    <td className='text-light'>
                                        { food.available ? 'Sí' : 'No' }
                                    </td>
                                    <td>
                                        <Link
                                            to={{
                                                pathname: `/dashboard/foods/${ food.id }`,
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

export default authenticatedRoute( FoodsDash );