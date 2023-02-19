import { useEffect, useState } from 'react';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import DrinkDetail from './DrinkDetail';

const DrinkItem = ({ id, title, price, description, image }) => {

    const [ quantity, setQuantity ] = useState( 0 );

    const [ modalShow, setModalShow ] = useState( false );

    useEffect(() => {
        let arrayCart = localStorage.getItem('cartDrinks');
    
        arrayCart = arrayCart ? JSON.parse( arrayCart ) : [];
    
        let itemSelected = arrayCart ? arrayCart.find( itemArray => itemArray.id === id ) : null;
    
        itemSelected = itemSelected ? setQuantity( itemSelected.quantity ) : 0;
    }, []);

    let resQuantity = () => {

        if ( quantity > 0 ) {
            setQuantity( quantity - 1 );
    
            let item = {
                id: id,
                quantity: quantity - 1
            }
    
            let arrayExisting = localStorage.getItem('cartDrinks');
            
            arrayExisting = arrayExisting ? JSON.parse( arrayExisting ) : [];
    
            if( arrayExisting.find( itemArray => itemArray.id === item.id ) ) {
                arrayExisting.map( itemArray => {
                    if ( itemArray.id === item.id ) {
                        return itemArray.quantity -= 1;
                    }
                    return itemArray.quantity;
                })
            } else {
                arrayExisting.push( item );
            }
    
            localStorage.setItem( 'cartDrinks', JSON.stringify( arrayExisting ) );
        }


    }

    let sumQuantity = () => {

        setQuantity( quantity + 1 );
        
        let item = {
            id: id,
            quantity: quantity + 1
        }

        let arrayExisting = localStorage.getItem('cartDrinks');
        
        arrayExisting = arrayExisting ? JSON.parse( arrayExisting ) : [];

        if( arrayExisting.find( itemArray => itemArray.id === item.id ) ) {
            arrayExisting.map( itemArray => {
                if ( itemArray.id === item.id ) {
                    return itemArray.quantity += 1;
                }
                return itemArray.quantity;
            })
        } else {
            arrayExisting.push( item );
        }

        localStorage.setItem( 'cartDrinks', JSON.stringify( arrayExisting ) );

    }

    return (

        <>

            <Card style={{ width: '16.75rem', height: '100%', backgroundColor: '#1B1B1B', display: 'inline-block', marginRight: '0.625rem' }}>
                <Card.Img variant="top" src={ require(`../../assets/${ image }`) } alt={`Imagen de ${ title }`} style={{ height: '175px' }} />
                <Card.Body className='d-flex flex-column justify-content-between align-items-start' style={{ padding: '0.625rem', height: '223px' }}>
                    <div>
                        <Card.Title className='fw-semibold text-start text-wrap' style={{ fontSize: '1.125rem' }}>{ title }</Card.Title>
                        <Card.Text className='fw-normal text-start lh-1 text-wrap' style={{ marginBottom: '0.75rem' }}>{ description }</Card.Text>
                        <Card.Text className='fw-semibold text-start text-warning' style={{ fontSize: '1.125rem' }}>${ price }</Card.Text>
                    </div>
                        <Button variant='primary' 
                            className='rounded-pill py-2 mx-auto d-flex flex-nowrap justify-content-between align-items-center' 
                            style={{ width: '140px', backgroundColor: 'transparent', border: '1px solid #8F6F6F' }} 
                            >
                        <i className='fa-solid fa-minus rounded-circle' 
                            style={{ fontSize: '2rem', color: 'black', backgroundColor: '#474747', cursor: 'pointer', padding: '0.125rem 0.3125rem' }} 
                            onClick={ resQuantity } />
                        <p className='fw-semibold p-0 m-0' style={{ fontSize: '1.125rem' }}>{ quantity }</p>
                        <i className='fa-solid fa-plus rounded-circle' 
                            style={{ fontSize: '2rem', color: 'black', backgroundColor: '#FFC107', cursor: 'pointer', padding: '0.125rem 0.3125rem' }} 
                            onClick={ sumQuantity } />
                    </Button>
                </Card.Body>
            </Card>

        </>

    )

}

export default DrinkItem;