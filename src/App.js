import logo from './logo.svg';
import './App.css';
import Homepage from './pages/homepage/homepage.component';
import {Switch,Route} from 'react-router-dom'
import ShopPage from './pages/shoppage/shoppage.component';
import Header from './component/header/header.component';

const HatsPage = () => (
  <div>
    <h1>HATS PAGE</h1>
  </div>
);

function App() {
  return (
    <div>
      <Header/>
    <Switch>
      <Route exact path='/' component={Homepage}/>
      <Route  path='/shop' component={ShopPage}/>
    </Switch>
    </div>
  );
}

export default App;
