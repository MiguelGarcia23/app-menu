import { useEffect, useState } from 'react';

/* import { useNavigate } from 'react-router-dom'; */

import Button from 'react-bootstrap/Button';

import CartItem from './CartItem';

let dataFoods = require('../data/menuFoods.json');
let dataDrinks = require('../data/menuDrinks.json');


const Cart = () => {

    let [ name, setName ] = useState( false );
    let [ table, setTable ] = useState( false ); 
    let [ finalFoodsCart, setFinalFoodsCart ] = useState( [] );  
    let [ finalDrinksCart, setFinalDrinksCart ] = useState( [] );  
    let [ finalPrice, setFinalPrice ] = useState( 0 );  

    useEffect(() => { // useEffect para atualizar el precio final del pedido cada vez que se modifica el carrito de compras (foods o drinks)

        let cliente = localStorage.getItem('cliente');

        cliente = JSON.parse( cliente );
        
        setName( cliente.nombre );
        setTable( cliente.mesa );

        let cartFoods = JSON.parse( localStorage.getItem('cartFoods') );
        let priceFoods = 0;

        if ( cartFoods === null ) {
            cartFoods = [];
        } else {
            let lastFoodsCart = [];
    
            dataFoods.forEach( foodMenu => {
                cartFoods.forEach( foodSession => {
                    
                    if( foodMenu.id === foodSession.id ) {
                        lastFoodsCart.push({
                            ...foodMenu,
                            quantity: foodSession.quantity
                        })
                    }
                })
            })
    
            setFinalFoodsCart( lastFoodsCart );

            priceFoods = lastFoodsCart.reduce( ( acum, food ) => {
                return acum + ( food.price * food.quantity );
            }, 0);
        }

        let cartDrinks = JSON.parse( localStorage.getItem('cartDrinks') );
        let priceDrinks = 0;

        if ( cartDrinks === null ) {
            cartDrinks = [];
        } else {
            let lastDrinksCart = [];
    
            dataDrinks.forEach( drinkMenu => {
                cartDrinks.forEach( drinkSession => {
                    
                    if( drinkMenu.id === drinkSession.id ) {
                        lastDrinksCart.push({
                            ...drinkMenu,
                            quantity: drinkSession.quantity
                        })
                    }
                })
            })
    
            setFinalDrinksCart( lastDrinksCart );

            priceDrinks = lastDrinksCart.reduce( ( acum, drink ) => {
                return acum + ( drink.price * drink.quantity );
            }, 0);
        }

        setFinalPrice( priceFoods + priceDrinks );
      
    }, []);

    useEffect(() => { // Actualiza el precio total del carrito

        let priceFoods = 0;

        priceFoods = finalFoodsCart.reduce( ( acum, food ) => {
            return acum + ( food.price * food.quantity );
        }, 0);

        let priceDrinks = 0;

        priceDrinks = finalDrinksCart.reduce( ( acum, drink ) => {
            return acum + ( drink.price * drink.quantity );
        }, 0);

        setFinalPrice( priceFoods + priceDrinks );
        
    }, [ finalFoodsCart ]);

    useEffect(() => { // Actualiza el precio total del carrito 

        let priceFoods = 0;

        priceFoods = finalFoodsCart.reduce( ( acum, food ) => {
            return acum + ( food.price * food.quantity );
        }, 0);

        let priceDrinks = 0;

        priceDrinks = finalDrinksCart.reduce( ( acum, drink ) => {
            return acum + ( drink.price * drink.quantity );
        }, 0);

        setFinalPrice( priceFoods + priceDrinks );
        
    }, [ finalDrinksCart ]);
    

    /* const navigate = useNavigate(); */

    let sendOrder = () => {

        let finalAmount = finalPrice + ( finalPrice * 0.21 );

        const formData = new FormData();
        formData.append('client', name);
        formData.append('foods', JSON.stringify( finalFoodsCart ));
        formData.append('drinks', JSON.stringify( finalDrinksCart ));
        formData.append('finalAmount', finalAmount.toString());
        
        fetch('http://localhost:3030/sales/new', {
            method: "POST",
            body: formData,
        })
        .then(response => {
            return response.json()
        });

        let foodsWhatsApp = [];

        finalFoodsCart.map( ({ title, price, quantity }) => {
            foodsWhatsApp.push( `-%20(${ quantity })%20${ title }%20-%20*$${ price }*` )
        });

        let drinksWhatsApp = [];

        finalDrinksCart.map( ({ title, price, quantity }) => {
            drinksWhatsApp.push( `-%20(${ quantity })%20${ title }%20-%20*$${ price }*` )
        });

        let diaActual = new Date();
        let dia = diaActual.getDate();
        let mes = diaActual.getMonth()+1;
        let anio = diaActual.getFullYear();

        let fecha  = dia + '/' + mes + '/' + anio;

        let message = `*Bienvenidos%20al%20Restaurante*%0A%0A📄%20Nombre:%20${ name }%0A🪑%20Mesa:%20${ table }%0A📅%20Fecha:%20${ fecha }%0A%0A🍔%20Comidas:%0A${ foodsWhatsApp.join('%0A') }%0A%0A🍸%20Bebidas:%0A${ drinksWhatsApp.join('%0A') }%0A%0A%0A💰%20*Monto%20total:%20$${ finalPrice + ( finalPrice * 0.21 ) }*`;

        let url = `https://api.whatsapp.com/send?phone=584166097414&text=${ message }`;

        /* navigate( url, { replace: true } ) */
        window.location.replace( url );

        localStorage.removeItem( 'cliente' );
        localStorage.removeItem( 'cartFoods' );
        localStorage.removeItem( 'cartDrinks' );
    }

    return (

        <main className='py-5 px-3'>
            <h1 className='text-white fs-1' style={{ marginBottom: '2.5rem' }}>Mi pedido</h1>

            <div className='d-flex flex-nowrap align-items-center mb-3'>
                <i className="fa-solid fa-burger text-warning fs-3 me-2"></i>
                <p className='text-white text-start p-0 m-0'>Comidas: { finalFoodsCart.length }</p>
            </div>

            <ul className='text-start p-0 mb-4' style={{ listStyle: 'none' }}>
                { finalFoodsCart.map( ({ id, title, category, price, image, quantity }) => {
                    return <CartItem 
                                key={ id } 
                                id={ id }
                                title={ title } 
                                category={ category } 
                                price={ price } 
                                image={ image } 
                                quantity={ quantity }
                                finalCart={ finalFoodsCart }
                                setFinalCart={ setFinalFoodsCart }
                                setFinalPrice={ setFinalPrice } 
                                groupItems='foods'
                            />
                })}
            </ul>

            <div className='d-flex flex-nowrap align-items-center mb-3'>
                <i className="fa-solid fa-wine-glass text-warning fs-3 me-2"></i>
                <p className='text-white text-start p-0 m-0'>Bebidas: { finalDrinksCart.length }</p>
            </div>

            <ul className='text-start p-0 mb-4' style={{ listStyle: 'none' }}>
                { finalDrinksCart.map( ({ id, title, category, price, image, quantity }) => {
                    return <CartItem 
                                key={ id } 
                                id={ id } 
                                title={ title } 
                                category={ category } 
                                price={ price } 
                                image={ image } 
                                quantity={ quantity }
                                finalCart={ finalDrinksCart }
                                setFinalCart={ setFinalDrinksCart }  
                                setFinalPrice={ setFinalPrice } 
                                groupItems='drinks'
                            />
                })}
            </ul>

            <div className='mt-5 mx-3 mb-4'>

                <div className='d-flex justify-content-between mb-2'>
                    <p className='fw-semibold m-0'>Subtotal</p>
                    <p className='fw-bolder m-0'>${ finalPrice }</p>
                </div>
                <div className='d-flex justify-content-between mb-2'>
                    <p className='fw-semibold m-0'>IVA</p>
                    <p className='fw-bolder m-0'>${ finalPrice * 0.21 }</p>
                </div>
                <div className='d-flex justify-content-between pt-1 border-top border-white'>
                    <p className='fw-semibold' style={{ fontSize: '1.125rem' }}>Total</p>
                    <p className='fw-bolder text-warning' style={{ fontSize: '1.125rem' }}>${ finalPrice + ( finalPrice * 0.21 ) }</p>
                </div>

            </div>

            <Button variant='warning' className='fw-bold rounded-pill py-3' style={{ width: '160px' }} onClick={ sendOrder }>
                Hacer pedido
            </Button>

        </main>

    )
}

export default Cart;