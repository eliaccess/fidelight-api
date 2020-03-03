<?php
/*  List all company types
 *  TO DO :
 *      - Nothing at the moment
 *  Made by Elias LIMOUNI
 */

function get_user_types($database){
    /*  Function that sends a JSON containing the list of company types
     *  @database : Medoo variable that contains connection data of the database
     */
    $datas = $database->select("user_type",[
            "user_type.id",
            "user_type.name",
            "user_type.description"]
    );

    if (!$datas){
        generate_error("No user type found.");
    }
    else{
        //Returning a JSON file that contains all the data
        Flight::json($datas);
    }
}