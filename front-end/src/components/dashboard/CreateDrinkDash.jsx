import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import NavBar from './NavBar';

import authenticatedRoute from '../../auth/AuthenticatedRoute';


const CreateDrinkDash = () => {

    let [ data, setData ] = useState({
        title: '',
        category: '',
        description: '',
        price: '',
        image: ''
    });

    let [ errorsState, setErrorsState ] = useState({
        title: false,
        category: false,
        description: false,
        price: false,
        image: false
    });

    let [ isErrorState, setIsErrorState ] = useState( false );

    const handleInput = ( event ) => {

        let isError = false;
        let errors = errorsState;
        let acceptedExtensionsImgs = [ 'image/jpeg', 'image/jpg', 'image/png' ];

        if ( event.target.name === 'title' && event.target.value.length < 2 ) {
            errors.title = 'El campo "Título" debe tener más de 2 caracteres';
            isError = true;
        }

        if ( event.target.name === 'description' && event.target.value.length < 5 ) {
            errors.description = 'El campo "Descripción" debe tener más de 5 caracteres';
            isError = true;
        }

        if ( event.target.name === 'image' && !acceptedExtensionsImgs.includes( event.target.files[0].type ) ) {
            errors.image = 'Las extensiones de archivo permitidas son .jpg, .jpeg y .png';
            isError = true;
        }

        if ( !isError ) {
            setData({
                ...data,
                [event.target.name] : ( event.target.name === 'image' ? event.target.files[0] : event.target.value ),
            })
            setIsErrorState( false );
            setErrorsState({
                ...errorsState,
                [event.target.name] : false
            })
        } else {
            setIsErrorState( true );
            setErrorsState( errors );
        }

    };

    const navigate = useNavigate();

    const handleSubmit = ( event ) => {
        event.preventDefault();
        
        let isError = false;

        if ( isErrorState === true ) {
            isError = true;
        }

        let errors = {};

        if ( !data.title.trim() ) {
            errors.title = 'El campo "Título" no debe estar vacío';
            isError = true;
        }

        if ( !data.category.trim() ) {
            errors.category = 'Debe seleccionar una "Categoría"';
            isError = true;
        }

        if ( !data.description.trim() ) {
            errors.description = 'El campo "Descripción" no debe estar vacío';
            isError = true;
        }

        if ( !data.price ) {
            errors.price = 'El campo "Precio" no debe estar vacío';
            isError = true;
        }

        if ( !data.image ) {
            errors.image = 'Debe subir una imagen en el campo "Imagen"';
            isError = true;
        }

        if ( !isError ) {

            const formData = new FormData();
            formData.append('title', data.title);
            formData.append('category', data.category);
            formData.append('description', data.description);
            formData.append('price', data.price.toString());
            formData.append('image', data.image);
            
            fetch('http://localhost:3030/drinks/create', {
                method: "POST",
                body: formData,
            })
                .then(response => {
                    return response.json()
                });
            
            event.target.reset();
            navigate('/dashboard/drinks');
        } else {
            setIsErrorState( true );
            setErrorsState( errors );

            setData({
                ...data
            })
        }

    }

    return (

        <>
        
            <NavBar />

            <div className='p-5'>

                <h1 className='d-block w-100 mb-5 pb-3 border-bottom border-3 border-warning'>Creando una nueva bebida</h1>

                <Form encType='multipart/form-data' onSubmit={ handleSubmit }>

                    <Form.Group className="col-md-8 mx-auto mb-3">
                        <Form.Label htmlFor='title' className='d-block text-start fw-bold' style={{ fontSize: '1.25rem' }}>Título:</Form.Label>
                        <Form.Control type="text" id="title" name='title' placeholder="Ej: Red Bull" className='bg-transparent border-warning text-light' onChange={ handleInput } onBlur={ handleInput } />
                        {
                            errorsState.title &&
                            <span className='text-danger'>{ errorsState.title }</span>
                        }
                    </Form.Group>

                    <Form.Group className="col-md-8 mx-auto mb-3">
                        <Form.Label htmlFor='category' className='d-block text-start fw-bold' style={{ fontSize: '1.25rem' }}>Categoría:</Form.Label>
                        <Form.Select id="category" name='category' className='border-warning text-dark text-capitalize' onChange={ handleInput } onBlur={ handleInput }>
                            <option value="cocteles">Cocteles</option>
                            <option value="cervezas">Cervezas</option>
                            <option value="vinos & espumantes">Vinos & Espumantes</option>
                            <option value="otras bebidas">Otras Bebidas</option>
                        </Form.Select>
                        {
                            errorsState.category &&
                            <span className='text-danger'>{ errorsState.category }</span>
                        }
                    </Form.Group>

                    <Form.Group className="col-md-8 mx-auto mb-3">
                        <Form.Label htmlFor='description' className='d-block text-start fw-bold' style={{ fontSize: '1.25rem' }}>Descripción:</Form.Label>
                        <Form.Control type="text" id="description" name='description' placeholder="Ej: Una lata" className='bg-transparent border-warning text-light' onChange={ handleInput } onBlur={ handleInput } />
                        {
                            errorsState.description &&
                            <span className='text-danger'>{ errorsState.description }</span>
                        }
                    </Form.Group>

                    <Form.Group className="col-md-8 mx-auto mb-3">
                        <Form.Label htmlFor='price' className='d-block text-start fw-bold' style={{ fontSize: '1.25rem' }}>Precio:</Form.Label>
                        <Form.Control type="number" id="price" name='price' placeholder="Ej: 2000" className='bg-transparent border-warning text-light' onChange={ handleInput } onBlur={ handleInput } />
                        {
                            errorsState.price &&
                            <span className='text-danger'>{ errorsState.price }</span>
                        }
                    </Form.Group>

                    <Form.Group className="col-md-8 mx-auto mb-3">
                        <Form.Label htmlFor='image' className='d-block text-start fw-bold' style={{ fontSize: '1.25rem' }}>Imagen:</Form.Label>
                        <Form.Control type="file" id="image" name='image' className='bg-transparent border-warning text-light' onChange={ handleInput } onBlur={ handleInput } />
                        {
                            errorsState.image &&
                            <span className='text-danger'>{ errorsState.image }</span>
                        }
                    </Form.Group>

                    <Button type='submit' variant='warning' className='fw-bold py-2 mt-4'>Crear bebida</Button>

                </Form>

            </div>

        
        </>

    )
}

export default authenticatedRoute( CreateDrinkDash );