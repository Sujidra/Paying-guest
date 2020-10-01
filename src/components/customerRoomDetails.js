import React from "react";
import {connect} from "react-redux"
import { ReactReduxContext } from "react-redux";
import { DateRangePicker, isInclusivelyBeforeDay, isInclusivelyAfterDay } from 'react-dates';
import moment from "moment";
import {starteditallRoom} from "../store/Actions/customerRoomsAction"
import { START_DATE, END_DATE } from 'react-dates/constants';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';


//import SimpleReactCalendar from 'simple-react-calendar'

//import 'react-slideshow-image/dist/styles.css'
//import 'react-slideshow-image/dist/styles.css'

import numeral from "numeral";
import "./expenseAdd.css" 
import "./Header.css"
import "./expenseFilter.css"
import { LinearProgress } from "@material-ui/core";

const maximumDays = 6;
    

class RoomDetails extends React.Component{
    constructor(props){
        super(props)

       this. state={
            calenderFocused:null,
            calenderFocused1:null,
            startDate:null,
            endDate:null,
            rangeError:"",
            loading:false
         }
        
    }
     
      
      isDayBlocked = momentDate => {
         //day1 => this.state.disabledDates.some(day2 => isSameDay(day1, day2))
         console.log(momentDate)
         console.log(this.props.location.state.room.bookstartDate)
         console.log(momentDate.isAfter(moment(this.props.location.state.room.bookstartDate)))
            for(let i=0;i<this.props.location.state.room.bookstartDate.length;i++)
            {
                
               if((momentDate.isAfter(moment(this.props.location.state.room.bookstartDate[i]))||momentDate.isSame(moment(this.props.location.state.room.bookstartDate[i])))&&(momentDate.isBefore(moment(this.props.location.state.room.bookendDate[i]))||momentDate.isSame(moment(this.props.location.state.room.bookendDate[i]))))
               {
                   return true;
                   break;
               }
           }
       
        
         
      
         
     }
     onDatechange=({startDate,endDate})=>{
         this.setState({startDate:startDate,endDate:endDate})
         console.log(startDate,endDate)
     }
     onfocusChange1=(focusedInput)=>{
         this.setState(()=>({calenderFocused1:focusedInput}))
     }
     onfocusChange=(focusedInput)=>{
        this.setState(()=>({calenderFocused:focusedInput}))
    }
     
     book=()=>{
         this.setState({rangeError:""})
         if(this.state.endDate===null||this.state.startDate===null)
         {
            return this.setState({rangeError:"Please select the date to book"})
         }
         if(this.state.endDate.diff(this.state.startDate,"days")<this.props.location.state.room.maxdays)
         {
            if(this.state.endDate.diff(this.state.startDate,"days")>=this.props.location.state.room.mindays)
             {
                let s=this.props.location.state.room.bookstartDate?this.props.location.state.room.bookstartDate:[]
                s.push(this.state.startDate.valueOf())
                let b=this.props.location.state.room.bookendDate ? this.props.location.state.room.bookendDate :[]
                b.push(this.state.endDate.valueOf())
                   this.setState({loading:true})
               this.props.dispatch(starteditallRoom(this.props.location.state.room.userid,this.props.location.state.room.id,{bookstartDate:s,bookendDate:b})).then(()=>{
                   this.setState({loading:false})
                   document.getElementById("LinkSuccess").click()
               }).catch(()=>{
                   this.setState({loading:false})
                   document.getElementById("LinkFailed").click()
               })
            }else{
                this.setState({rangeError:`minimum days for booking is:${this.props.location.state.room.mindays}`})
            }
             
         }else{
             this.setState({rangeError:`maximum days for booking is:${this.props.location.state.room.maxdays}`})
         }
     }
         
    render(){ 
        const { focusedInput, startDate, endDate } = this.state;
        let minimumNights  = 1;
        let maximumNights = 5;
        let maximumEndDate = moment().add(maximumNights, 'days');
        let condition;

        if(startDate){
            maximumEndDate = startDate.clone().add(maximumNights, 'days')
        }

        if(focusedInput === END_DATE) {
            condition = (day) => !isInclusivelyAfterDay(day, moment()) || isInclusivelyAfterDay(day, maximumEndDate);
        }

        if(focusedInput === START_DATE) {
            condition = (day) => !isInclusivelyAfterDay(day, moment());
        }
    return(
        <div>
            <p className="addsubhead">Rooms Details</p>
            <div className="expensefilter_container">
                <p className="itemtitle">{this.props.location.state.room.name} - {this.props.location.state.room.address}</p>
                <div style={{display:"flex",alignItems:"center",justifyContent:"center",width:"100%"}}>
                    <img width={"100%"} src={this.props.location.state.room.images[0]}></img>
                </div>
                
                <h1>House Features</h1>
                {this.props.location.state.room.tags.map((t)=>{
                    return(
                        <ol>
                            <li>{t.text}</li>
                        </ol>
                    )
                })}
            </div>
            <div className="box">
                <div className="listheading">
                    <p>Price per day </p>
                    <p>Booking days-Minimum</p>
                    <p>Booking days-Maximum</p>
                </div>
                <div className="list" style={{paddingTop:"1rem"}}>
                    <p>{numeral(this.props.location.state.room.amt/100).format('Rs0.00')} </p>
                    <p>{this.props.location.state.room.mindays}</p>
                    <p>{this.props.location.state.room.maxdays}</p>
                </div>
               
            </div>
            <div className="expensefilter_container" style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <h3>Check Availability</h3>
                <div className="datebox">
                    <DateRangePicker 
                        focusedInput={this.state.calenderFocused1}
                        onFocusChange={this.onfocusChange1}
                        showClearDates={true}
                        readOnly={false}
                        numberOfMonths={1}
                        isDayBlocked={this.isDayBlocked}
                        minimumNights={minimumNights}
                        isOutsideRange={condition}

                        
                    />
                </div>
               
            </div>

            <div className="expensefilter_container" style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <h4>Book Room</h4>
                
                <div className="datebox">
                    {this.state.rangeError && <p style={{color:"red"}}>{this.state.rangeError}</p>}
                    <DateRangePicker 
                        startDate={this.state.startDate}
                        endDate={this.state.endDate}
                        onDatesChange={this.onDatechange}
                        focusedInput={this.state.calenderFocused}
                        onFocusChange={this.onfocusChange}
                        showClearDates={true}
                        numberOfMonths={1}
                        isDayBlocked={this.isDayBlocked}
                        minimumNights={minimumNights}
                        isOutsideRange={condition}

                        
                    />
                </div>
                     
                
            </div>
            {this.state.loading && <LinearProgress/>}
            <div className="expensefilter_container" style={{display:"flex",justifyContent:"center",alignItems:"center",paddingBottom:"200px"}}>
                <button class="btn btn-sm btn-primary" onClick={(e)=>{this.book()}}>Click here to Book!!</button>
            </div>

            <button type="button"  style={{display:"none"}} data-toggle="modal" data-target="#Success" id="LinkSuccess" ></button>       
            <button type="button"  style={{display:"none"}} data-toggle="modal" data-target="#Failed" id="LinkFailed" ></button>       
                    
                <div id="Success" class="modal fade" >
                    <div class="modal-dialog" style={{maxWidth:"450px"}}>
                        <div class="modal-content">
                            <form>
                                <div>
                                <div class="modal-body">	
                                    <div class="form-group" >
                                    <CheckCircleIcon style={{width:"100%",display:"flex",justifyContent:"center",color:"green"}}  fontSize="large"/>
                                    <h1 style={{display:"flex",justifyContent:"center"}}>Booked</h1>
                                                        
                                    </div>
                                    
                                </div>
                                <div class="modal-footer" style={{display:"flex",justifyContent:"center"}}>
                                    <button class="btn btn-primary" data-dismiss="modal" aria-hidden="true" value="Ok"  >OK</button>
                                    
                                </div>
                                
                                </div>
                                
                            </form>
                        </div>
                    </div>
                </div>
                    
                    <div id="Failed" class="modal fade" >
                        <div class="modal-dialog" style={{maxWidth:"450px"}}>
                            <div class="modal-content">
                                <form>
                                    
                                <div>
                                    <div class="modal-body">	
                                    <div class="form-group" >
                                        <ErrorOutlineIcon style={{width:"100%",display:"flex",justifyContent:"center",color:"red"}}  fontSize="large"/>
                                        <h1 style={{display:"flex",justifyContent:"center"}}>Error occured</h1>
                                                            
                                    </div>
                                    
                                    </div>
                                    <div class="modal-footer" style={{display:"flex",justifyContent:"center"}}>
                                    <input type="button" class="btn btn-primary" data-dismiss="modal" aria-hidden="true" value="Ok" data-dismiss="modal" aria-hidden="true" /*onClick={()=>{props.history.push("/adminreseller")}}*/ />
                                    
                                    </div>
                                </div>
                            
                            
                            </form>
                        </div>
                    </div>
                    </div>
                

        </div>



    )
}
    
};
const mapStateToProps= (state)=>{
    return {
        rooms:state.rooms,
        
    }
}

export default connect(mapStateToProps)(RoomDetails)
