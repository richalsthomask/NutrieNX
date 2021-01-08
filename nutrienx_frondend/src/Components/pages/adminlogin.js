import React      from 'react';
import Button     from '@material-ui/core/Button';
import TextField  from '@material-ui/core/TextField';

export default class Adminlogin extends React.Component{

    
    render(){

    return(

        < div  
           Style = "height:100vh;
                    width:100%;
                    background-image:url(arcreacter.jpg);
                    background-size:cover;
                    background-repeat: no-repeat;" >
        < div 
            Style = "background-image:url(logo1.png);
                     height:10%;
                     width:33%;
                     background-repeat:no-repeat;
                     background-size:cover;" />
        <div   
           Style="height:100vh;
                  width:100vh"
           Style = "width:40%;
                    margin:10% auto;" >

        < TextField 
            variant = "outlined"
            margin = "normal"  
            Style="background-color:rgba(255,255,255,.3)"
            required fullWidth id = "username"
            label = "Username"
            name = "username"
            autoComplete = "username" 
            color="secondary"
            autoFocus />  

        <TextField 
            variant = "outlined"
            margin = "normal"
            required fullWidth name = "password"
            Style = "background-color:rgba(255,255,255,.3)"
            label = "Password"
            type = "password"
            color="secondary"
            id = "password"
            autoComplete = "current-password"/>  <br /> <br /> 

        <Button 
            type = "submit"
            fullWidth variant = "contained"
            color = "primary">

        Login 
        
        </Button> 
            
        </div>
        
        </div>
    );
    }
}