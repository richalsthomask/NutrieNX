/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.example.NutrienX;



import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.example.NutrienX.data_types_and_database.Keys;
import com.example.NutrienX.data_types_and_database.KeysRespository;
import com.example.NutrienX.data_types_and_database.User;
import com.example.NutrienX.data_types_and_database.UserRespository;
import java.util.Map;



/**
 *
 * @author richa
 */
@RestController
@RequestMapping(value="/")
@CrossOrigin
public class homepage {
    
    @Autowired
    private UserRespository userrep;
    @Autowired
    private KeysRespository keysrep;

    @GetMapping("/checkusername")
    public boolean checkusername(@RequestParam String username)
    {
        Optional<User> user=userrep.findById(username);
        return user.isEmpty();
    }
    @PostMapping("/registeruser")
    public String registeruser(@RequestBody Map<String,Object> user,@RequestHeader String psword)
    {
        Optional<User> user1;
       if(psword.equals("")||((String)user.get("username")).equals("")||((String)user.get("email")).equals(""))
            return "username ,password and email are mandatory";
       if(((String)user.get("firstname")).equals("")&&((String)user.get("lastname")).equals(""))
           user.put("firstname",user.get("username"));
        user1=userrep.findById((String)user.get("username"));
        if(user1.isPresent()) return "Username already exists .Operation failed";
        User user2=new User();
        user2.setusername((String)user.get("username"));
        user2.setfirstname((String)user.get("firstname"));
        user2.setlastname((String)user.get("lastname"));
        user2.setemail((String)user.get("email"));
        Double d= new Double((Integer)user.get("calorycount"));
        user2.setcalorycount(d);
        user2.setpassword(psword);
        userrep.save(user2);
        return "Account created";
    }
    
     @PostMapping("/admin/registeradmin")
    public String registeradmin(@RequestHeader Double key1,@RequestParam User user,@RequestHeader String psword)
    {
        Optional<Keys> key;
        key=keysrep.findById(key1);
        if(key.get()==null) return "Please Login to use this function";
        if(!user.setauthlev(key.get()))
            return "you are not authorised to dothis";
        Optional<User> user1=userrep.findById(user.getusername());
        if(user1.isPresent()) 
            return "Username already exists .Operation failed";
        user.psword(psword);
        userrep.save(user);
        return "Added admin : "+user.getusername()+" with level "+user.getauthlev()+" admin privilages";
    }
       
        
          @GetMapping("/login")
    public Double login(@RequestHeader String username,@RequestHeader String password)
    {
        Optional<User> user=userrep.findById(username);
        if(user.isEmpty()) 
            return 0.0;
        if(!user.get().checkpassword(password))
            return 0.0;
        Keys key=new Keys();
        key.setkey();
        key.setusername(username);
        key.setauth(user.get().getauthlev());
        key.setdate();
        keysrep.save(key);
        return key.getkey();
    }
    
    @GetMapping("/checkkey")
    public Boolean checkkey(@RequestHeader String key1)
    {
        
        return key1.equals("undefined");
    }
   
}
