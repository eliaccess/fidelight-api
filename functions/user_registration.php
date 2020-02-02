<?php
/*  Manage the creation of a new user account
 *  TO DO :
 *      - Add the management of the user_types
 *  Made by Elias LIMOUNI
 */

function user_registration_json($json, $database){
    /*  Function that gets the JSON containing a user registration request, decompose it and give it to the registration
     *  function.
     *  @json : JSON file that contains the information about the user who wants to register
     *  @database : Medoo variable that contains connection data of the database
     */
    $json = json_decode($json);

    //Verify the existence of a user using the same login
    $datas = $database->select("user",[
            "user.id"
        ], [
            "login"=>$json->login
        ]);


    if (!$datas){
        //Inserting the new user in the DB
        user_registration($json->login, $json->password, $json->mail, $json->birthdate, $database);
    }
    else{
        //If the account already exists then sens the error
        generate_error("The login '$json->login' already exists.");
    }
}

function user_registration($login, $password, $mail, $birthdate, $database){
    /*  Function that creates a new user in the database using his information passed in parameter.
     *  @login : string that contains the user's login
     *  @password : string that contains the user's password
     *  @mail : string that contains the user's e-mail adress
     *  @birthdate : date type variable that contains the user's date of birth
     *  @database : Medoo variable that contains connection data of the database
     */
    //echo date("Y-m-d")."  ".$login."  ".$password."  ".$mail."  ".$birthdate;
    $data = $database->insert("user", [
        "login" => $login,
        "hash_pwd" => $password,
        "mail" => $mail,
        "registration_date" => date("Y-m-d"),
        "user_type" => 1
    ]);

    //Verify the number of rows affected
    if($data->rowCount() <> 1){
        echo $data->errorCode();
    };
}