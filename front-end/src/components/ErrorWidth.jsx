import Button from 'react-bootstrap/Button';

const ErrorWidth = () => {

    const backPage = () => {
        window.history.back(); 
    };

    return (

        <main className='d-flex flex-column justify-content-center align-items-center px-3' style={{ width: '100vw', height: '100vh' }}>

            <i className='text-light text-center fa-solid fa-mobile-screen-button mb-3' style={{ fontSize: '5rem' }} />

            <h1 className='text-light text-center fs-3 mb-4'>
                El sitio web ha sido desarrollado para funcionar únicamente en dispositivos móviles
            </h1>

            <Button variant='warning' className='fw-bold rounded-pill py-3' onClick={ backPage }>
                Volver a la página anterior
            </Button>

        </main>

    )
}

export default ErrorWidth;