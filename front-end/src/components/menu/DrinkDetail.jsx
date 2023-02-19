import Modal from 'react-bootstrap/Modal';


const DrinkDetail = ( props ) => {

    return (

        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header style={{ backgroundColor: '#FFC107' }} closeButton>
                <Modal.Title id="contained-modal-title-vcenter" style={{ color: 'black' }}>
                    { props.title }
                </Modal.Title>
            </Modal.Header>

            <Modal.Body style={{ backgroundColor: 'black' }}>
                <img src={ require(`../../assets/${ props.image }`) } alt={`Imagen de ${props.title}`} className='modal-img' />
                <p className='modal-description-drink'><strong>Descripción: </strong>{ props.description }</p>
            </Modal.Body>

            <Modal.Footer style={{ backgroundColor: 'black' }}>
                <div className='modal-price-box'>
                    <p className='modal-price'>Precio: ${ props.price }</p>
                    <div className='modal-drink-amount'>
                        <i className="fa-solid fa-minus" style={{ cursor: 'pointer' }} onClick={ props.resQuantity } />
                        <p className='modal-drink-amount-number'>{ props.quantity }</p>
                        <i className="fa-solid fa-plus" style={{ cursor: 'pointer' }} onClick={ props.sumQuantity } />
                    </div>
                </div>
            </Modal.Footer>
        </Modal>

    )
}

export default DrinkDetail;