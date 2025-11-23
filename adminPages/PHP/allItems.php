<form id="addItemForm" onsubmit="add_item()" enctype="multipart/form-data">
    <h1>Add-Item</h1>
    <input type="text" name="newItemName" placeholder="Enter Item..." required>
    <input type="number" min="0" name="Price" placeholder="Enter Price" required>
    <select name="category" id="categoriesList" onchange="showSizeSelect(this.value)">
        <option value="0">Select Category</option>
    </select>
    <select name="itemSize" id="itemSizeSelect">
        <option value="0">Select Size</option>
    </select>
    <input type="file" name="itemImage" accept="image/*" required>
    <button type="submit">Add</button>
</form>

<div id="responde"></div>
<div class="form" name="tableForm">
<h1>Items</h1>
    <div class="searchControls">
        <div class="numberEntries">Show 
            <select onchange="maxItem = Number(this.value);displayItems(allItemsData,1)">
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
            <option  id="allNumberEntriesItems">All</option>
        </select> Entries
    </div>
    <input  type="search" name="" id="" placeholder="Search Here..."  oninput="searchSomething(allItemsData,this.value,'displayItems',currentItemPageNum)">

    </div>
    <table border="1" id="itemstable" style="overflow: scroll">
        <tr>
            <th>#</th>
            <th>Name</th>
            <th>Price</th>
            <th>Category</th>
            <th>Action</th>
        </tr>
    </table>
    <div class="searchControls">
        <span class="ShownDetails">Showing 1 to 5 of 5 entries</span>
        <div class="NextPreCon">
            <div class=".pre bx bx-caret-left" onclick="displayItems(allItemsData,--currentItemPageNum)"></div>
            <div class="firstPageBtn" onclick="displayItems(allItemsData,1)">1</div>
            <span>... <span></span> ...</span>
            <div class="lastPageBtn" onclick="displayItems(allItemsData,maxItemP)"></div>
            <div class="next bx bx-caret-right" onclick="displayItems(allItemsData,++currentItemPageNum)"></div>
        </div>
    </div>
</div>

<div class="items">
   
</div>

<div id="processDone"></div>

<div  id="deleteBox">
    <form class="box" id="deleteitemForm" onsubmit="conformDeleteItem()">
        <h2>Delete Item</h2>
        <p>Are you sure to detete this item.</p>
        <input id="conformDeleteID" type="hidden" name="deleteID">
        <button class="back fbtn" value="#deleteBox" onclick="hidePopUp(this.value)" type="reset">Back</button>
       <button id="conformDeleteBtn">Delete</button>
</form>
</div>
<div  id="editBox">
    <form class="box" id="editItemForm" onsubmit="edit_item()" enctype="multipart/form-data">
        <h2>Edit Item</h2>
        <input type="text" id="editedItemName" name="editedItemName" placeholder="Enter New Name">
        <input type="text" id="editedItemPrice" name="editedItemPrice" placeholder="Enter New Price">
        <select name="categoryList2" id="categoriesList2">
          <option value="0">Select Category</option>
        </select>
        <input type="file" name="editedItemImage" accept="image/*">
        <input type="hidden" name="oldImagePath" id="editedImgName">
        <input type="hidden" name="itemID" id="itemID">
        <button type="reset" value="#editBox" class="back fbtn" onclick="hidePopUp(this.value)">Back</button>
       <button type="submit"  id="conformEditBtn">Edit</button>
</form>
</div>