/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.example.NutrienX.data_types_and_database;
import org.springframework.data.mongodb.repository.MongoRepository;

/**
 *
 * @author richa
 */
public interface UserRespository extends MongoRepository<User,String> {
    
}
