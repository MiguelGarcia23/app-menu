import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


const CartItemDetail = ( props ) => {

    let deleteProduct = () => {

        let newCart = props.finalCart.filter( item => {
            return item.id !== props.id;
        })

        let finalNewCart = newCart.map( item => {
            return (
                {
                    id: item.id,
                    quantity: item.quantity
                }
            )
        }) 

        props.setFinalCart( newCart );

        if ( props.groupItems === 'foods' ) {
            localStorage.setItem( 'cartFoods', JSON.stringify( finalNewCart ) );
        } else {
            localStorage.setItem( 'cartDrinks', JSON.stringify( finalNewCart ) );
        }

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
                <p className='fs-4 fw-semibold text-center mb-2'>Eliminar producto</p>
                <p className='text-center w-75 mx-auto mb-0'>¿Estás seguro de que quieres remover este producto de tu pedido?</p>
            </Modal.Body>

            <Modal.Footer className='pb-3' style={{ backgroundColor: '#232323', border: 'none' }}>
                <Button variant='danger' className='fw-bold rounded-pill py-3 mx-auto' style={{ width: '170px' }} onClick={ deleteProduct }>
                    Eliminar producto
                </Button>
            </Modal.Footer>

        </Modal>

    )
}

export default CartItemDetail;