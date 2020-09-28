import moment from "moment"

const defaultFilters = {
    text:"",
    startDate:moment().startOf("month"),
    endDate:moment().endOf("month"),
    sortBy:"Date"
}
const filterReducers=(state=defaultFilters,action)=>{
    switch(action.type){
        case "TEXT_FILTER":return{
            ...state,
            text:action.text
        }
        case "STARTDATE_FILTER":return{
            ...state,
            startDate:action.startDate
        }
        case "ENDDATE_FILTER":return{
            ...state,
            endDate:action.endDate
        }
        case "SORETBY_FILTER":return{
            ...state,
            sortBy:action.sortBy
        }
        default:return state;

    }
    return state;
}
export default filterReducers;