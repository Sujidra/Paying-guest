import { v4 as uuid} from "uuid";
import firebase from  "../../firebase/firebas"

export const addExpense =({id,name,amt,address,mindays,maxdays,images,tags}={})=>{
    return{
        type:"ADD_EXPENSE",
        id,
        name,
        amt,
        address,
        mindays,
        maxdays,
        images,
        tags
    }
}
export const startaddexpense=({name,amt,address,mindays,maxdays,images,tags}={})=>{
    const rooms={
        name,
        amt,
        address,
        mindays,
        maxdays,
        images,
        tags
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
export const setRooms=(room)=>{
return{
        type:"SET_ROOMS",
        room
    }
}

export const startSetAllRooms=()=>{
    console.log("hii")
    const rooms=[]
    return (dispatch,getState)=>{
        const uid=getState().auth.authid
        return firebase.database().ref(`users`).once("value").then((snapshot)=>{
            let ids=[]
            snapshot.forEach((childsnap) => {
                if(childsnap.val().rooms){
                    ids.push(childsnap.key)
                }
                
            });

            console.log(ids)
            let count=ids.length
            console.log(count)
            ids.map((i,idx)=>{
                return firebase.database().ref(`users/${i}/rooms`).once("value").then((roomshot)=>{
                    roomshot.forEach((rm)=>{
                        console.log(rm.val())
                        let room={
                            id:rm.key,
                            userid:i,
                            ...rm.val()
                        }
                        rooms.push(room)
                        
                    })
                    if((idx+1)===count)
                    {
                        console.log(rooms)
                        dispatch(setRooms(rooms));
                        
                    }
                    
                })
            })
            
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

export const editAllRom =(userid,id,updates) =>{
    return {
        type:"EDITALLROOM",
        id:id,
        userid:userid,
        updates
    }
}

export const starteditallRoom =(userid,id,updates)=>{
    return(dispatch,getState)=>{
        return firebase.database().ref(`users/${userid}/rooms/${id}`).update({...updates}).then(()=>{
            dispatch(editAllRom(userid,id,updates));
        })
    }
}

