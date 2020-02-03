<?php
/*  Manage the creation of a new user account
 *  TO DO :
 *      - Nothing to add at the moment
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
    //We calculate the age of the person to define his initial user_type
    $age = date_diff(date_create($birthdate), date_create('today'))->y;

    //Now we define the person's user_type

    if($age <= 25){
        //Student
        $type = 2;
    }
    else if ($age >= 65){
        //Senior
        $type = 3;
    }
    else{
        //Default
        $type = 1;
    }

    $data = $database->insert("user", [
        "login" => $login,
        "hash_pwd" => $password,
        "mail" => $mail,
        "registration_date" => date("Y-m-d"),
        "user_type" => $type
    ]);

    //Verify the number of rows affected
    if($data->rowCount() <> 1){
        generate_error($data->errorCode());
    };
}