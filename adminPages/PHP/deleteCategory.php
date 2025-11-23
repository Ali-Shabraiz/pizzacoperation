<?php
    header("Content-type: Application/JSON");
    $ID = $_POST['deleteID'];
    include 'connect_db.php';
    $query = "DELETE FROM `categories` WHERE `ID` = '$ID'";
    $result = mysqli_query($connection, $query) or die("Failed to run Query");
    $query = "UPDATE `items` SET `Category` = NULL WHERE `Category` = '$ID'";
    $result = mysqli_query($connection, $query) or die("Failed to run Query");
    mysqli_close($connection);
?>