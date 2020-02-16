<?php
/*  Get the profile of a user
 *  TO DO :
 *      - Nothing at the moment
 *  Made by Elias LIMOUNI
 */

function get_company_public_data($login, $database)
{
    /*  Function that sends a JSON containing the profile of a person
     *  @login : string that contains the login of the person
     *  @database : Medoo variable that contains connection data of the database
     *  SQL Query :
     *  FROM user, (SELECT name FROM user_type WHERE id IN (SELECT user_type FROM user WHERE user.login=$login)) AS user_type WHERE user.login=$login;
     */
    $datas = $database->select("company",
        [
            "[>]company_type" => ["company_type" => "id"]
        ], [
            "company.id",
            "company.name",
            "company.login",
            "company.description",
            "company.phone_number",
            "company.phone_code",
            "company.registration_date",
            "company.background_picture",
            "company_type.name (company_type)"
        ], ["company.login" => $login]);

    if (!$datas){
        generate_error("This company does not exist.");
    }
    else{
        $id = $datas[0]['id'];
        //Get all the locations of a selected company
        $locations = $database->select("company_location",
            [
                "[>]company" => ["company" => "id"]
            ], [
                "company_location.id",
                "company_location.phone_number",
                "company_location.phone_code",
                "company_location.gps_coordinates",
                "company_location.street_number",
                "company_location.street",
                "company_location.city",
                "company_location.country"
            ], [
                "company_location.company" => $id
            ]);

        //Creation of a new array to manage the links of the pictures of each location and rewriting it
        $new_array=array();
        foreach($locations as $key => $value){

            //Get all the links of the pictures of a location
            $picture = $database->select("company_location_picture",[
                "company_location_picture.picture_link"
            ],
                [
                    "company_location" => $value['id']
                ]);

            //Remove the id from the request
            unset($locations[$key]['id']);

            //creating a temp_array
            $temp_array = array();
            foreach($picture as $key_picture => $link){
                $temp_array[$key_picture+1] = $link['picture_link'];
            }

            //Add all the pictures of the location in the array
            $new_array[$key+1]=array("location_information" => $locations[$key], "list_pictures" => $temp_array);
        }

        //Remove the id from the company information
        unset($datas[0]['id']);
        //Add the adress to the company information and the pictures
        $full_datas = array("company_information" => $datas[0], "all_locations" => $new_array);
        //Returning a JSON file that contains all the data
        Flight::json($full_datas);
    }
}