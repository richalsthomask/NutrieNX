import React            from 'react';
import Avatar           from '@material-ui/core/Avatar';
import Button           from '@material-ui/core/Button';
import CssBaseline      from '@material-ui/core/CssBaseline';
import TextField        from '@material-ui/core/TextField';
import Link             from '@material-ui/core/Link';
import Grid             from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography       from '@material-ui/core/Typography';
import Paper            from '@material-ui/core/Paper';
import axios            from 'axios';


export default class Register extends React.Component {
    
    constructor(){

        super();

        this.state={

            username:'',
            firstname:'',
            lastname:'',
            email:'',
            password:'',
            calorycount:0.0,
            redirect:false,
        };
    }

    checkregister=()=>
    {
        
            axios.post('http://localhost:8080/registeruser', 
                       { username: this.state.username, firstname: this.state.firstname, lastname: this.state.lastname, email: this.state.email, calorycount: this.state.calorycount },
                       { headers: { 'psword': this.state.password } })
                 .then(response=>{alert(response.data)})
        
    };

       render(){

        return (

        <Grid container 
              component="main"
              Style="height:100vh" >

            <CssBaseline />
                
                <Grid item sm={12} 
                           md={5} 
                      component={Paper} 
                      square>
                          
                    <br/>

                    <img src="logo1.png" 
                         width='40%'  />

                    <div Style="display:flex;
                                flex-direction:column;
                                align-items:center;
                                width:90%;
                                left:5%;
                                position:relative;">

                        <br/>

                        <Avatar Style="background-image:url(download.jpg);
                                       background-size:100% 100%;
                                       position:relative;">

                        < LockOutlinedIcon />

                        </Avatar >

                    <Typography component="h1" 
                                variant="h5">

                            Register

                    </Typography>
                    
                    <br />

                    <form  noValidate 
                           Style="width:100%">

                        <Grid container 
                              spacing={2}>

                            <Grid item md={12}>
                                
                                <TextField
                                    variant="outlined"
                                    label="Username"
                                    name="username"
                                    required
                                    fullWidth
                                    id="username"
                                    autoFocus
                                    onChange={(e)=>{this.setState({username:e.target.value})}}
                                />
                                
                            </Grid>
                            
                            
                            <Grid item xs={12} md={6}>

                                <TextField
                                    name="firstname"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="First Name"
                                    autoComplete="firstname"
                                    autoFocus
                                    onChange={(e) => { this.setState({ firstname: e.target.value })}}
                                />

                            </Grid>

                            <Grid item xs={12} 
                                       md={6}>

                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="lastname"
                                    label="Last Name"
                                    name="lastName"
                                    autoComplete="lastname"
                                    onChange={(e) => { this.setState({ lastname: e.target.value })}}
                                />

                            </Grid>

                            <Grid item md={12}>

                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    onChange={(e) => { this.setState({ email: e.target.value })}}
                                />

                            </Grid>

                            <Grid item md={12}>
                                
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    onChange={(e) => { this.setState({ password: e.target.value })}}
                                    />
                                    
                            </Grid>

                            <Grid item md={5}>
                                
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="calorycount"
                                    label="Daily calorycount"
                                    name="calorycount"
                                    onChange={(e) => { this.setState({ calorycount: e.target.value })}}
                                    />
                                    
                            </Grid>

                        </Grid>
                        
                        <br/><br/>

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            onClick={this.checkregister}
                        >
                            Register

                        </Button>

                        <Grid container>
                           
                            <Grid item>

                                <Link href="/Login" 
                                      variant="body2">

                                     {"Login=>"}

                                </Link>

                            </Grid>

                        </Grid>

                    </form>

                </div>

            </Grid>

            <Grid item sm={false} 
                       md={7} 
                  Style="background-image:url(nadine-primeau--ftWfohtjNw-unsplash.jpg);
                         background-size:cover;
                         background-position:center;" />
                         
            </Grid>
    );
}
}