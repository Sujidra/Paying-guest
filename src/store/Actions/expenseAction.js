import { v4 as uuid} from "uuid";
import firebase from  "../../firebase/firebas"

export const addExpense =({id,name,amt,address,mindays,maxdays,images,tags,bookstartDate,bookendDate}={})=>{
    return{
        type:"ADD_EXPENSE",
        id,
        name,
        amt,
        address,
        mindays,
        maxdays,
        images,
        tags,
        bookendDate,
        bookstartDate
    }
}
export const startaddexpense=({name,amt,address,mindays,maxdays,images,tags,bookstartDate,bookendDate}={})=>{
    const rooms={
        name,
        amt,
        address,
        mindays,
        maxdays,
        images,
        tags,
        bookendDate,
        bookstartDate
    }
    return(dispatch,getState)=>{
        const uid=getState().auth.authid
        return firebase.database().ref(`users/${uid}/rooms`).push(rooms).then((ref)=>{
            dispatch(addExpense({
                id:ref.key,
                ...rooms}))
        })
    }
}
export const setExpense=(expense)=>{
return{
        type:"SET_EXPENSE",
        expense
    }
}

export const startSetExpense=()=>{
    const rooms=[]
    return (dispatch,getState)=>{
        const uid=getState().auth.authid
        return firebase.database().ref(`users/${uid}/rooms`).once("value").then((snapshot)=>{
            snapshot.forEach((childsnap) => {
                let room={
                    id:childsnap.key,
                    ...childsnap.val()
                }
                rooms.push(room)
            });
            dispatch(setExpense(rooms));
        })
    }
}

export const removeExpense =({id}={})=>
{
    return{
        type:"REMOVE_EXPENSE",
        id:id
    }
}
export const startremoveExpense =({id})=>{
    return(dispatch,getState)=>{
        const uid=getState().auth.authid
        return firebase.database().ref(`users/${uid}/rooms/${id}`).remove().then(()=>{
            dispatch(removeExpense({id}));
        })
    }
}

export const editExpense =(id,updates) =>{
    return {
        type:"EDITEXPENSE",
        id:id,
        updates
    }
}

export const starteditExpense =(id,updates)=>{
    return(dispatch,getState)=>{
        const uid=getState().auth.authid
        return firebase.database().ref(`users/${uid}/rooms/${id}`).update({...updates}).then(()=>{
            dispatch(editExpense(id,updates));
        })
    }
}

