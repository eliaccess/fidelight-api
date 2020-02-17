<?php
/*  List all company types
 *  TO DO :
 *      - Nothing at the moment
 *  Made by Elias LIMOUNI
 */

function get_company_types($database){
    /*  Function that sends a JSON containing the list of company types
     *  @database : Medoo variable that contains connection data of the database
     */
    $datas = $database->select("company_type",[
            "company_type.id",
            "company_type.name",
            "company_type.description"]
    );

    if (!$datas){
        generate_error("No company types found.");
    }
    else{
        //Returning a JSON file that contains all the data
        Flight::json($datas);
    }
}