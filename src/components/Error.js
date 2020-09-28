
import React from "react";
import { NavLink} from 'react-router-dom';
import "./expenseAdd.css"
import "./Header.css"
import "./expenseFilter.css"

const Error = () =>(
    <div>
        <p>404</p>
        <NavLink to="/">Home Page</NavLink>

    </div>
);
export default Error;