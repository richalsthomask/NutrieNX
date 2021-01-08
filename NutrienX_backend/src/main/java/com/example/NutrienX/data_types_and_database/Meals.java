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
@Document(collection="Meals")
public class Meals {
    
     
    @Id
    double mealid;
    String username;
    String foodname;
    String note;
    Double calory=0.0;
    Date date;
  
    public void setmealid()
    {
        this.mealid=Math.random()*23456789*Math.random();
    }
    
    public double getmealid()
    {
        return this.mealid;
    }
    
    public void setfoodname(String foodname)
    {
        this.foodname=foodname;
    }
    
    public String getfoodname()
    {
        return this.foodname;
    }
    
    public void putnote(String note)
    {
        this.note=note;
    }
    
    public String getnote()
    {
        return this.note;
    }
    
    public void setcalory(double calory)
    {
        this.calory=calory;
    }
    
    public double getcalory()
    {
        return this.calory;
    }
    
    public void setdate()
    {
        this.date=new Date();
    }
    
    public Date getdate()
    {
        return this.date;
    }
    public void setusername(String username)
    {
        this.username=username;
    }
    public String getusername()
    {
        return this.username;
    }
}
