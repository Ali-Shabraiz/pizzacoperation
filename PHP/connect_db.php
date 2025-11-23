<?php 
$connection = new mysqli('localhost','root','','pizzacoperation')or die("Could not connect to mysql".mysqli_error($con));
if(!$connection){
$connection = new mysqli('151.106.122.2','u694959030_pizzaman','h0Ji25UQ>','u694959030_pizzass')or die("Could not connect to mysql".mysqli_error($con));
}
?>