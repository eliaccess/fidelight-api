<?php

function redirect($link){
    /* Function made to redirect a request to another page permanently (301)
     * @link : string containing the link to the target
     */

    header("Status: 301 Moved Permanently", false, 301);
    header("Location: $link");
    exit();
}

function redirect_to_home(){
    /* Function made to redirect a request to the website home page
     * It uses the constant declared in another page that contains the link
     */

    redirect(WEBSITE_LINK);
}

function redirect_to_doc(){
    /* Function made to redirect a request to the documentation page of the API
     * It uses the constant declared in another page that contains the link
     */
    redirect(DOC_LINK);
}