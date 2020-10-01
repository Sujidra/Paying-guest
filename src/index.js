
import React from "react";
import ReactDOM from "react-dom";
import Routes,{history} from "./routers/Approuter"
import {Provider} from "react-redux";
import "normalize.css/normalize.css";
import "./styles/styles.scss";
import storeConfig from "./store/store_config";
import "./firebase/firebas";
import * as serviceWorker from './serviceWorker';

const store=storeConfig();

store.subscribe(()=>{
    let storeobj=store.getState();
    
})

 


const jsx=(
  <React.StrictMode>
    <Provider store={store}>
        <Routes />
    </Provider>
  
  </React.StrictMode>
    
)

ReactDOM.render(jsx,document.getElementById("root"))

serviceWorker.unregister();
