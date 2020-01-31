<?php
/*  index.php is used to define routes for the API
 *  To load dependances use the command "composer install" before launching the PHP server
 *  Then start the PHP server
 *  Made by LIMOUNI Elias
 */

//Loading the dependances
require 'vendor/autoload.php';

//Links to redirect to pages
define(WEBSITE_LINK ,'http://localhost:8000/api/users');
define(DOC_LINK, 'documentation_link');

//Defining routes for the API
Flight::route('/', 'redirect_to_home');
Flight::route('/api/', 'redirect_to_doc');

//Starting Flight module to launch the API
Flight::start();