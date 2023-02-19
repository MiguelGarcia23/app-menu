import { Routes, Route } from 'react-router-dom';

import Home from './Home';
import Categories from './Categories';
import Cart from './Cart';
import Foods from './menu/Foods';
import Drinks from './menu/Drinks';
import Login from './dashboard/Login';
import HomeDash from './dashboard/HomeDash';
import FoodsDash from './dashboard/FoodsDash';
import FoodDetailDash from './dashboard/FoodDetailDash';
import CreateFoodDash from './dashboard/CreateFoodDash';
import EditFoodDash from './dashboard/EditFoodDash';
import DrinksDash from './dashboard/DrinksDash';
import DrinkDetailDash from './dashboard/DrinkDetailDash';
import CreateDrinkDash from './dashboard/CreateDrinkDash';
import EditDrinkDash from './dashboard/EditDrinkDash';
import Sales from './dashboard/Sales';
import DailySales from './dashboard/DailySales';
import WeeklySales from './dashboard/WeeklySales';
import MonthlySales from './dashboard/MonthlySales';
import AnnualSales from './dashboard/AnnualSales';
import SaleDetail from './dashboard/SaleDetail';

import '../styles/App.css';

function App() {
  return (
    <div className="App">

      <Routes>

        <Route path='/' element={ <Home/> } />
        <Route path='/categories' element={ <Categories /> } />
        <Route path='/foods' element={ <Foods /> } />
        <Route path='/drinks' element={ <Drinks /> } />
        <Route path='/cart' element={ <Cart /> } />
        <Route path='/login' element={ <Login/> } />
        <Route path='/dashboard' element={ <HomeDash/> } />
        <Route path='/dashboard/foods' element={ <FoodsDash /> } />
        <Route path='/dashboard/foods/:id' element={ <FoodDetailDash /> } />
        <Route path='/dashboard/foods/create' element={ <CreateFoodDash /> } />
        <Route path='/dashboard/foods/edit/:id' element={ <EditFoodDash /> } />
        <Route path='/dashboard/drinks' element={ <DrinksDash /> } />
        <Route path='/dashboard/drinks/:id' element={ <DrinkDetailDash /> } />
        <Route path='/dashboard/drinks/create' element={ <CreateDrinkDash /> } />
        <Route path='/dashboard/drinks/edit/:id' element={ <EditDrinkDash /> } />
        <Route path='/dashboard/sales' element={ <Sales /> } />
        <Route path='/dashboard/sales/daily' element={ <DailySales /> } />
        <Route path='/dashboard/sales/weekly' element={ <WeeklySales /> } />
        <Route path='/dashboard/sales/monthly' element={ <MonthlySales /> } />
        <Route path='/dashboard/sales/annual' element={ <AnnualSales /> } />
        <Route path='/dashboard/sales/:id' element={ <SaleDetail /> } />

      </Routes>

    </div>
  );
}

export default App;

