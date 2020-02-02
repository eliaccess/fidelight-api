<?php
/*  Get the profile of a user
 *  TO DO :
 *      - Verify the identity of the person asking for these information
 *  Made by Elias LIMOUNI
 */

function get_user_profile($login, $database){
    /*  Function that sends a JSON containing the profile of a person
     *  @login : string that contains the login of the person
     *  @database : Medoo variable that contains connection data of the database
     *  SQL Query :
     *  FROM user, (SELECT name FROM user_type WHERE id IN (SELECT user_type FROM user WHERE user.login=$login)) AS user_type WHERE user.login=$login;
     */
    $datas = $database->select("user",
        [
            "[>]user_type" => ["user_type"=>"id"]
        ],[
            "user.surname",
            "user.name",
            "user.login",
            "user.mail",
            "user.registration_date",
            "user_type.name (user_type)"
        ], ["login"=>$login]);

    //Returning a JSON file that contains all the data
    Flight::json($datas);
}