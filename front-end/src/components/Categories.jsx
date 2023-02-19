import { useEffect, useState } from 'react';

import { useNavigate } from "react-router-dom";

import Card from 'react-bootstrap/Card';

const Categories = () => {

    let [ nombre, setNombre ] = useState( false );

    useEffect(() => {

        let cliente = localStorage.getItem('cliente');

        cliente = JSON.parse( cliente );

        setNombre( cliente.nombre );

    }, []);

    const navigate = useNavigate();

    const nextPageFoods = () => {
        navigate("/foods");
    };

    const nextPageDrinks = () => {
        navigate("/drinks");
    };

    return (
        
        <main className='categories' style={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>

            <h2>Hola { nombre }</h2>

            <p>Acá podes elegir que comer o que tomar...</p>

            <div className='mt-3 container' >

                <Card className='bg-transparent w-75 border border-warning border-3 mx-auto mb-3' 
                    style={{ cursor: 'pointer' }}
                    onClick={ nextPageFoods }>
                    <Card.Body>
                        <i className="fa-solid fa-burger text-center text-warning" style={{ fontSize: '3.75rem', marginBottom: '1rem' }}></i>
                        <Card.Title>Menú de comidas</Card.Title>
                    </Card.Body>
                </Card>

                <Card className='bg-transparent w-75 border border-warning border-3 mx-auto' 
                    style={{ cursor: 'pointer' }}
                    onClick={ nextPageDrinks }>
                    <Card.Body>
                        <i className="fa-solid fa-wine-glass text-center text-warning" style={{ fontSize: '3.75rem', marginBottom: '1rem' }}></i>
                        <Card.Title>Menú de bebidas</Card.Title>
                    </Card.Body>
                </Card>

            </div>
            
        </main>

    )

}

export default Categories;