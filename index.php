<?php
/*  index.php is used to define routes for the API
 *  To load dependances use the command "composer install" before launching the PHP server
 *  Then start the PHP server
 *  Made by LIMOUNI Elias
 */
//Loading the dependances
require 'vendor/autoload.php';

//Links to redirect to pages
define("WEBSITE_LINK", 'http://localhost:8000/website_link');
define("DOC_LINK", 'http://localhost:8000/documentation_link');

//Defining the database object using Medoo environment
use Medoo\Medoo;
$database = new Medoo([
    'database_type' => 'mysql',
    'database_name' => 'fidelight',
    'server' => 'localhost',
    'username' => 'devsql',
    'password' => 'password',
    'port' => 3306
]);

//Defining routes for the API
Flight::route('/', 'redirect_to_home');
Flight::route('/api/', 'redirect_to_doc');
Flight::route('GET /user/@login', function($login){
    global $database;
    get_user_profile($login, $database);
});
Flight::route('POST /user/', function (){
    global $database;
    $json = file_get_contents('php://input');
    user_registration_json($json, $database);
});

//Starting Flight module to launch the API
Flight::start();