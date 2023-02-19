import React from 'react';

import { useNavigate } from 'react-router-dom';

import Button from 'react-bootstrap/Button';

import FoodsGroup from './FoodsGroup';

let categories = require('../../data/categoriesFoods.json')


const Foods = () => {

    const navigate = useNavigate();

    const nextPageDrinks = () => {
        navigate("/drinks");
    };

    const nextPageCart = () => {
        navigate("/cart");
    };

    return (

        <main className='foods-page pb-5' bg='success'>

            <h2 className='fw-semibold text-center' style={{ fontSize: '1.5rem', marginTop: '2.5rem', marginBottom: '2rem' }}>Comidas</h2>

            <div className='foods-page-content'>
                {
                    categories.map( category => {
                        return <div key={ category } className='foods-group'><FoodsGroup title={ category } /></div>
                    })
                }
            </div>

            <div className='foods-checkout-button' style={{ margin: '1rem 0' }}>
                <Button variant='outline-warning' className='fw-bold rounded-pill py-3' style={{ width: '140px', backgroundColor: 'black' }} onClick={ nextPageDrinks }>
                    Menú bebidas
                </Button>
                <Button variant='warning' className='fw-bold rounded-pill py-3' style={{ width: '140px' }} onClick={ nextPageCart }>
                    Hacer pedido
                </Button>
            </div>

        </main>

    )

}

export default Foods