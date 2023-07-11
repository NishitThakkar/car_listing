import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import List_car from './components/car/List_car';
import View_car from './components/car/View_car';
import Sell_car from './components/car/Sell_car';
import My_car from './components/car/My_car';
import Login from './components/user/Login';
import Signup from './components/user/Signup';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  return (
    <div className="App">

      <ToastContainer />

      <Router>
        <Routes>

          <Route exact path="/Sell_car" Component={Sell_car} />
          <Route exact path="/Sell_car/:id" Component={Sell_car} />

          <Route exact path="/" Component={List_car} />

          <Route exact path="/View_car" Component={View_car} />
          <Route exact path="/View_car/:id" Component={View_car} />

          <Route exact path="/Login" Component={Login} />
          <Route exact path="/Signup" Component={Signup} />

          <Route exact path="/My_car" Component={My_car} />


        </Routes>
      </Router>
    </div>
  );
}

export default App;
