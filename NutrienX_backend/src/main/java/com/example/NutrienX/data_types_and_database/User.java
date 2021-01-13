/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.example.NutrienX.data_types_and_database;


import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

/**
 *
 * @author richa
 */
@Document(collection="User")
public class User {
    
    @Id
    String username;
    String firstname;
    String lastname;
    String email;
    Double calorycount;
    private int password;
    short auth=1;
    
    
    public void setusername(String username)
    {
        this.username=username;
    }
    
    public String getusername()
    {
        return this.username;
    }
    
    public void setfirstname(String firstname)
    {
        this.firstname=firstname;
    }
    
    public String getfirstname()
    {
        return this.firstname;
    }
    
    public void setlastname(String lastname)
    {
        this.lastname=lastname;
    }
    
    public String getlastname()
    {
        return this.lastname;
    }
    
    public void setemail(String email)
    {
        this.email=email;
    }
    
    public String getemail()
    {
        return this.email;
    }
    public void setcalorycount(Double calorycount)
    {
        this.calorycount=calorycount;
    }
    
    public Double getcalorycount()
    {
        return this.calorycount;
    }
    
    public void setpassword(String password)
    {
        this.password=password.hashCode();
    }
    
    public void psword(String pword)
    {
        this.password=pword.hashCode();
    }
    
    public boolean checkpassword(String password)
    {
        return this.password==password.hashCode();
    }
    
    public Boolean setauthlev(Keys key)
    {
        if(key.getauth()<3)
            return false;
        this.auth=2;
        return true;
    }
    public void masterauth()
    {
        this.auth=3;
    }
    
    public short getauthlev()
    {
        return this.auth;
    }
    
    
}
