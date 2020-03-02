<?php
/*  Get the profile of a user
 *  TO DO :
 *      - Nothing at the moment
 *  Made by Elias LIMOUNI
 */

function get_user_profile($login, $password, $database){
    /*  Function that sends a JSON containing the profile of a person
     *  @login : string that contains the login of the person
     *  @database : Medoo variable that contains connection data of the database
     *  SQL Query :
     *  FROM user, (SELECT name FROM user_type WHERE id IN (SELECT user_type FROM user WHERE user.login=$login)) AS user_type WHERE user.login=$login;
     */
    //Verify the password
    $password = get_hash_pwd($login, $password, $database);

    //get the data
    $datas = $database->select("user",
        [
            "[>]user_type" => ["user_type"=>"id"]
        ],[
            "user.surname",
            "user.name",
            "user.login",
            "user.mail",
            "user.registration_date",
            "user.birthdate",
            "user_type.name (user_type)"
        ], ["login"=>$login, "hash_pwd" => $password]);

    if(!$datas){
        generate_error("Login and password do not match.");
        exit();
    }
    else{
        //Returning a JSON file that contains all the data
        Flight::json($datas);
    }
}

function get_hash_pwd($login, $password, $database){
    /*  Gets the hashed version of the password the user entered using the salt saved in the database
     *  @password : string that contains the user's password
     *  @database : Medoo variable that contains connection data of the database
     */
    //Getting the salt saved in the database
    $datas = $database->select("user",
        ["salt"],
        ["login"=>$login]);

    if($datas == null){
        return null;
    }

    //Concat the password and the salt
    $hashed = $password.$datas[0]['salt'];
    //Hashing the new string
    $hashed = hash("sha512", $hashed);
    return $hashed;
}