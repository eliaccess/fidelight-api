#API of FideLight
This repository is reserved for the api architecture data, its generation and its maintenance.
##Content of the repository
This repository contains all the data related to the database :

* The API index that sets the routes and starts the system
* The dependances files (***composer.json*** and ***composer.lock***)
* The documentation pages to use the API
##Documentation of the API
Click [here]() to see the API documentation.
##Installation, dependances and starting
Start by cloning the repository :
```bash
$ git clone url_of_the_repository 
```
To load the dependances, use composer with this command in the repository folder :
```bash
$ composer install 
```
It will load all the dependances in the **vendor** folder.
All the dependances will be loaded by the ***index.php*** with this line :
```php
require 'vendor/autoload.php';
```
Then you can start the PHP server. For a dev instance you can use this command :
```bash
$ php -S ip:port
```
##How to add a route
The API uses the micro-framework **[Flight](http://flightphp.com/)** to manage routes.
All the routes are defined in ***index.php***.
To create a new route, just add this line to the file :
```php
Flight::route('METHOD /place/here/your/route', 'name_of_the_target_function');
```
Then, create a file ***your_route.php*** and place it in the **functions** folder.
Create the functions you need, and save it in an array. Use this function to return the result in a **JSON** file :
```php
Flight::json($data);
```
The client will now receive a JSON that contains *$data* when going on the route */place/here/your/route*.