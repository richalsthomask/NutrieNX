import React,{Component}     from 'react';
import Paper                 from '@material-ui/core/Paper';
import SemiCircleProgressBar from "react-progressbar-semicircle";       
import Grid                  from '@material-ui/core/Grid';
import Button                from '@material-ui/core/Button';
import Typography            from '@material-ui/core/Typography';
import Avatar                from '@material-ui/core/Avatar';
import { List, ListItem,
            ListItemText}    from '@material-ui/core';
import DeleteIcon            from '@material-ui/icons/Delete';
import AddCircleOutlineIcon  from '@material-ui/icons/AddCircleOutline';
import DatePicker            from "react-datepicker";
import                            "react-datepicker/dist/react-datepicker.css";
import Addmealpopup          from './addmeal';
import Userinfopopup         from './userinfo';
import TextField             from '@material-ui/core/TextField';
import Check                 from '@material-ui/icons/Check';
import cookie                from 'react-cookies';
import { Redirect }          from 'react-router';
import axios                 from 'axios';
import Moment                from 'moment';


export default class Homepage extends React.Component 
{
    constructor(){

        super();

        this.state={

            barcolor:'lime',
            
            caloryinfo:'loading.....',
            barcolor1:'lime',
            barpercentage1:70,
            caloryinfo1 :'Loading...',
            username:'loading', 
            firstname:'loading', 
            lastname:'',
            email:'',
            calorylimit:'...',
            note:'',
            selectdate:new Date(),
            addmealpopup:false,
            userinfopopup:false,
            calorybuttonpopup:true,
            key:0.0,
            meallist:'',
            currentcalory: 'Loading...',
            redirectlogin:false
            
        };
    }
    
 
     toggleaddmealpopup(){

         this.setState({ addmealpopup: !this.state.addmealpopup});

         this.meallistfetcher();

         this.barcolor();
    };

    toggleuserinfopopup(){

        this.setState({userinfopopup:!this.state.userinfopopup});
        
    };

    togglecalorybuttonpopup() {

        this.setState({ calorybuttonpopup: !this.state.calorybuttonpopup });

        this.barcolor();
    };

    componentWillMount(){

        this.setState({key:cookie.load('key')});

        axios.get("http://localhost:8080/checkkey",{headers:{key1:cookie.load('key')}})
             .then(response=>this.setState({redirectlogin:response.data}))

        axios.get("http://localhost:8080/user/userdetailes", { headers: { key1: cookie.load('key') } })
             .then(response => {  this.setState({ calorylimit: response.data.calorycount, username: response.data.username, firstname: response.data.firstname, lastname: response.data.lastname, email: response.data.email })})

        this.meallistfetcher();
    };

    calorychange=()=>{

        axios.get('http://localhost:8080/user/update/calorycount?calorycount=' + this.state.calorylimit, { headers: { 'key1': this.state.key}} );

        this.setState({ calorybuttonpopup: !this.state.calorybuttonpopup });

        this.barcolor();
    }

    barcolor= () =>{

        if ((this.state.caloryinfo / this.state.calorylimit * 100)>=100) { this.setState({ barcolor: 'red' })}

        else
              
         {this.setState({ barcolor: 'lime' });}
    }

    meallistfetcher=()=>{

        axios.post('http://localhost:8080/meal/gethistory', 
                     { day: this.state.selectdate.getDate(), month: this.state.selectdate.getMonth(), year: this.state.selectdate.getFullYear() },
                     { headers: { 'key1': cookie.load('key')} })
             .then(response => { this.setState({ meallist: response.data }) });

        this.setState({ caloryinfo:0});

        axios.get('http://localhost:8080/meal/getcalory', { headers: { 'key1': cookie.load('key') } })
             .then(response => { this.setState({ caloryinfo: response.data }) });
        
        this.barcolor();
    }
    
    meallistgenerator(){
        
        if(this.state.meallist=='') 
           return this.state.meallist;

        else
            return this.state.meallist.map((value, index) => {

                return <ListItem Style="background-color:rgba(0,0,0,.1)"
                                 onMouseEnter={()=>{this.barcolor();this.setState({ note: value.note })}} 
                                 onMouseLeave={()=>{this.setState({ note: '' })}}>
                           <ListItemText Style="width:1px">
                               <Button onClick={()=>{this.deletemeal(value.mealid)}}>
                                   <DeleteIcon color="secondary"/>
                                </Button>
                            </ListItemText> 
                            
                            <ListItemText align='left' 
                                          Style="right:3%" 
                                          primary={Moment(value.date).format('HH:mm')}>
                            </ListItemText> 
                            
                            <ListItemText align='middle'  
                                          primary={value.foodname} >
                            </ListItemText>
                            
                            <ListItemText align='right' 
                                          primary={value.calory} >
                            </ListItemText>
                            
                            </ListItem>
                        })
    }

    deletemeal(aa){

        axios.delete('http://localhost:8080/meal/delete', { headers: { 'key1': cookie.load('key'),'mealid':aa } });

        this.meallistfetcher();
    }
   
render(){

return(
    <div>
        <Grid container 
              component={Paper} 
              Style="height:100vh;
                     background-image:url(background.jpg);
                     background-repeat:no-repeat;
                     background-size:cover;
                     background=position:center; " >
        
        <Grid item sm={7} >

            <img src="logo1.png" 
                 width='30%'/>

    <div Style="margin:15% 20%;
                align-items:center;
                text-align:center" >

                <SemiCircleProgressBar strokeWidth={50} 
                                       diameter={500} 
                                       percentage={(this.state.caloryinfo / this.state.calorylimit * 100)-(this.state.caloryinfo/this.state.calorylimit*100)%1}  
                                       stroke={this.state.barcolor} />

                <h1>
                    {this.state.caloryinfo}/{this.state.calorylimit}
                </h1>
                <Button onClick={() => { this.toggleaddmealpopup()}}>
                    Add 
                      <AddCircleOutlineIcon fontSize="large" 
                                            color="primary" />
                    meal
                </Button>

                <Paper elevation={3} 
                       Style="font-size: large;">
                
                {this.state.note}
                
                </Paper>

    </div>

        </Grid>

        <Grid item sm={5}>

                <div Style="margin:10% 10%;
                            align-items:center;
                            text-align:center">

                    <Button onClick={() => { this.toggleuserinfopopup() }}>

                          <Avatar  >

                               <img src="images.png" height="100%" width="100%" /> 

                          </Avatar>

                    </Button>
                
                    <h1 Style="font-family:courier">
                        
                        Hello 

                        &nbsp;&nbsp;
                        
                        {this.state.firstname}
                        
                    </h1>
               
                <Typography component="h1" 
                            variant="h5" 
                            color="primary" >

                        Today you're max calory limit is 
                        
                        {this.state.calorybuttonpopup?

                            <Button Style="left:10px" 
                                    variant="outlined" 
                                    onClick={() => { this.togglecalorybuttonpopup()}} >

                                {this.state.calorylimit}

                            </Button>
                            :
                            <span >
                                 < TextField Style="width:70px;
                                                    left:10px;"  
                                             onChange={(e) => { this.setState({ calorylimit: e.target.value }) }} />

                                 <span >

                                     <Button Style="left:10px;" 
                                             onClick={() => { this.calorychange()}}>

                                                 <Check />
                                                 
                                     </Button >
                                     
                                 </span>
                                 
                            </span>
                        }
                        
                    </Typography>
                    
                    <br/>

                    <DatePicker selected={this.state.selectdate} 
                                onChange={(date) => {this.setState({selectdate:date});
                                                     axios.post('http://localhost:8080/meal/gethistory',
                                                                { day: date.getDate(), month:date.getMonth(), year:date.getFullYear() },
                                                                { headers: { 'key1': cookie.load('key') } })
                                                     .then(response => { this.setState({ meallist: response.data }) }); }} />

                    <br/>
                
                    
                <div> &nbsp; </div>

                 <div Style="height:45vh;
                             width:110%;
                             overflow-y:scroll;">
                    
                <List disablePadding  
                      Style="background-color:rgba(0,0,0, 0.15);">
                        
                        <ListItem Style="background-color:rgba(0,0,0, 0.2);">

                                <ListItemText >
                                    
                                </ListItemText> 
                                
                                <ListItemText Style="color:green;" 
                                              primary="Time ">
                                
                                </ListItemText> 
                                
                                <ListItemText Style="color:blue;" 
                                              align='middle' 
                                              primary="Food" >
                                        
                                </ListItemText>
                                
                                <ListItemText Style="color:red;" 
                                              align='right' 
                                              primary="Calory" >

                                </ListItemText>

                        </ListItem>
                    
                        </List>
                    
                    {this.meallistgenerator()}

                </div>

            </div>

        </Grid>
       
    </Grid>

     {
            this.state.addmealpopup?
                <Addmealpopup closepopup={this.toggleaddmealpopup.bind(this)}/> : null
     }

     {
         this.state.userinfopopup?
          <Userinfopopup closepopup={this.toggleuserinfopopup.bind(this)} 
                         username={this.state.username} 
                         firstname={this.state.firstname} 
                         lastname={this.state.lastname} 
                         email={this.state.email} 
                         key={this.state.key}/>
          :

          null
     }
     
     {
         this.state.redirectlogin?
                <Redirect to='Login' /> : null
     }
    </div>
);
}
}
