<?php
/*  index.php is used to define routes for the API
 *  To load dependances use the command "composer install" before launching the PHP server
 *  Then start the PHP server
 *  Made by LIMOUNI Elias
 */
//Loading the dependances
require 'vendor/autoload.php';

//Links to redirect to pages
define("WEBSITE_LINK", 'http://dev.fidelight.fr:42795');
define("DOC_LINK", 'http://dev.fidelight.fr:42795/doc');

//Defining the database object using Medoo environment
use Medoo\Medoo;
$database = new Medoo([
    'database_type' => 'mysql',
    'database_name' => 'fidelight',
    'server' => 'localhost',
    'username' => 'root',
    'password' => 'jEbINuuup152*',
    'port' => 3306
]);

//Defining routes for the API
//Redirection routes
Flight::route('/', 'redirect_to_home');
Flight::route('/doc/', 'redirect_to_doc');

//User information routes
Flight::route('GET /user/@login', function($login){
    //Including the database variable
    global $database;

    //Read the headers that are received.
    $headers = getallheaders();
    //The field "Password" contains the password of the user. Verification if it's given.
    if(!isset($headers['Password'])){
        //If not set we send an error
        generate_error("No password given in parameter.");
    }
    else{
        //If set, then we try to get his profile
        get_user_profile($login, $headers['Password'], $database);
    }
});
Flight::route('POST /user/', function (){
    //Including the database variable
    global $database;

    $json = file_get_contents('php://input');
    user_registration_json($json, $database);
});

//Company information routes
Flight::route('GET /company/public/@login', function($login){
    global $database;
    //We now get the public data of the company
    get_company_public_data($login, $database);
});

//Company types list
Flight::route('GET /company/type/', function(){
    //Including the database variable
    global $database;

    //List all the company types
    get_company_types($database);
});

//Starting Flight module to launch the API
Flight::start();
