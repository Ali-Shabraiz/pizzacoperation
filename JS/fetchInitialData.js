var categoriesData, allItemsData,allSizes,allNullItemsData;

function categoriesJSON(link){
    fetch(link).then((responce) => {
        return responce.json();
    }).then(result => {
        categoriesData = result;
    });
}
function ItemsJSON(link){
    fetch(link).then((responce) => {
        return responce.json();
    }).then(result => {
        allItemsData = result;
    });
}
function ItemsJSONNULL(link){
    fetch(link).then((responce) => {
        return responce.json();
    }).then(result => {
        allNullItemsData = result;
    });
}
function ItemsSizesJSON(link){
    fetch(link).then((responce) => {
        return responce.json();
    }).then(result => {
        allSizes = result;
    });
}
try{
  categoriesJSON("../API/fetch_all_categories.php");
  ItemsJSON("../API/fetch_all_items.php");
  ItemsJSONNULL("../API/fetch_all_null_items.php");
  ItemsSizesJSON("../API/fetch_all_sizes.php");
}
catch(err){
    console.log(err);
}