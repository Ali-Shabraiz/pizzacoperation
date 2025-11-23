<?php
    header("Content-type: Application/JSON");
    $itemID = $_POST['newCategoryID'];
    $name = $_POST['editedCategoryName'];
    $size = $_POST['editedCategorySize'];
    $date = date("j/m/Y H:iA");
    include 'connect_db.php';
    $query = "UPDATE `categories` SET `Name` = '$name',`Size` = '$size',`Date` = '$date' WHERE `ID` = '$itemID'";
    $result = mysqli_query($connection, $query) or die("Failed to run Query");
    mysqli_close($connection);


?>