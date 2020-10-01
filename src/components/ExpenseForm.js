import React from "react";
import moment from "moment";
import {SingleDatePicker } from "react-dates";
import { WithContext as ReactTags } from 'react-tag-input';
import MultiImageInput from 'react-multiple-image-input';
import 'react-dates/lib/css/_datepicker.css';
import "./expenseAdd.css"
import "./Header.css"
import "./expenseFilter.css"


const crop = {
    unit: '%',
    aspect: 4 / 3,
    width: '100'
  };
 

const KeyCodes = {
comma: 188,
enter: 13,
};
const delimiters = [KeyCodes.comma, KeyCodes.enter];


class ExpenseForm extends React.Component{
    constructor(props){
        super(props);
        this.state={
            tags:(props.rooms)?props.rooms.tags: [],
            suggestions:[{ id: "1", text: '3 beds' },{ id: 'Fully Furnished home', text: 'Fully Furnished home' },{ id: '2 bathrooms', text: '2 bathrooms' },{ id: 'sofa', text: 'sofa'},{ id: 'TV', text: 'TV' },{ id: 'Dinning Table', text: 'Dinning Table' },{ id: 'Fridge', text: 'Fridge' }],
            name:(props.rooms)?props.rooms.name:"",
            amt:(props.rooms)?(props.rooms.amt/100).toString():"",
            address:(props.rooms)?props.rooms.address:"",
            createdAt:(props.rooms)?moment(props.rooms.createdAt):moment(),
            mindays:(props.rooms)?props.rooms.mindays:"",
            maxdays:(props.rooms)?props.rooms.maxdays:"",
            error:" ",
            images:(props.rooms)?props.rooms.images:{},
            bookstartDate:(props.rooms)?props.rooms.bookstartDate:["0"],
            bookendDate:(props.rooms)?props.rooms.bookendDate:["0"]
        }
    }
    
    onnameChange=(e)=>{
        const des=e.target.value;
        this.setState(()=>{
            return {name:des}
        })
    }
    onAmtChange=(e)=>{
        const amount=e.target.value;
        if(amount.match(/^\d*(\.\d{0,2})?$/))
        this.setState(()=>{
            return {amt:amount}
        })
    }
    onaddressChange=(e)=>{
        const note=e.target.value;
        this.setState(()=>{
            return {address:note}
        })
    }
    

    handleDelete=(i) =>{
        const { tags } = this.state;
        this.setState({
          tags: tags.filter((tag, index) => index !== i),
        });
      }
    
      handleAddition=(tag)=> {
        this.setState(state => ({ tags: [...state.tags, tag] }));
    }

    
      handleDrag=(tag, currPos, newPos)=> {
        const tags = [...this.state.tags];
        const newTags = tags.slice();
    
        newTags.splice(currPos, 1);
        newTags.splice(newPos, 0, tag);
    
        // re-render
        this.setState({ tags: newTags });
      }
    
      handleTagClick=(index)=> {
        console.log('The tag at index ' + index + ' was clicked');
      }

      setImages=(img)=>{
        this.setState({images:img})
      }

    onSubmitFunc=(e)=>{
        e.preventDefault();
        if(!this.state.name || !this.state.amt  || !this.state.address || !this.state.mindays || !this.state.maxdays || !this.state.images || !this.state.tags){
            this.setState(()=>{
                return {error:"Please provide name,address,minimum booking days,maximum booking days,images,room features and amount"}
            })
        }else{
            this.setState(()=>{
                return {error:" "}
            })
            this.props.onSubmit({
                name:this.state.name,
                amt:parseFloat(this.state.amt,10)*100,
                address:this.state.address,
                mindays:this.state.mindays,
                maxdays:this.state.maxdays,
                images:this.state.images,
                tags:this.state.tags,
                bookstartDate:this.state.bookstartDate,
                bookendDate:this.state.bookendDate
            })
        }
    }
    render(){
        
        return(
            <form onSubmit={this.onSubmitFunc}>
                <div class="form">
                    <input className="description" placeHolder="Room name" type="text"  value={this.state.name} onChange={(e)=>{this.onnameChange(e)}}/>
                    <input className="amountdata" type="number" placeHolder="Amount per day" value={this.state.amt} onChange={(e)=>{this.onAmtChange(e)}}/>
                    <textarea className="textarea" placeHolder="Address" value={this.state.address} onChange={(e)=>{this.onaddressChange(e)}}></textarea>
                    <input className="amountdata" type="number" placeHolder="Minimum booking days" value={this.state.mindays} onChange={(e)=>{this.setState({mindays:e.target.value})}}/>
                    <input className="amountdata" type="number" placeHolder="Maximum booking days" value={this.state.maxdays} onChange={(e)=>{this.setState({maxdays:e.target.value})}}/>
                    <MultiImageInput
                        max={10}
                        theme="light"
                        images={this.state.images}
                        setImages={this.setImages}
                        allowCrop={false}
                        cropConfig={{ crop, ruleOfThirds: true }}
                    />
                    <label>Room Features(you can also add your own feature other than given suggestion)</label>
                    <ReactTags 
                        tags={this.state.tags}
                        suggestions={this.state.suggestions}
                        delimiters={delimiters}
                        minQueryLength={0}
                        autofocus={false}
                        placeholder = "Add new Features"
                        handleDelete={this.handleDelete}
                        handleAddition={this.handleAddition}
                        handleDrag={this.handleDrag}
                        handleTagClick={this.handleTagClick}
                    />
                    <p style={{marginTop:"1rem"}}>{(this.state.error) && <p className="error">{this.state.error}</p>}</p>
                    
                </div>
                    
                    <button style={{marginBottom:"20px"}} className="addexpense" value="submit">{this.props.rooms?<p>Save Details</p>:<p>Add Room</p>}</button>
                
                
                </form>
        )
        
    }
}
export default ExpenseForm;