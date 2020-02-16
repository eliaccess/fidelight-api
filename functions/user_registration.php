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
        //Verifying optionnal values in the JSON file
        if(!isset($json->surname)){
            $surname = null;
        }
        else{
            $surname = $json->surname;
        }

        if(!isset($json->name)){
            $name = null;
        }
        else{
            $name = $json->name;
        }

        //Inserting the new user in the DB
        user_registration($json->login, $surname, $name, $json->password, $json->mail, $json->birthdate, $database);
    }
    else{
        //If the account already exists then sens the error
        generate_error("The login '$json->login' already exists.");
    }
}

function user_registration($login, $surname, $name, $password, $mail, $birthdate, $database){
    /*  Function that creates a new user in the database using his information passed in parameter.
     *  @login : string that contains the user's login
     *  @password : string that contains the user's password
     *  @mail : string that contains the user's e-mail adress
     *  @birthdate : date type variable that contains the user's date of birth
     *  @database : Medoo variable that contains connection data of the database
     */
    //Generation of the salt
    $salt = bin2hex(random_bytes(15));
    //Verifying the length of the salt, if needed we resize it
    if(strlen($salt)>30){
        $salt = substr($salt, 0, 30);
    }
    //Generation of the hashed password using a concatenation of the password and the salt hashed with sha512
    $secure = $password.$salt;
    $hashed = hash("sha512", $secure);

    //We calculate the age of the person to define his initial user_type
    $age = date_diff(date_create($birthdate), date_create('today'))->y;
    //Now we define the user's user_type
    $type = null;

    if($age != null){
        if($age <= 25){
            //Young people
            $type = get_id_from_user_type("Jeune", $database);
        }
        else if ($age >= 65){
            //Senior
            $type = get_id_from_user_type("Senior", $database);
        }
        else{
            //Default
            $type = get_id_from_user_type("Normal", $database);
        }
    }

    $data = $database->insert("user", [
        "id" => null,
        "surname" => $surname,
        "name" => $name,
        "login" => $login,
        "hash_pwd" => $hashed,
        "salt" =>$salt,
        "mail" => $mail,
        "registration_date" => date("Y-m-d"),
        "birthdate" => $birthdate,
        "user_type" => $type
    ]);

    //Verify the number of rows affected
    if($data->rowCount() <> 1){
        generate_error($data->errorInfo());
    }
}

function get_id_from_user_type($name, $database){
    /*  Gets the id of a user_type depending on its name
     *  @name : string that contains the user_type's name
     *  @database : Medoo variable that contains connection data of the database
     */
    $datas = $database->select("user_type",
        ["id"],
        ["name"=>$name]);

    return $datas[0]['id'];
}