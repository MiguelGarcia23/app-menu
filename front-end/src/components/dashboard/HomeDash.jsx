import { useEffect, useState } from 'react';

import CardHomeDash from './CardHomeDash';
import ChartHomeDash from './BarChartDash';
import NavBar from './NavBar';

import authenticatedRoute from '../../auth/AuthenticatedRoute';


const HomeDash = () => {

    /* Esto es para guardar la fecha del pedido en el JSON */
    
    /* const si = new Date();
    const fechaJSON = si.getFullYear() + '-' + (si.getMonth() + 1) + '-' + si.getDate(); */


    /* Esto es para obtener el mes */

    /* const nuevaFechaJSON = fechaJSON.replaceAll('-', ', ');
    const dateJSON = new Date( nuevaFechaJSON );
    const mesJSON = dateJSON.getMonth() + 1; */

    /* const fecha = new Date();
    const mesActual = fecha.getMonth() + 1; */

    let [ numberFoods, setNumberFoods ] = useState( 0 );
    let [ numberDrinks, setNumberDrinks ] = useState( 0 );
    let [ numberClients, setNumberClients ] = useState( 0 );
    let [ numberDailySales, setNumberDailySales ] = useState( 0 );
    let [ totalAmountDailySales, setTotalAmountDailySales ] = useState( 0 );
    let [ chartDataWeekly, setChartDataWeekly ] = useState({});
    let [ chartDataMonthly, setChartDataMonthly ] = useState({});
    let [ isLoad, setLoad ] = useState( true );

    useEffect(() => {
        
        const getSales = async () => {

            await fetch('http://localhost:3030/foods')
                .then(( response ) => response.json())
                .then(( data ) => {
                    setNumberFoods( data.foods.length );
            })
                .catch((e) => console.log(e));

            await fetch('http://localhost:3030/drinks')
                .then(( response ) => response.json())
                .then(( data ) => {
                    setNumberDrinks( data.drinks.length );
            })
                .catch((e) => console.log(e));

            await fetch('http://localhost:3030/sales')
                .then(( response ) => response.json())
                .then(( data ) => {
                    setNumberClients( data.numberClients );
                })
                .catch((e) => console.log(e));

            await fetch('http://localhost:3030/sales/daily')
                .then(( response ) => response.json())
                .then(( data ) => {
                    setNumberDailySales( data.sales.length );
                    setTotalAmountDailySales( data.finalAmount );
                })
                .catch((e) => console.log(e));

            let arrayFinalAmountsWeekly = [];
            let arrayNameDatesThisWeek = [];

            await fetch('http://localhost:3030/sales/weekly')
                .then(( response ) => response.json())
                .then(( data ) => {
                    arrayFinalAmountsWeekly = data.arrayFinalAmountsWeekly;
                    arrayNameDatesThisWeek = data.arrayNameDatesThisWeek;
                })
                .catch((e) => console.log(e));

            setChartDataWeekly({
                labels: arrayNameDatesThisWeek, 
                datasets: [{
                    label: "Ganancias",
                    data: arrayFinalAmountsWeekly.map(( data ) => data),
                    backgroundColor: [
                        "#3e4144",
                        "#5e5e5e",
                        "#6f6f6f",
                        "#828282",
                        "#aaaaaa",
                        "#c6c6c6",
                        "#ffffff",
                    ],
                    borderColor: "black",
                    borderWidth: 2
                }]
            });

            let arrayFinalAmountsMonthly = [];

            await fetch('http://localhost:3030/sales/annual')
                .then(( response ) => response.json())
                .then(( data ) => {
                    arrayFinalAmountsMonthly = data.arrayFinalAmountsMonthly;
                })
                .catch((e) => console.log(e));

            setChartDataMonthly({
                labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'], 
                datasets: [{
                    label: "Ganancias",
                    data: arrayFinalAmountsMonthly.map(( data ) => data),
                    backgroundColor: [
                        "#666f88",
                        "#788199",
                        "#8990a2",
                        "#a3a8b7",
                        "#b5bac9",
                        "#c6c6c6",
                        "#aaaaaa",
                        "#828282",
                        "#6f6f6f",
                        "#5e5e5e",
                        "#45484a",
                        "#3e4144"
                    ],
                    borderColor: "black",
                    borderWidth: 2
                }]
            });

            setLoad( false );

        }
        
        getSales();

    }, []);

    return (

        <>
            <NavBar />
            
            <div className='py-5 px-4'>

                <h1>Dashboard Restaurante Saturno</h1>

                <div className='d-flex flex-wrap justify-content-between align-items-center mt-5 mb-4'>

                    <CardHomeDash 
                        icon = 'fa-solid fa-burger'
                        title = 'Comidas disponibles'
                        quantity = { numberFoods }
                        link = '/foods'
                    />

                    <CardHomeDash 
                        icon = 'fa-solid fa-wine-glass'
                        title = 'Bebidas disponibles'
                        quantity = { numberDrinks }
                        link = '/drinks'
                    />

                    <CardHomeDash 
                        icon = 'fa-solid fa-users'
                        title = 'Total de Clientes'
                        quantity = { numberClients }
                        link = '/sales'
                    />

                    <CardHomeDash 
                        icon = 'fa-solid fa-file-invoice-dollar'
                        title = 'Ventas del día'
                        quantity = { numberDailySales }
                        link = '/sales/daily'
                    />

                    <CardHomeDash 
                        icon = 'fa-solid fa-money-bill-trend-up'
                        title = 'Ganancias del día'
                        quantity = { `$${ totalAmountDailySales }` }
                        link = '/sales/daily'
                    />

                </div>

                <div>

                    {
                        !isLoad &&

                        <>
                            <ChartHomeDash chartData={ chartDataWeekly } title='Ganancias ventas de esta semana' />
        
                            <ChartHomeDash chartData={ chartDataMonthly } title='Ganancias ventas en el año' />
                        </>
                    }

                </div>

            </div>
        </>

    )
}

export default authenticatedRoute( HomeDash );