var maxCat = 5,
    maxItem = 5,
    to, from,
    lastPageBtn,
    maxCatP, maxItemP;

function pageNumbering(length,max,currentPage,element){
    var ShownDetails = document.querySelector('.ShownDetails');
    var currentPageElement = document.querySelector('.NextPreCon span span');
    lastPageBtn = document.querySelector('.lastPageBtn');
    var calc = length / max;
    var totalPages;
    if(totalPages == calc) totalPages = Math.floor(calc) - 1;
    else totalPages = Math.floor(calc) + 1;

    if(currentPage <= 0)   ++currentPage;
    else if(currentPage > totalPages)  --currentPage;
    lastPageBtn.innerText = totalPages;
    from = (currentPage - 1) * max;
    to = currentPage * max;
    if(length <= to){
    var uncer = to - length;
    to -= uncer;
    }
    ShownDetails.innerText = `Showing ${from+1} to ${to} of ${length} entries`;
    currentPageElement.innerText = currentPage;
    eval(element+'=totalPages');
}

function displayCategories(data, currentPage){
    var categorytable = document.querySelector('#categorytable');
    categorytable.innerHTML = `<tr><th>#</th><th>Name</th><th>Action</th></tr>`;
    var TotalCateries = data.length;
    pageNumbering(TotalCateries,maxCat,currentPage,'maxCatP');
    for(var i=from;i< to;i++){
    var tr = document.createElement('tr');
    tr.innerHTML = `<td>${data[i].ID}</td><td>${data[i].Name}</td><td>
    <button onclick="showPopUp('#editBox',this.value,'#newCategoryID',1)" value="${data[i].ID}">Edit</button>
    <button onclick="showPopUp('#deleteBox',this.value,'#conformDeleteID',null)" value="${data[i].ID}">Delete</button>
    </td>`;
    categorytable.appendChild(tr); 
    }
}
function displayItems(data, currentPage){
    console.log(data);
    var data = data.filter(item => item.Category != null && item.Category != '');
    var itemstable = document.querySelector('#itemstable');
    itemstable.innerHTML = `<tr><th>#</th><th>Name</th><th>Category</th><th>Price</th><th>Action</th></tr>`;
    var TotalItems = data.length;
    pageNumbering(TotalItems,maxItem,currentPage,'maxItemP');
    for(var i=from;i< to;i++){
    var tr = document.createElement('tr');
    tr.innerHTML = `<td>${data[i].ID}</td><td>${data[i].Name}</td><td>${findSomethingByValue(categoriesData,data[i].Category,'ID').Name}</td><td>${data[i].Price}</td><td>
    <button onclick="showPopUp('#editBox',this.value,'#itemID',0)" value="${data[i].ID}">Edit</button>
    <button onclick="showPopUp('#deleteBox',this.value,'#conformDeleteID',2)" value="${data[i].ID}">Delete</button></td>`;
    itemstable.appendChild(tr);
    }
}
function displayCategories2(){
    var categoriesList = document.getElementById('categoriesList');
    var categoriesList2 = document.getElementById('categoriesList2');
    for(var i=0;i<categoriesData.length;i++){
        var option = document.createElement('option');
        option.innerText = categoriesData[i].Name;
        option.value = categoriesData[i].ID;
        categoriesList.appendChild(option);
    }
    categoriesList2.innerHTML = categoriesList.innerHTML;
}

function fetch_categories(){
    fetch("../API/fetch_all_categories.php").then((responce) => {
        return responce.json();
    }).then(result => {
    categoriesData = result;
    displayCategories(result,currentCategoryPageNum);

    });
}
fetch_categories();
function fetch_items(){
    fetch("../API/fetch_all_items.php").then((responce) => {
        return responce.json();
    }).then(result => {
    allItemsData = result;
    displayItems(result,currentItemPageNum);
    displayItems2(result);
    });
}
function fetch_null_items(){
    fetch("../API/fetch_all_null_items.php").then((responce) => {
        return responce.json();
    }).then(result => {
    allItemsData = result;
    displayItems(result,currentItemPageNum);
    displayItemsNull(result);
    });
}


function add_category(){
    var processDone = document.getElementById("processDone");
    var form = document.querySelector(`#addCategoryForm`);
    var formData = new FormData(form);
     fetch("PHP/inputCategory.php", {
    method: "POST",
    body: formData
  })
  .then(response => response.text())
  .then(data => {
            processDone.innerText = 'Category Saved Successfully';
           processDone.classList.add('success');
           removeIt(processDone,'success');
            fetch_categories();
  })
  .catch(error => {
    console.error("Error:", error);
  });

}
function edit_category(){
    var processDone = document.getElementById("processDone");
    $.ajax({
        url: 'PHP/editCategory.php',
        method: 'POST',
        data: $('#editcategoryForm').serialize(),
        success: data => {
           processDone.innerText = 'Category Edited Successfully';
           processDone.classList.add('success');
           removeIt(processDone,'success');
            fetch_categories();
        }
    });
}
function conformDeleteCategory(){
     $.ajax({
        url: 'PHP/deleteCategory.php',
        method: 'POST',
        data: $('#deletecategoryForm').serialize(),
        success: data => {
           processDone.innerText = 'Category Deleted Successfully';
           processDone.classList.add('success');
           removeIt(processDone,'success');
            fetch_categories();
            fetch_items();
        }
    });
}
function conformDeleteItem(){
     $.ajax({
        url: 'PHP/deleteItem.php',
        method: 'POST',
        data: $('#deleteitemForm').serialize(),
        success: data => {
           processDone.innerText = 'Item Deleted Successfully';
           processDone.classList.add('success');
           removeIt(processDone,'success');
            fetch_items();
            console.log(data);
        }
    });
}
function add_item(event) {
    var processDone = document.getElementById("processDone");
    let form = document.getElementById('addItemForm');
    let formData = new FormData(form);
    $.ajax({
        url: 'PHP/inputItems.php',
        method: 'POST',
        data: formData,
        processData: false, // Important for file upload
        contentType: false, // Important for file upload
        success: data => {
            processDone.innerText = 'Item Added Successfully';
           processDone.classList.add('success');
           removeIt(processDone,'success');

            fetch_items();
        },
        error: err => {
            console.error('Upload error:', err);
        }
    });
}
function uploadLogo(){
var processDone = document.getElementById("processDone");
    let form = document.getElementById('uploadLogoForm');
    let formData = new FormData(form);
    $.ajax({
        url: 'PHP/uploadingLogo.php',
        method: 'POST',
        data: formData,
        processData: false, // Important for file upload
        contentType: false, // Important for file upload
        success: data => {
            processDone.innerText = 'Updated Successfully';
           processDone.classList.add('success');
           removeIt(processDone,'success');

            // fetch_logo();
        },
        error: err => {
            console.error('Upload error:', err);
        }
    });
}

function edit_item(){
    var processDone = document.getElementById("processDone");

    let form = document.getElementById('editItemForm');
    let formData = new FormData(form);
    $.ajax({
        url: 'PHP/editItem.php',
        method: 'POST',
        data: formData,
        processData: false, // Important for file upload
        contentType: false, // Important for file upload
        success: data => {
            processDone.innerText = 'Item edited Successfully';
           processDone.classList.add('success');
           removeIt(processDone,'success');
           console.log(data)

            fetch_items();
        },
        error: err => {
            console.error('Upload error:', err);
        }
    });

}
function displayItemsNull(data,element){
    var TotalItems = data.length;
    // pageNumbering(TotalItems,maxItem,currentPage,'maxItemP');
    for(var i=0;i< TotalItems;i++){
    var card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `<span class="id">${data[i].ID}</span>
        <img src="assets/img/${data[i].ImagePath}" alt="">
        <h3>${data[i].Name}</h3>
        <span>Price:- ${data[i].Price} Rs</span>
        <div class="btns">
            <button class="fbtn" onclick="showPopUp('#editBox',this.value,'#itemID',0)" value="${data[i].ID}">Edit</button>
            <button value="${data[i].ID}" onclick="showPopUp('#deleteBox',this.value,'#conformDeleteID',2)">Delete</button>
        </div>`;
    element.appendChild(card);
    }
}
function displayItems2(data){
    var nullItems = data.filter(item => item.Category == null || item.Category == '');
    var items = data.filter(item => item.Category != null && item.Category != '');
    var itemsContainer = document.querySelector('.items');
    var TotalItems = items.length;
    itemsContainer.innerHTML = '';
    // pageNumbering(TotalItems,maxItem,currentPage,'maxItemP');
    for(var i=0;i< TotalItems;i++){
    var card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `<span class="id">${items[i].ID}</span>
        <img src="assets/img/${items[i].ImagePath}" alt="">
        <h3>${items[i].Name}</h3>
        <span>Category:- ${findSomethingByValue(categoriesData,items[i].Category,'ID').Name}</span>
        <span>Price:- ${items[i].Price} Rs</span>
        <div class="btns">
            <button class="fbtn" onclick="showPopUp('#editBox',this.value,'#itemID',0)" value="${items[i].ID}">Edit</button>
            <button value="${items[i].ID}" onclick="showPopUp('#deleteBox',this.value,'#conformDeleteID',2)">Delete</button>
        </div>`;
    itemsContainer.appendChild(card);
    }
    var nullItemsContainer = document.createElement(`div`);
    nullItemsContainer.classList.add(`items`);
    itemsContainer.append(nullItemsContainer);
    nullItemsContainer.innerHTML = `<h1 style="width: 100%;">Un-Categorized Items</h1>`
    displayItemsNull(nullItems,nullItemsContainer);
}

function showPopUp(element,val,btn,functionNumber){
    document.querySelector(element).classList.add('active');
    document.querySelector(btn).value = val;
    switch(functionNumber){
        case 0 : getItemEditValues(val);
        break;
        case 1: getCategoryEditValues(val);
        break;
        case 2: getItemDeleteValues(val);
        break;
    }
    
    
}
function hidePopUp(element){
    document.querySelector(element).classList.remove('active');
}

function searchSomething(data,value,functionname,pageNum){
    var filteredData = data.filter(item => item.Name.toLowerCase().includes(value.toLowerCase()));
        eval(`${functionname}(filteredData,${pageNum})`);

}
function removeIt(element,className){
    element.classList.add('remove');
    setTimeout(() => {
    element.innerText = '';
    element.classList.remove(className);
    element.classList.remove('remove');
    }, 5000);
}
function getItemEditValues(value){
    var editedItemName = document.getElementById("editedItemName");
    var editedItemPrice = document.getElementById("editedItemPrice");
    var editedImgName = document.getElementById("editedImgName");
    var itemDetail = searchSomethingByValue(allItemsData,value,'ID');
    editedItemName.value = itemDetail[0].Name;
    editedItemPrice.value = itemDetail[0].Price;
    editedImgName.value = itemDetail[0].ImagePath;
    selectOne("#categoriesList2",itemDetail[0].Category);
}
function getItemDeleteValues(value){
    document.querySelector('#conformDeleteID').value = value;
}
function getCategoryEditValues(value){
    var editedcategoryName = document.getElementById("editedCategoryName");
    // var editedcategorySize = document.getElementById("editedCategorySize");
    var itemDetail = searchSomethingByValue(categoriesData,value,'ID');
    editedcategoryName.value = itemDetail[0].Name;
    selectOne("#editedCategorySize",itemDetail[0].Size);
    console.log(`asd`);
}
function searchSomethingByValue(data,value,propertyName){
    return data.filter(item => eval(`item.${propertyName}`) == value);
}
function findSomethingByValue(data,value,propertyName){
    return data.find(item => eval(`item.${propertyName}`) == value);
}
function selectOne(selectElement,value){
    var options = document.querySelectorAll(`${selectElement} option`);
    console.log(options.length)
    for(var i=0;i<options.length;i++){
        if(options[i].value == value){
            options[i].setAttribute('selected','');
            break;
        }
    }

}

function getSizeById(value){
    return categoriesData.find(category => category.ID == value).Size - 1;
}

function showSizeSelect(value){
   var sizes = eval(allSizes[getSizeById(value)].Details);
        document.getElementById('itemSizeSelect').innerHTML = '';
    for(var i=0;i<sizes.length;i++){
        var option = document.createElement('option');
        option.value = i;
        option.innerText = sizes[i];
        document.getElementById('itemSizeSelect').appendChild(option);
    }

}