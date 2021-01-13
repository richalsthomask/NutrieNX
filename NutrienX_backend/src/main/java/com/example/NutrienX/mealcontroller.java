/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.example.NutrienX;

import com.example.NutrienX.data_types_and_database.Keys;
import com.example.NutrienX.data_types_and_database.KeysRespository;
import com.example.NutrienX.data_types_and_database.MealRepository;
import com.example.NutrienX.data_types_and_database.Meals;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.example.NutrienX.smallutilities.Nutritionix;
import java.util.Date;
import java.util.Map;
import java.text.SimpleDateFormat;
import java.text.ParseException;

/**
 *
 * @author richa
 */
@RestController
@CrossOrigin
@RequestMapping("/meal")
public class mealcontroller {
    
    @Autowired
    private MealRepository mealrep;
    @Autowired
    private KeysRespository keysrep;
   
        
    @PostMapping("/post")
    public String postmeal( @RequestHeader Double key1,@RequestHeader Double calory ,@RequestBody Map<String,Object> details)
    {
      Optional<Keys> key = keysrep.findById(key1);
        if(key.isEmpty()) 
            return "Please login to use our functions";
        Meals meal=new Meals();
        meal.setfoodname((String)details.get("foodname"));
        meal.setdate();
        meal.setmealid();
        meal.putnote((String)details.get("note"));
        meal.setcalory(calory);
        if(meal.getcalory() == 0.0)
        {
            Nutritionix obj = new Nutritionix();
            meal.setcalory(obj.getCaloryfromweb(meal.getfoodname()));
        }
   
        meal.setusername(key.get().getusername());
        mealrep.save(meal);
     
         return "meal added with id : "+meal.getmealid()+" is added."; 
    }
    
    @PostMapping("/gethistory")
    public List<Meals> gethistory(@RequestHeader Double key1,@RequestBody Map<String,Object> date) throws ParseException 
    {
        Optional<Keys> key=keysrep.findById(key1);
        if(key.isEmpty()) 
            return null;
        SimpleDateFormat ymd=new SimpleDateFormat("dd/MM/yyyy");
        Date date1=ymd.parse(""+date.get("day")+"/"+((Integer)date.get("month")+1)+"/"+date.get("year"));
        String username=key.get().getusername();
        return mealrep.findAll().stream().filter((x->x.getusername().equals(username)&&datechecker(x.getdate(),date1))).collect(Collectors.toList());
    }
    
    @GetMapping("/getcalory")
    public Double getcalory(@RequestHeader Double key1)
    {
         Optional<Keys> key=keysrep.findById(key1);
        if(key.isEmpty()) 
            return null;
        Date date=new Date();
        Double cal=0.0;
        String username=key.get().getusername();
       List<Meals> meals= mealrep.findAll().stream().filter((x->x.getusername().equals(username)&&datechecker(x.getdate(),date))).collect(Collectors.toList());
       for(Meals i:meals)
           cal+=i.getcalory();
       return cal;
    }
   
    private Boolean datechecker(Date date1,Date date2)
    {
        SimpleDateFormat ymd = new SimpleDateFormat("dd/MM/yyyy");
        String d1=ymd.format(date1);
        String d2=ymd.format(date2);
        return (d1.equals(d2));
    }
    @GetMapping("/getall")
    public List<Meals> getall(@RequestHeader Double key1)
    {
        Optional<Keys> key=keysrep.findById(key1);
        if(key.isEmpty())
            return null;
        if(key.get().getauth()<2)
            return null;
        return mealrep.findAll();
    }
    
    
    @DeleteMapping("/delete")
    public String deletemeal(@RequestHeader Double key1,@RequestHeader Double mealid)
    {
        Optional<Meals> meal=mealrep.findById(mealid);
        Optional<Keys> key=keysrep.findById(key1);
        if(meal.isEmpty()) 
            return "meal id is not found";
        if(key.get().getauth()<2&&!key.get().getusername().equals(meal.get().getusername()))
            return "you are not authorised to do this";
        mealrep.deleteById(mealid);
        return "meal information with id : "+mealid+" is sucessfully deleted";
    }
    
    @PutMapping("/updatename")
    public String updatename(@RequestHeader Double key1,@RequestHeader Double mealid,@RequestParam String name)
    {
        Optional<Keys> key=keysrep.findById(key1);
        if(key.isEmpty()) 
            return "Please login to use our functions";
        Optional<Meals> meal=mealrep.findById(mealid);
        if(meal.isEmpty()) 
            return "meal id is not found";
        if(!key.get().getusername().equals(meal.get().getusername()))
            return "you are not authorised to do this";
        meal.get().setfoodname(name);
        Nutritionix obj=new Nutritionix();
        meal.get().setcalory(obj.getCaloryfromweb(meal.get().getfoodname()));
        mealrep.deleteById(mealid);
        mealrep.save(meal.get());
        return "meal update is sucessfull";
    }
    
    @PutMapping("/updatenote")
    public String updatenote(@RequestHeader Double key1,@RequestHeader Double mealid,@RequestParam String note)
    {
        Optional<Keys> key=keysrep.findById(key1);
        if(key.isEmpty()) 
            return "Please login to use our functions";
        Optional<Meals> meal=mealrep.findById(mealid);
        if(meal.isEmpty()) 
            return "meal id is not found";
        if(!key.get().getusername().equals(meal.get().getusername()))
            return "you are not authorised to do this";
        meal.get().putnote(note);
        mealrep.deleteById(mealid);
        mealrep.save(meal.get());
        return "meal update is sucessfull";
        
    }
    
}
