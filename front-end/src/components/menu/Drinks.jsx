import { useNavigate } from 'react-router-dom';

import Button from 'react-bootstrap/Button';

import DrinksGroup from './DrinksGroup';

let categories = require('../../data/categoriesDrinks.json');


const Drinks = () => {

    const navigate = useNavigate();

    const nextPageFoods = () => {
        navigate("/foods");
    };

    const nextPageCart = () => {
        navigate("/cart");
    };

    return (

        <main className='drinks-page pb-5' bg='success'>
            
            <h2 className='fw-semibold text-center' style={{ fontSize: '1.5rem', marginTop: '2.5rem', marginBottom: '2rem' }}>Bebidas</h2>

            <div className='drinks-page-content'>
                {
                    categories.map( categoria => {
                        return <div className='drinks-group' key={ categoria }><DrinksGroup title={ categoria } /></div>
                    })
                }
            </div>

            <div className='drinks-checkout-button' style={{ margin: '1rem 0' }}>
                <Button variant='outline-warning' className='fw-bold rounded-pill py-3' style={{ width: '140px', backgroundColor: 'black' }} onClick={ nextPageFoods }>
                    Menú comidas
                </Button>
                <Button variant='warning' className='fw-bold rounded-pill py-3' style={{ width: '140px' }} onClick={ nextPageCart }>
                    Hacer pedido
                </Button>
            </div>

        </main>

    )

}

export default Drinks;