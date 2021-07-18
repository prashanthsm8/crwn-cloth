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
import {connect} from 'react-redux';
import {setCurrentUser} from './redux/user/user.action'

const HatsPage = () => (
  <div>
    <h1>HATS PAGE</h1>
  </div>
);

class App extends React.Component
{
  unsubscribeFromAuth = null;
 

  componentDidMount()
  {
    const {setCurrentUser} = this.props;
    this.unsubscribeFromAuth=  auth.onAuthStateChanged(async userAuth => {
      if(userAuth)
      {
        //replace set state with action class
        const userRef = await createUserProfileDoc(userAuth);
        userRef.onSnapshot(snapshot=>{
          setCurrentUser({
            currentUser :{
              id : snapshot.id,
              ...snapshot.data()
            }
          }, ()=>{console.log(snapshot.data())});
        })
      }
      else{
        setCurrentUser(userAuth)
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
        <Header/>
      <Switch>
        <Route exact path='/' component={Homepage}/>
        <Route  path='/shop' component={ShopPage}/>
        <Route path='/signin' component={SignInAndSignUp}/>
      </Switch>
      </div>
    );
  }
  
}
//call dispatch to let action to very reducer dispacthing object.
const mapDispacthToProps= dispacth=>({
  setCurrentUser: user =>dispacth(setCurrentUser(user))
});
export default connect(null,mapDispacthToProps)(App);
