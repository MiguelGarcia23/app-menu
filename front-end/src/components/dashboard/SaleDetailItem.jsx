

const SaleDetailItem = ({ title, category, price, quantity, finalPrice }) => {

    return (

        <div className='d-flex justify-content-between mb-2 rounded p-3' style={{ height: '6.625rem', backgroundColor: '#232323' }}>

            <div className='d-flex flex-column justify-content-between align-items-start'>
                <div>
                    <h3 className='text-white m-0' style={{ fontSize: '1.125rem' }}>{ title }</h3>
                    <p className='m-0' style={{ fontSize: '0.75rem', paddingLeft: '0.375rem' }}>{ category }</p>
                </div>
                <div>
                    <p className='fst-italic m-0'>Precio: ${ price }</p>
                </div>
            </div>

            <div className='d-flex flex-column justify-content-between align-items-end mt-1'>
                <div>
                    <p className='text-white text-decoration-underline m-0' style={{ fontSize: '0.875rem' }}>
                        Cantidad: { quantity }
                    </p>
                </div>
                <div>
                    <p className='text-warning fw-bold m-0' style={{ fontSize: '1.125rem' }}>Total: ${ finalPrice }</p>
                </div>
            </div>

        </div>

    )
}

export default SaleDetailItem;