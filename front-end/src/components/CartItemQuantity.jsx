import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


const CartItemQuantity = ( props ) => {

    let resQuantity = () => {
        
        if ( props.quantityItem > 0 ) {
            props.setQuantityItem( props.quantityItem - 1 );

            let finalNewCart = props.finalCart.map( item => {
                if ( item.id === props.id ) {
                    return (
                        {
                            id: item.id,
                            quantity: props.quantityItem - 1
                        }
                    )
                } else {
                    return (
                        {
                            id: item.id,
                            quantity: item.quantity
                        }
                    )
                }
            })
    
            if ( props.groupItems === 'foods' ) {
                localStorage.setItem( 'cartFoods', JSON.stringify( finalNewCart ) );
            } else {
                localStorage.setItem( 'cartDrinks', JSON.stringify( finalNewCart ) );
            }

            let newFinalCartState = props.finalCart.map( item => {
                if ( item.id === props.id ) {
                    return (
                        {
                            ...item,
                            quantity: props.quantityItem - 1
                        }
                    )
                } else {
                    return item;
                }
            })

            props.setFinalCart( newFinalCartState );
        }

    }

    let sumQuantity = () => {

        props.setQuantityItem( props.quantityItem + 1 );

        let finalNewCart = props.finalCart.map( item => {
            if ( item.id === props.id ) {
                return (
                    {
                        id: item.id,
                        quantity: props.quantityItem + 1
                    }
                )
            } else {
                return (
                    {
                        id: item.id,
                        quantity: item.quantity
                    }
                )
            }
        })

        if ( props.groupItems === 'foods' ) {
            localStorage.setItem( 'cartFoods', JSON.stringify( finalNewCart ) );
        } else {
            localStorage.setItem( 'cartDrinks', JSON.stringify( finalNewCart ) );
        }

        let newFinalCartState = props.finalCart.map( item => {
            if ( item.id === props.id ) {
                return (
                    {
                        ...item,
                        quantity: props.quantityItem + 1
                    }
                )
            } else {
                return item;
            }
        })

        props.setFinalCart( newFinalCartState );

    }

    return (

        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >

            <Modal.Header style={{ backgroundColor: '#232323', border: 'none' }} closeButton closeVariant='white'></Modal.Header>

            <Modal.Body className='pt-0' style={{ backgroundColor: '#232323' }}>
                <p className='fs-4 fw-semibold text-center mb-2'>{ props.title }</p>
                <p className='text-center w-75 mx-auto mb-0' style={{ textTransform: 'capitalize' }}>{ props.category }</p>
            </Modal.Body>

            <Modal.Footer className='pb-3' style={{ backgroundColor: '#232323', border: 'none' }}>
                <Button variant='primary' 
                        className='rounded-pill py-3 mx-auto d-flex flex-nowrap justify-content-between align-items-center' 
                        style={{ width: '140px', backgroundColor: 'transparent', border: '1px solid #8F6F6F' }} 
                        >
                    <i className='fa-solid fa-minus rounded-circle' 
                        style={{ fontSize: '2rem', color: 'black', backgroundColor: '#474747', cursor: 'pointer', padding: '0.125rem 0.3125rem' }} 
                        onClick={ resQuantity } />
                    <p className='fw-semibold p-0 m-0' style={{ fontSize: '1.125rem' }}>{ props.quantityItem }</p>
                    <i className='fa-solid fa-plus rounded-circle' 
                        style={{ fontSize: '2rem', color: 'black', backgroundColor: '#FFC107', cursor: 'pointer', padding: '0.125rem 0.3125rem' }} 
                        onClick={ sumQuantity } />
                </Button>
            </Modal.Footer>

        </Modal>

    )
}

export default CartItemQuantity