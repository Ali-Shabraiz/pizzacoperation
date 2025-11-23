<?php
include "../../PHP/connect_db.php";
$name = $_POST['newCategoryName'];
$size = $_POST['size'];
$date = date("j/m/Y H:iA");
echo $date;
$query = "INSERT INTO `categories`(`Name`, `Size`,`Date`) VALUES ('$name','$size','$date')";
$result = mysqli_query($connection, $query) or die("Failed to run Query");
mysqli_close($connection);
?>