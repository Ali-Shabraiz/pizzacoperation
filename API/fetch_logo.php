<?php
include '../PHP/connect_db.php';

    $sql = "SELECT `imgPath` FROM `logos` ORDER BY `ID` DESC LIMIT 1";
    $result = mysqli_query($connection, $sql) or die("Failed to run Query");

?>