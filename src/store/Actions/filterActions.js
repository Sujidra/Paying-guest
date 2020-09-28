

export const setText = ({text=""})=>{
    return{
        type:"TEXT_FILTER",
        text,
    }
}
export const setStartDate = ({startDate})=>{
    return{
        type:"STARTDATE_FILTER",
        startDate
    }
}
export const setEndDate = ({endDate})=>{
    return{
        type:"ENDDATE_FILTER",
        endDate,
    }
}
export const setSortBy = ({sortBy="Date"})=>{
    return{
        type:"SORETBY_FILTER",
        sortBy,
    }
}