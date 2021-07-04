import logo from './logo.svg';
import './App.css';
import Homepage from './pages/homepage/homepage.component';
import {Switch,Route} from 'react-router-dom'
import ShopPage from './pages/shoppage/shoppage.component';
import Header from './component/header/header.component';
import SignInAndSignUp from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import { auth,createUserProfileDoc } from './firebase/firebase.utils';
import React from 'react';
import { render } from '@testing-library/react';

const HatsPage = () => (
  <div>
    <h1>HATS PAGE</h1>
  </div>
);

class App extends React.Component
{
  constructor()
  {
    super();
    this.state={
      currentUser:null
    }
  }

  unsubscribeFromAuth = null;

  componentDidMount()
  {
    this.unsubscribeFromAuth=  auth.onAuthStateChanged(async userAuth => {
      if(userAuth)
      {
        const userRef = await createUserProfileDoc(userAuth);
        userRef.onSnapshot(snapshot=>{
          this.setState({
            currentUser :{
              id : snapshot.id,
              ...snapshot.data()
            }
          }, ()=>{console.log(snapshot.data())});
        })
      }
      else{
        this.setState({currentUser:userAuth})
      }

      })

  }

  componentWillUnmount()
  {
    this.unsubscribeFromAuth();
  }

  render()
  {
    return (
      <div>
        <Header currentUser={this.state.currentUser}/>
      <Switch>
        <Route exact path='/' component={Homepage}/>
        <Route  path='/shop' component={ShopPage}/>
        <Route path='/signin' component={SignInAndSignUp}/>
      </Switch>
      </div>
    );
  }
  
}

export default App;
