import React                   from 'react';
import Button                  from '@material-ui/core/Button';
import CloseIcon               from '@material-ui/icons/Close';
import TextField               from '@material-ui/core/TextField';
import Grid                    from '@material-ui/core/Grid';
import axios                   from 'axios';
import { Redirect }            from 'react-router';
import cookie                  from 'react-cookies';

export default class Addmealpopup extends React.Component {
    
   constructor(){

      super();

      this.state={
         mealname:'',
         calory:0.0,
         note:'',
         redirect:true,alert:'aa',
      };

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
            <div 
               align="center" 
               Style = "position:fixed;
                        height:60%;
                        width:50%;
                        top:20%;
                        bottom:20%;
                        left:25%;
                        right:25%;
                        background-color:white;
                        border-radius:500px;
                        border:1px solid red;" >

            <div align="right">
            <Button 
               Style = "background-color:red;
                        border-radius:60%;
                        right:6%;"
               variant = "contained"
               onClick = {this.props.closepopup} >
            <CloseIcon/>
            </Button>
            </div >   
                 <h3>Add your new Meal </h3> 
                 
                    {this.state.alert}
            <div Style="width:50%" >

            < TextField 
                   variant = "filled"
                    margin = "normal" 
                    required fullWidth id = "mealname"
                    label = "Meal Name"
                    onChange={(e) => {this.setState({ mealname : e.target.value })}}
                    autoFocus/> 

            <span Style="display:inline-block;
                         width:100%">

            <Grid container>

            <Grid item md={6} >

            <b Style="position:relative;
                      top:30px;">

            calory of the meal:

            </b>

            </Grid>

            <Grid item md={6}>

            <TextField 
               margin = "normal" 
               required fullWidth id = "calory"
               defaultValue={this.state.calory}
               onChange={(e) => {this.setState({calory : e.target.value})}}
               type="number"
               autoFocus/>

            </Grid>

            </Grid>

            </span>

            <br/><br/><br/>

            <input 
               Style = "height:100px;
                        width:300px;"
               type="text" 
               placeholder="Note" 
               onChange={(e) => {this.setState({note:e.target.value})}}
               id="note"/>

            <br/><br/>

            <Button 
               varient="contained" 
               Style="background-color:red;
                      bottom:3px"
               onClick={()=>{axios.post('http://localhost:8080/meal/post',
                                            { foodname: this.state.mealname, note: this.state.note, calory: this.state.calory},
                                            { headers: { 'key1': cookie.load('key'), 'calory': this.state.calory } })
                                  .then(response => { alert(response.data); this.setState({ redirect: false }); })}}>

                       SUBMIT

            </Button>
            {
               this.state.redirect?
               null:<Redirect to="/homepage"/>
            }
            </div>

            </div>  
            
            </div>
        );
    }
}