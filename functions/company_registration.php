<?php
/*  Manage the creation of a new company
 *  TO DO :
 *      - Verification of the existence of the user
 *      - Verification if the user has at least one paying method
 *      - Verification of the existence of the company
 *      - Verification at the creation of the company by an email confirmation
 *  Made by Elias LIMOUNI
 */

function company_registration_json($json, $database){
    /*  Function that gets the JSON containing a company registration request, decompose it and give it to the registration
     *  function.
     *  @json : JSON file that contains the information about the company that a user want to register
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
        //Verifying optional values in the JSON file
        if(!isset($json->description)){
            $description = null;
        }
        else{
            $description = $json->description;
        }

        if(!isset($json->phone_code)){
            $phone_code = null;
        }
        else{
            $phone_code = $json->phone_code;
        }

        if(!isset($json->phone_number)){
            $phone_number = null;
        }
        else{
            $phone_number = $json->phone_number;
        }

        //verify the necessary values
        if(!isset($json->login) OR $json->login == null){
            generate_error("Login is necessary to create a new account.");
            exit;
        }

        if(!isset($json->birthdate) OR $json->birthdate == null OR validateDate($json->birthdate) == false){
            generate_error("Unexpected date format.");
            exit;
        }

        //Inserting the new user in the DB
        user_registration($json->login, $surname, $name, $json->password, $mail, $json->birthdate, $database);
    }
    else{
        //If the account already exists then sens the error
        generate_error("The login '$json->login' already exists.");
    }
}

function verification_user($login, $password, $database){
    $json = get_user_profile($login, $password, $database);

    if(isset($json->error)){
        generate_error("");
    }
}