import React, 
        {Component}        from 'react';
import Button              from '@material-ui/core/Button';
import CloseIcon           from '@material-ui/icons/Close';
import Avatar              from '@material-ui/core/Avatar';
import MeetingRoom         from '@material-ui/icons/MeetingRoom';
import cookie              from 'react-cookies';
import { Redirect }        from 'react-router';
import axios               from 'axios';

export default class Userinfopopup extends React.Component {

    constructor(){

        super();

        this.state={
            
            nametoggle:true,
            emailtoggle:true,
            redirect:false,
            username: '',
            firstname: '',
            lastname: '',
            email: '',
            key:0.0,
        };
    }

    componentWillMount(){

        this.setState({
            username: this.props.username,
            firstname: this.props.firstname,
            lastname: this.props.lastname,
            email: this.props.email,
            key: cookie.load('key')});
    }

    logout=()=>{

        axios.put('http://localhost:8080/logout',{headers:{'key1':this.state.key}})

        cookie.remove('key',{path:'/'});

        this.setState({redirect:true});
    }
    
    toggleemail=()=> {

        axios.get('http://localhost:8080/user/update/email', { headers: { 'key1': this.state.key, 'email': this.state.email } })
             .then(response => alert(response.data));

        this.setState({
            emailtoggle: !this.state.emailtoggle
        });

    }

    togglename=()=> {

        axios.get('http://localhost:8080/user/update/firstname', { headers: { 'key1': this.state.key, 'firstname': this.state.firstname } })
             .then(response => alert(response.data));

        axios.get('http://localhost:8080/user/update/lastname', { headers: { 'key1': this.state.key, 'lastname': this.state.lastname } })
             .then(response => alert(response.data));

        this.setState({
            nametoggle: !this.state.nametoggle
        });
    }

    render() {

        return ( 

        <div 
           Style = "position:fixed;
                    height:100%;
                    width:100%;
                    top:0;
                    bottom:0;
                    right:0;
                    left:0;
                    background-color:rgba(0,0,0,.5);" >
                        {
                            this.state.redirect?
                                <Redirect to='Login'/>:null
                        }

            <div 
               align="center"
               Style = "position:fixed;
                        height:50%;
                        width:40%;
                        top:25%;
                        bottom:25%;
                        left:30%;
                        right:30%;
                        background-color:white;
                        border-radius:10px;
                        border:2px solid blue" >

            <div  align = "right" >

            <Button
                Style = "background-color:blue;
                         align-items:right;"
                onClick = {this.props.closepopup} >
            
                  <CloseIcon color="secondary"/>

            </Button> 

            </div>

            <div 
               align="left" 
               Style="bottom:10;">

            <img src = "logo1.png"/>

            </div>   

            <Avatar 
               src = "images.png" 
               Style="border:3px solid lightgreen" > 

            </Avatar>

            <br/><br/>

            <b Style="font-size:large">

            {"Username : "}

            </b>
              
                <span>

                    <b>

                    {this.state.username}

                    </b>
                   
                </span>
              
                
            
            <br/><br/>

            <b Style="font-size:large">

            {"Name : "}

            </b>
            {
                this.state.nametoggle?

                <span>

                    <b>
                            {this.state.firstname}&nbsp;&nbsp;&nbsp;{this.state.lastname}
                    </b> 

                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

                    <Button 
                       variant="outlined"  
                       onClick={()=>{this.setState({
                                nametoggle: !this.state.nametoggle
                            })}}>

                    {"change"}

                    </Button>

                </span>

                :

                <span>

                    <input 
                       type="text" 
                       placeholder={this.state.firstname} 
                       id="firstname"
                       onChange={(e)=>{this.setState({firstname:e.target.value})}}/>

                    &nbsp; &nbsp; &nbsp;

                    <input 
                       type="text" 
                       id="lastname" 
                       placeholder={this.state.lastname}
                       onChange={(e)=>{this.setState({lastname:e.target.value})}}/> 

                    &nbsp;&nbsp;

                    <Button 
                       Style="background-color:red;" 
                       variant="outlined" 
                       onClick={()=>{this.togglename()}}>

                    enter

                    </Button>

                </span>
            }

            <br/><br/>

            <b Style="font-size:large">

            {"Emai : "}

            </b>

            {
                this.state.emailtoggle?

                      <span>

                          <b>

                            {this.state.email}

                          </b>

                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

                          <Button 
                             variant="outlined"  
                             onClick={()=>{this.setState({
                                emailtoggle: !this.state.emailtoggle
                            })}}>

                          {"change"}

                          </Button>

                     </span>

                      :

                      <span>

                          <input 
                             type="email" 
                             placeholder={this.state.email}
                             id="email" 
                             onChange={(e) => { this.setState({ email: e.target.value }) }}/> 

                          &nbsp;&nbsp;

                          <Button 
                              Style="background-color:red;" 
                              variant="outlined"
                              onClick={()=>{this.toggleemail()}}>

                          enter

                          </Button>

                          </span>

            }

            <br/><br/>

            < Button onClick={this.logout}> 

                < MeetingRoom color="secondary"/>

               <b Style="color:red" >

                   LOGOUT

               </b>

            </Button>

            </div>   
            
            </div>
        );
    }
}