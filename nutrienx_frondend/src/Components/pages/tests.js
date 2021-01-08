import React          from 'react';
import axios          from 'axios';
import Button         from '@material-ui/core/Button';
import { Redirect }   from 'react-router';
import cookie         from 'react-cookies';
import DatePicker     from "react-datepicker";
import Moment         from 'moment';

class Popup extends React.Component {

constructor(){

  super();
    
  this.state={
 
  msg:'aaaa',
  a1:'ssss',
  ss:1,
  ok:true,
  qq:'',
  date:new Date()
  };
}
  sss = () => {
    
    axios.get('http://localhost:8080/test', { headers: { 'username':this.state.date } }).then(response => { alert(response.data); })
              } 
              componentWillMount(){
                this.setState({qq:this.props.qq})
              }          

  render() {
    
   
    return (
      <div Style="top:0;height:100vh;width:100%;background-color:rgba(0,0,0,.3);position:absolute;">
        <div Style="left:25%;top:25%;height:50%;width:50%;position:absolute;text-align:center;background-color:rgb(100,100,100);margin: auto;  " >
          <h1>{this.props.text}</h1>
        <Button onClick={this.props.closePopup}>close me</Button>
          <Button onClick={() => {this.sss()}}>here</Button>
        
        
        {this.state.a1}
          {
            this.state.ok ?
              "     dddd" : "      hhhhhh"
          }
          {
            this.state.ok ?
              null : <Redirect to="/homepage" />
          }{this.state.qq}
        </div>
   
      </div>
    );
  }
} 
export default class Tests extends React.Component {
  constructor() {
    super();
    this.state = {
      showPopup: false,
      ansr:"1",
      s: cookie.load('key'),
      a: 'lsssssssss',
      oo:'aaa' ,
      data:'',
      date: new Date(),
      returndate:'ss'
    };
  }

  togglePopup() {
    this.setState({
      showPopup: !this.state.showPopup,
      
    });
  }

  comp(){
    if (this.state.data == '') return this.state.data;
    else return this.state.data.map((value, index) => { return <div>{value.foodname}&nbsp;{Moment(value.date).format('DD/MM/yyyy')}</div> });
  }
  
  render() {
    return (
      <div >
        <h1>hihi</h1>
        <button Style="cursor:pointer;"onClick={this.togglePopup.bind(this)}>show popup</button>
        <button onClick={() => {alert('woooooooot?');}}>try me when popup is open</button>
        <p>hello.</p>
        <button onClick={()=>{this.call()}}>click me</button>
        {this.state.showPopup ? 
          <Popup
            text='Close Me'
            closePopup={this.togglePopup.bind(this)}
            qq={this.state.a}
          />
          : null
        }{this.state.s}
        <button onClick={<Redirect to="/homepage"/>} >homepage</button>
        <Button onClick={()=>{cookie.save('userId', 'user1Id', { path: '/' })}} >press</Button>
        
        <Button onClick={() => { this.setState({ a: cookie.load('userId') }) }}>lets see</Button>
        {this.state.a}
        <div/>
        <Button variant="outlined" onClick={() => { axios.post('http://localhost:8080/tests', { username: 'richals' }).then(response => { this.setState({ oo: response.data.username }); });}}>tests</Button>
        {this.state.oo}<div /><div /><div > &nbsp; </div >
        <Button variant="contained" onClick={()=>{axios.get('http://localhost:8080/meal/gethistory',{headers:{'key1':cookie.load('key')}}).then(response=>{this.setState({data:response.data})});alert(this.state.data.foodname);}}>{"meal"} &nbsp; {"data"}</Button>
        {this.comp()}
        <div/>
        {this.state.date.getDate()}&nbsp;{this.state.date.getMonth() }&nbsp;{this.state.date.getFullYear()}<div/>
        <DatePicker selected={this.state.date} onChange={(date1) => { this.setState({ date: date1 }); }} />
        <div/>
        {this.state.returndate}<Button onClick={() => { axios.post('http://localhost:8080/tests',{date:this.state.date.getDate(),month:this.state.date.getMonth(),year:this.state.date.getFullYear()}).then(response=>{this.setState({returndate:response.data})})}}>datechecker</Button>
      </div>
    );
  }
};
