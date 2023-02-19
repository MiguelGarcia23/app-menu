import { useNavigate } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';


const CardHomeDash = ({ icon, title, quantity, link }) => {

    const navigate = useNavigate();

    const actionButton = () => {
        navigate(`/dashboard${ link }`);
    };

    return (

        <Card className='py-4 px-4 bg-transparent border border-warning border-3 mx-auto mb-4' style={{ width: '400px', height:'280px' }}>
            <Card.Body className='d-flex flex-nowrap justify-content-between align-items-center p-0'>
                <i className={`${ icon } text-end me-3`} style={{ fontSize: '8rem', color: '#AAAAAA' }} />
                <div className='h-100 d-flex flex-nowrap flex-column justify-content-between align-items-end'>
                    <Card.Title className='fs-3 text-end m-0'>{ title }</Card.Title>
                    <Card.Text className='fs-1 fw-bold text-warning mb-4'>{ quantity }</Card.Text>

                    { link && 
                        <Button variant='warning' className='fw-bold py-2' onClick={ actionButton }>
                            Ver más...
                        </Button>
                    }
                </div>
            </Card.Body>
        </Card>

    )
}

export default CardHomeDash;