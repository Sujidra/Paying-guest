
import React from "react";
import ReactDOM from "react-dom";
import Routes,{history} from "./routers/Approuter"
import {Provider} from "react-redux";
import "normalize.css/normalize.css";
import "./styles/styles.scss";
import {addExpense,removeExpense,editExpense} from "./store/Actions/expenseAction";
import {setText,setStartDate,setEndDate,setSortBy} from "./store/Actions/filterActions"
import {startSetExpense} from "./store/Actions/expenseAction"
import firebase,{googleAuthProvider} from "./firebase/firebas"
import storeConfig from "./store/store_config";
import {getVisibleExpence} from "./store/selectors/visibleExpense"
import "./firebase/firebas";
import startLogin  from "./store/Actions/LoginAction"
import {Logout} from "./store/Actions/LogoutActions"
import Loading from "./components/Loading"
import * as serviceWorker from './serviceWorker';
import {successLogin, failedLogin} from "./store/Actions/LoginAction"
import {startSetAllRooms} from "./store/Actions/customerRoomsAction"

const store=storeConfig();

store.subscribe(()=>{
    let storeobj=store.getState();
    let visibility =getVisibleExpence(storeobj.expense,storeobj.filters)
    
})



let hasRendered =false;
const render = () =>{
    if(!hasRendered){
        ReactDOM.render(jsx,document.getElementById("root"));
        hasRendered=true;
    }
}

const jsx=(
  <React.StrictMode>
    <Provider store={store}>
        <Routes />
    </Provider>
  
  </React.StrictMode>
    
)
//ReactDOM.render(jsx,document.getElementById("root"));

ReactDOM.render(<Loading />,document.getElementById("root"))

let id=localStorage.getItem("id");

if(id){
    id=JSON.parse(id);
    if(localStorage.getItem("userType")==="owner")
    {
        store.dispatch(successLogin(id));
        store.dispatch(startSetExpense()).then(()=>{
            render()
        })
    }else{
        store.dispatch(successLogin(id));
        this.props.dispatch(startSetAllRooms()).then(()=>{
            render()
        })
        
    }
    
    
}else{
    store.dispatch(failedLogin(id))
    render();
}
serviceWorker.unregister();
