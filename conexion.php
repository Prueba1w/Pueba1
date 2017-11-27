<?php

//Configuracion de la conexion a base de datos
$bd_host = "localhost"; 
$bd_usuario = "root"; 
$bd_password = ""; 
$bd_base = "campos";
$connected = true;
$link = mysql_connect($bd_host, $bd_usuario, $bd_password);
if (!$link){
   $connected = false;
   $array = array(
    "error" => "error_connect",
    "bd_host" => $bd_host,
    "bd_usuario" => $bd_usuario,
    "bd_password" => $bd_password,
    );
    print json_encode($array);
    return;
}
$baseConnected = mysql_select_db($bd_base, $link);
if (!$baseConnected) {
    $connected = false;
    $array = array(
    "error" => "error_base",
    "bd_base" => $bd_base,
    );
    print json_encode($array);
    
}

?>
