<?php
    header("Content-type: Application/JSON");
    include "../PHP/connect_db.php";
    $query = "SELECT * FROM `items` WHERE `Category` IS  NULL OR `Category` = ''";
    $result = mysqli_query($connection, $query) or die("Failed to run Query");
    $assoc = mysqli_fetch_all($result,MYSQLI_ASSOC);
    echo json_encode($assoc);
    mysqli_close($connection); 
?>