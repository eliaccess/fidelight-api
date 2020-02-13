<?php
/*  Get the profile of a user
 *  TO DO :
 *      - Nothing at the moment
 *  Made by Elias LIMOUNI
 */

function get_company_public_data($login, $database){
    /*  Function that sends a JSON containing the profile of a person
     *  @login : string that contains the login of the person
     *  @database : Medoo variable that contains connection data of the database
     *  SQL Query :
     *  FROM user, (SELECT name FROM user_type WHERE id IN (SELECT user_type FROM user WHERE user.login=$login)) AS user_type WHERE user.login=$login;
     */
    $datas = $database->select("company",
        [
            "[>]company_type" => ["company_type"=>"id"]
        ],[
            "company.name",
            "company.login",
            "company.phone",
            "company.registration_date",
            "company_type.name (company_type)"
        ], ["login"=>$login]);

    if (!$datas){
        generate_error("This company does not exist.");
    }
    else{
        //Returning a JSON file that contains all the data
        Flight::json($datas);
    }
}