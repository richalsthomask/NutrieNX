/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.example.NutrienX.data_types_and_database;


import java.util.Date;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

/**
 *
 * @author richa
 */
@Document(collection="Keys")
public class Keys {
    Date date;
    @Id
    double key;
    short auth=1;
    String username;
    
    public void setdate()
    {
        this.date=new Date();
    }
    
    public Date getdate()
    {
        return this.date;
    }
    
    public void setkey()
    {
        this.key=Math.random()*154763;
    }
    
    public double getkey()
    {
        return this.key;
    }
    public void setauth(short authlevel)
    {
        this.auth=authlevel;
    }
    public short getauth()
    {
        return this.auth;
    }
    public void setusername(String username)
    {
        this.username=username;
    }
    public Boolean checkuser(String username)
    {
        return(this.username==username);
    }
    public String getusername()
    {
        return this.username;
    }
}
