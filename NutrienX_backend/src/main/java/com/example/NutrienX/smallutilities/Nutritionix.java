/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.example.NutrienX.smallutilities;


import io.restassured.RestAssured;
import kong.unirest.Unirest;
import org.apache.coyote.Response;





/**
 *
 * @author richa
 */
public class Nutritionix {
    
    public double getCaloryfromweb(String foodName) {
        
        

        kong.unirest.HttpResponse<String> response = Unirest.post("https://trackapi.nutritionix.com/v2/natural/nutrients")
                                                            .header("x-app-id", "c1be1f98")
                                                            .header("x-app-key", "d8bb0849c4ae4eda4d8e061897d1dc1d")
                                                            .header("Content-Type", "application/json")
                                                            .body("{\n\t\"query\":\""+foodName+"\"\n}")
                                                            .asString();

        String data = response.getBody();
        data = data.substring(data.indexOf("nf_calories"));

	return Double.valueOf(data.split(",")[0].split(":")[1]);


	}
}
