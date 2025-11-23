<?php
    header("Content-type: Application/JSON");
    $ID = $_POST['deleteID'];
    include 'connect_db.php';
    $query = "DELETE FROM `items` WHERE `ID` = '$ID'";
    $result = mysqli_query($connection, $query) or die("Failed to run Query");
    mysqli_close($connection);
    echo 'Deleted';
?>