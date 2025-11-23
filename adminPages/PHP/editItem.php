<?php
    // header("Content-type: Application/JSON");
    $itemID = $_POST['itemID'];
    $name = $_POST['editedItemName'];
    $price = $_POST['editedItemPrice'];
    $category = $_POST['categoryList2']; 
    $date = date("j/m/Y H:iA");

    // include 'connect_db.php';
    // $query = "UPDATE `items` SET `Name` = '$name',`Price` = '$price',`Category` = '$category',`Date` = '$date' WHERE `ID` = '$itemID'";
    // $result = mysqli_query($connection, $query) or die("Failed to run Query");
    // mysqli_close($connection);
?>

<?php
include "../../PHP/connect_db.php";
$date = date("j/m/Y H:iA");
// Target directory for image upload
$targetDir = "../assets/img/";
$imagePath = "";

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // $name = $_POST['newItemName'];
    // $category = $_POST['category'];
    // $price = $_POST['Price'];

    // Validate and upload the image
    if (isset($_FILES['editedItemImage']) && $_FILES['editedItemImage']['error'] === UPLOAD_ERR_OK) {
        $tmpName = $_FILES['editedItemImage']['tmp_name'];
        $originalName = basename($_FILES['editedItemImage']['name']);
        $extension = strtolower(pathinfo($originalName, PATHINFO_EXTENSION));
        $allowed = ['jpg', 'jpeg', 'png', 'gif'];

        if (in_array($extension, $allowed)) {
            // Generate unique filename
            $uniqueName = uniqid("img_") . "." . $extension;
            $destination = $targetDir . $uniqueName;

            // Move the uploaded file
            if (move_uploaded_file($tmpName, $destination)) {
                $imagePath = $uniqueName; // Save this to DB
            } else {
                die("Error moving uploaded image.");
            }
        } else {
            die("Invalid image type. Only JPG, JPEG, PNG, GIF allowed.");
        }
    } else {
     $oldImagePath = $_POST['oldImagePath'];
        if($oldImagePath != '' && $oldImagePath != null){
            $imagePath = $oldImagePath;
        }
        else
            die("Image upload failed. Please select a valid image.");
    }

    // Insert into DB using prepared statements
    $stmt = $connection->prepare("UPDATE items SET `Name` = ?, `Price` = ?,`Category`= ?,`Date` = ?, ImagePath = ? WHERE `ID` = '$itemID'");

    if (!$stmt) {
        die("Prepare failed: " . $connection->error);
    }

    $stmt->bind_param("sdsss", $name, $price, $category, $date, $imagePath);

    if ($stmt->execute()) {
        echo "Item added successfully.";
    } else {
        echo "Database error: " . $stmt->error;
    }

    $stmt->close();
    $connection->close();
} else {
    echo "Invalid request.";
}
?>
