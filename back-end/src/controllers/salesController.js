const fs = require('fs');
const path = require('path');

const salesFilePath = path.join(__dirname, '../data/sales.json');
let sales = JSON.parse( fs.readFileSync( salesFilePath, 'utf-8' ) );
sales = sales.sort( ( a, b ) => b.id - a.id );

/* Configuramos el controlador */
const salesController = {

    allSales: ( req, res ) => {

        let arrayClients = [];

        sales.forEach( sale => {
            if( !arrayClients.includes( sale.client ) ){
                arrayClients.push( sale.client );
            }
        })

        res.status(200).json({
            sales,
            numberClients: arrayClients.length,
            status: 200,
        });

    },
    
    salesDaily: ( req, res ) => {
    
        const date = new Date();
        const actualDate = date.getFullYear() + '-' + ( date.getMonth() + 1 ) + '-' + date.getDate();

        const dailySales = sales.filter( sale => {
            return sale.date === actualDate;
        })

        let totalAmountFoods = 0;
        let totalAmountDrinks = 0;

        dailySales.forEach( sale => {
            sale.foods.forEach( food => {
                totalAmountFoods += food.finalPrice
            })
            sale.drinks.forEach( drink => {
                totalAmountDrinks += drink.finalPrice
            })
        })

        const finalAmount = totalAmountFoods + totalAmountDrinks;
    
        res.status(200).json({
            sales: dailySales,
            finalAmount,
            arrayItemsDataChart: [ totalAmountFoods, totalAmountDrinks ],
            status: 200,
        });

    },

    salesWeekly: ( req, res ) => {

        let arrayDates = [];
        const date = new Date();
        const actualDate = date.getFullYear() + '-' + ( date.getMonth() + 1 ) + '-' + date.getDate();
        arrayDates.push( actualDate );
        
        for ( let i = 0; i < 6; i++ ) {
            date.setDate( date.getDate() - 1 );
            let currentDate = date.getFullYear() + '-' + ( date.getMonth() + 1 ) + '-' + date.getDate();
            arrayDates.push( currentDate );
        }

        /* let arrayDatesThisWeek = [];

        arrayDatesThisWeek.push( actualDate );

        for ( let i = 0; i < 6; i++ ) {
            date.setDate( date.getDate() - 1 );
            
            let [ year, month, day ] = [
                date.getFullYear(),
                date.getMonth(),
                date.getDate()
            ];
        
            let currentDate = year + '-' + ( month + 1 ) + '-' + day;

            arrayDatesThisWeek.push( currentDate );
        } */

        arrayDates = arrayDates.sort();

        let weeklySales = sales.filter( sale => {
            return arrayDates.includes( sale.date );
        })

        weeklySales = weeklySales.sort( ( a, b ) => b.id - a.id );

        let finalAmountsWeekly = {};

        arrayDates.map( date  => {
            finalAmountsWeekly[ date ] = 0;
        })

        weeklySales.map( sale  => {
            finalAmountsWeekly[ sale.date ] = finalAmountsWeekly[ sale.date ] + sale.finalAmount;
        })

        let arrayFinalAmountsWeekly =  Object.values( finalAmountsWeekly );

        let arrayNameDatesThisWeek = [];
        
        arrayDates.map( date => {

            let daysWeek = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

            let dateChanging = new Date( date );
            let nameDayWeek = dateChanging.getDay();
            
            arrayNameDatesThisWeek.push( daysWeek[ nameDayWeek ] );
        })

        /* VISTA - SALES WEEKLY */

        let totalAmountFoods = 0;
        let totalAmountDrinks = 0;

        weeklySales.forEach( sale => {
            sale.foods.forEach( food => {
                totalAmountFoods += food.finalPrice
            })
            sale.drinks.forEach( drink => {
                totalAmountDrinks += drink.finalPrice
            })
        })

        const finalAmount = totalAmountFoods + totalAmountDrinks;

        res.status(200).json({
            sales: weeklySales,
            finalAmount,
            arrayFinalAmountsWeekly,
            arrayNameDatesThisWeek,
            arrayItemsDataChart: [ totalAmountFoods, totalAmountDrinks ],
            status: 200,
        });

    },

    salesMonthly: ( req, res ) => {

        let actualDate = new Date();
        let actualMonth = actualDate.getMonth();
        actualDate = actualDate.getFullYear() + '-' + ( actualMonth + 1 );

        let monthlySales = sales.filter( sale => {

            let dateJSON = new Date( sale.date );
            dateJSON = dateJSON.getFullYear() + '-' + ( dateJSON.getMonth() + 1 );

            return dateJSON === actualDate;
        })

        monthlySales = monthlySales.sort( ( a, b ) => b.id - a.id );

        let totalAmountFoods = 0;
        let totalAmountDrinks = 0;

        monthlySales.forEach( sale => {
            sale.foods.forEach( food => {
                totalAmountFoods += food.finalPrice
            })
            sale.drinks.forEach( drink => {
                totalAmountDrinks += drink.finalPrice
            })
        })

        const finalAmount = totalAmountFoods + totalAmountDrinks;

        res.status(200).json({
            sales: monthlySales,
            finalAmount,
            arrayItemsDataChart: [ totalAmountFoods, totalAmountDrinks ],
            status: 200,
        });

    },

    salesAnnual: ( req, res ) => {

        const actualDate = new Date();
        const actualYear = actualDate.getFullYear();

        let annualSales = sales.filter( sale => {

            const dateJSON = new Date( sale.date );
            const yearJSON = dateJSON.getFullYear();

            return yearJSON === actualYear;
        })

        annualSales = annualSales.sort( ( a, b ) => b.id - a.id );

        let finalAmountsMonthly = {
            1: 0,
            2: 0,
            3: 0,
            4: 0,
            5: 0,
            6: 0,
            7: 0,
            8: 0,
            9: 0,
            10: 0,
            11: 0,
            12: 0
        }
    
        annualSales.map(( data ) => {
            const date = new Date( data.date );
            const month = date.getMonth() + 1;
            
            finalAmountsMonthly[ month ] = finalAmountsMonthly[ month ] + data.finalAmount
        })
    
        let arrayFinalAmountsMonthly =  Object.values( finalAmountsMonthly );

        /* VISTA - SALES ANNUAL */

        let totalAmountFoods = 0;
        let totalAmountDrinks = 0;

        annualSales.forEach( sale => {
            sale.foods.forEach( food => {
                totalAmountFoods += food.finalPrice
            })
            sale.drinks.forEach( drink => {
                totalAmountDrinks += drink.finalPrice
            })
        })

        const finalAmount = totalAmountFoods + totalAmountDrinks;

        res.status(200).json({
            sales: annualSales,
            finalAmount,
            arrayFinalAmountsMonthly,
            arrayItemsDataChart: [ totalAmountFoods, totalAmountDrinks ],
            status: 200,
        });

    },

    saleDetail: ( req, res ) => {

        const param = JSON.parse( req.params.id );

        const sale = sales.find( saleJSON => saleJSON.id === param );

        res.status(200).json({
            sale,
            status: 200,
        });
        
    },

    new: ( req, res ) => {

        const date = new Date();
        const actualDate = date.getFullYear() + '-' + ( date.getMonth() + 1 ) + '-' + date.getDate();
        const actualTime = date.getHours() + ':' + date.getMinutes();

        sales = sales.sort( ( a, b ) => a.id - b.id );

        let arrayFoods = JSON.parse( req.body.foods );

        let foodsForJSON = arrayFoods.map( ({ title, category, price, quantity }) => {
            return({
                title: title,
                category: category,
                price: price,
                quantity: quantity,
                finalPrice: price * quantity
            })
        })

        let arrayDrinks = JSON.parse( req.body.drinks );

        let drinksForJSON = arrayDrinks.map( ({ title, category, price, quantity }) => {
            return({
                title: title,
                category: category,
                price: price,
                quantity: quantity,
                finalPrice: price * quantity
            })
        })

        let sale = {
            id: sales[ sales.length - 1 ].id + 1,
            client: req.body.client,
            date: actualDate,
            time: actualTime,
            foods: foodsForJSON,
            drinks: drinksForJSON,
            finalAmount: JSON.parse( req.body.finalAmount )
        }

        let salesJSON;

        if ( sales === '' ) {
            salesJSON = [];
        } else {
            salesJSON = sales;
        }

        salesJSON.push( sale );

        let salesStringifyJSON = JSON.stringify( sales );

        fs.writeFileSync( salesFilePath, salesStringifyJSON );

    }

}

/* Exportamos el controlador */
module.exports = salesController;