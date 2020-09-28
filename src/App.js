import React,{useEffect} from 'react';
import {startLogin,startLogout} from "./store/Actions/loginAction"
// import ReactDOM from "react-dom";
import Routes,{history} from "./routers/Approuter"
import {Provider} from "react-redux";
import "normalize.css/normalize.css";
import "./styles/styles.scss";
import storeConfig from "./store/store_config";

import './App.css';

function App() {
  const store=storeConfig();

  useEffect(() => {
  const apiKey = localStorage.getItem('api_key');
  const userType =  localStorage.getItem('user_type');
  if(apiKey){
    store.dispatch(startLogin(apiKey,userType));
    if(history.location.pathname==="/"){
      if(userType==="admin")
      {
        history.push("/admindashboard");
 
      }else{
        history.push("/admindashboard");

      }
        
    }
    
  }else{
      store.dispatch(startLogout());
    }

});

  



  return (
    <div className="App">
      
      <Provider store={store}>
          <Routes />
      </Provider>


      
    </div>
  );
}

/*import "./styles/styles.scss";
import firebase,{googleAuthProvider} from "./firebase/firebas"

import "./firebase/firebas";
import Loading from "./components/Loading"


ReactDOM.render(jsx,document.getElementById("app"));
*/


export default App;
