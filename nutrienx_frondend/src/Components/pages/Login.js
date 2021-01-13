import React            from 'react';
import Avatar           from '@material-ui/core/Avatar';
import Button           from '@material-ui/core/Button';
import CssBaseline      from '@material-ui/core/CssBaseline';
import TextField        from '@material-ui/core/TextField';
import Link             from '@material-ui/core/Link';
import Paper            from '@material-ui/core/Paper';
import Grid             from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography       from '@material-ui/core/Typography';
import { Redirect }     from 'react-router';
import axios            from 'axios';
import cookie           from 'react-cookies';
 

function redirection(stat){

    return(
      <div>

          {stat? 

             null : <Redirect to="/homepage"/>

          }
                    
      </div>
      );
}

export default class Login extends React.Component {
    
    constructor(){

        super();

        this.state={

            username:'',
            password:'',
            redirect:true,
            key:0.0,

        };
    }
   
    cookieoperater=()=>{

        if (this.state.key === 0.1 || this.state.key === 0.0 || this.state.key === 0)

          alert('username or password is wrong');

        else{

            cookie.save('key',this.state.key, { path : '/' });
            
            this.setState({redirect:false})

         }
    }
    
    render(){ 

    return (

        <Grid container 
              component="main" 
              Style="height:100vh;" >

            {redirection(this.state.redirect)} 
            
            <CssBaseline />

            <Grid item sm={false} 
                       md={7} 
                  Style="background-image:url(nadine-primeau--ftWfohtjNw-unsplash.jpg);
                         background-size:cover;
                         background-position:center;" />

            <Grid item sm={12} 
                       md={5} 
                  component={Paper} 
                  square>

            <br />

                <img src="logo1.png" 
                     width='40%' 
                     align='right' />
                     
            <br /><br /><br /><br /><br />

                <div Style="display:flex;
                           flex-direction:column;
                           align-items:center;
                           position:relative;
                           height:100%;
                           width:90%;
                           left:5%;">

                    <Avatar Style="background-image:url(download.jpg);
                                   background-size:100% 100%;
                                   position:relative;">

                        < LockOutlinedIcon />

                    </Avatar >

                    <Typography component="h1" 
                                variant="h5">

                        Login

                    </Typography>
                    
                    <br /><br />

                    <form Style="width:100%" 
                          noValidate>
                               
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="Username"
                            name="username"
                            autoComplete="username"
                            autoFocus
                            onChange={(e) => { this.setState({ username: e.target.value }) }}
                        />
                        
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            onChange={(e) => { this.setState({ password: e.target.value }) }}/>
                            
                        <br /><br /><br />

                        <Button
                            
                            fullWidth
                            variant="contained"
                            color="primary"
                            onClick={() => { axios.get('http://localhost:8080/login', { headers: { 'username': this.state.username, 'password': this.state.password } })
                                                  .then(response => { this.setState({ key: response.data });  this.cookieoperater() })} }
                           
                        >
                            Login

                        </Button>

                        <Grid container>

                            <Grid item xs>

                                

                            </Grid>

                            <Grid item>

                                <Link href="/Register" 
                                      variant="body2">

                                    {"<=Register"}
                                     
                                </Link>

                            </Grid>

                        </Grid>

                    </form>

                </div>

            </Grid>
            
        </Grid>
    );
}
}
