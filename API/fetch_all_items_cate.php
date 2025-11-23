<?php
include "../PHP/connect_db.php";
header('Content-Type: application/json');
$categoriesQuery = "SELECT * FROM categories";
$categoriesResult = mysqli_query($connection, $categoriesQuery);
$output = [];
while ($category = mysqli_fetch_assoc($categoriesResult)) {
    $categoryId = $category['ID'];
    $itemsQuery = "SELECT * FROM `items` WHERE `Category` = '$categoryId'";
    $itemsResult = mysqli_query($connection, $itemsQuery);
    $items = [];
    while ($item = mysqli_fetch_assoc($itemsResult)) {
        $items[] = $item;
    }
    $output[] = [
        "ID" => $category['ID'],
        "Name" => $category['Name'],
        "items" => $items
    ];
}
echo json_encode($output);
mysqli_close($connection);
?>
