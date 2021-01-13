/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.example.NutrienX;

import com.example.NutrienX.data_types_and_database.Keys;
import com.example.NutrienX.data_types_and_database.KeysRespository;
import com.example.NutrienX.data_types_and_database.User;
import com.example.NutrienX.data_types_and_database.UserRespository;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author richa
 */
@RestController
@CrossOrigin
@RequestMapping(value="/user")
public class usercontroller {
    
    @Autowired
    private UserRespository userrep;
    @Autowired
    private KeysRespository keysrep;
    
    
    @GetMapping("/admin/getalluser")
    public List<User> getalluser(@RequestHeader Double key1)
    {
        Optional<Keys> key=keysrep.findById(key1);
        if(!key.isPresent()) 
            return null;
        if(key.get().getauth()<2)
            return null;
        return userrep.findAll();
    }
    
    @GetMapping("/admin/{username}")
    public User getuseradmin(@RequestHeader Double key1,@PathVariable @RequestHeader String username)
    {
        Optional<Keys> key=keysrep.findById(key1);
        if(key.isEmpty()) 
            return null;
        Optional<User> user=userrep.findById(username);
        if(user.isEmpty()) return null;
        if(key.get().getauth()<=user.get().getauthlev())
            return null;
        return user.get();
    }
    
    @DeleteMapping("/deletemyaccount")
    public String deletemyaccount(@RequestHeader Double key1,@RequestHeader String Password)
    {
       Optional<Keys> key = keysrep.findById(key1);
       
       if(key.isEmpty())
           return "you are not logged in";
       
       userrep.deleteById(key.get().getusername());
       keysrep.deleteById(key1);
       
       return "account sucessfully deleted";
    }
    
    @DeleteMapping("/admin/{username}")
    public String admindelete(@RequestHeader Double key1,@PathVariable @RequestHeader String username)
    {
        Optional<Keys> key=keysrep.findById(key1);
        if(key.isEmpty()) 
            return"Please login to use our services";
        Optional<User> user=userrep.findById(username);
        if(user.isEmpty())
            return "username does not exists";
        if(key.get().getauth()<=user.get().getauthlev())
            return "return you are not autharied to do this";
        userrep.deleteById(username);
        return "user sucessfully deleted";
    }
    
    @GetMapping("/update/username")
    public String updateuser(@RequestHeader Double key1,@RequestHeader String username)
    {
        Optional<Keys> key=keysrep.findById(key1);
        if(key.isEmpty()) 
            return "Please login to use our functions";
        User user=userrep.findById(key.get().getusername()).get();
        userrep.deleteById(key.get().getusername());
        user.setusername(username);
        userrep.save(user);
        key.get().setusername(username);
        return "user sucessfully updated with username:"+username;
    }
    
    @GetMapping("/update/calorycount")
    public String updatecalorycount(@RequestHeader Double key1,@RequestParam Double calorycount)
    {
        Optional<Keys> key=keysrep.findById(key1);
        if(key.isEmpty()) 
            return "Please login to use our functions";
        User user=userrep.findById(key.get().getusername()).get();
        userrep.deleteById(key.get().getusername());
        user.setcalorycount(calorycount);
        userrep.save(user);
        return "user sucessfully updated with new calorycount:"+calorycount;
    }
    @GetMapping("/update/firstname")
    public String updatefirstname(@RequestHeader Double key1,@RequestHeader String firstname)
    {
        Optional<Keys> key=keysrep.findById(key1);
        if(key.isEmpty()) 
            return "Please login to use our functions";
        User user=userrep.findById(key.get().getusername()).get();
        userrep.deleteById(key.get().getusername());
        user.setfirstname(firstname);
        userrep.save(user);
        return "user sucessfully updated with new firstname:"+firstname;
    }
    @GetMapping("/update/lastname")
    public String updatelastname(@RequestHeader Double key1,@RequestHeader String lastname)
    {
        Optional<Keys> key=keysrep.findById(key1);
        if(key.isEmpty()) 
            return "Please login to use our functions";
        User user=userrep.findById(key.get().getusername()).get();
        userrep.deleteById(key.get().getusername());
        user.setlastname(lastname);
        userrep.save(user);
        return "user sucessfully updated with new lastname:"+lastname;
    }
    @GetMapping("/update/email")
    public String updateemail(@RequestHeader Double key1,@RequestHeader String email)
    {
        Optional<Keys> key=keysrep.findById(key1);
        if(key.isEmpty()) 
            return "Please login to use our functions";
        User user=userrep.findById(key.get().getusername()).get();
        userrep.deleteById(key.get().getusername());
        user.setemail(email);
        userrep.save(user);
        return "user sucessfully updated with new email:"+email;
    }
  @GetMapping ("/userdetailes")
  public Object userdetailes(@RequestHeader Double key1)
  {
      
      Optional<Keys> key=keysrep.findById(key1);
      if(key.isEmpty()) 
            return null;
      User user=userrep.findById(key.get().getusername()).get();
      return user;
  }
    
        @PutMapping("/master")
	public String masteradd(User user,@RequestHeader String masterpassword,@RequestHeader String pword)
        {
            if(masterpassword.trim().equals("dragon ball for life"))
            {
                Optional<User> user1=userrep.findById(user.getusername());
                if(user1.isPresent()) return "Username already exists .Operation failed";
                user.psword(pword);
                user.masterauth();
                userrep.save(user);
                return "sucessfully added master";
            }
            return "password is incorrect";
            
        }
        
        @PutMapping("/logout")
        public String logout(@RequestHeader Double key1)
        {
            Optional<Keys> key=keysrep.findById(key1);
            if(key.isEmpty())
                return "you are currently not logined";
            keysrep.deleteById(key1);
            return "successfully loged out";
        }
     
}
