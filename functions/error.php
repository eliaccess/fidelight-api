<?php
function generate_error($error){
    /*  Function that answers an error in a JSON file
     *  @error : string that contains the message
     */
    $response = array("error" => $error);

    //Send the error in a JSON file
    Flight::json($response);
}