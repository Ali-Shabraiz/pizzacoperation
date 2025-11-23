<form id="addCategoryForm" onsubmit="add_category()">
    <h1>Add-Categories</h1>
    <input type="text" name="newCategoryName" placeholder="Enter Category...">
    <select name="size">
        <option value="0">Select One</option>
        <option value="1">Half - Full</option>
        <option value="2">S - M - L</option>
    </select>
    <button type="submit">Add</button>
</form>
<div id="responde"></div>
<div class="form" name="tableForm">
    <h1>Categories</h1>
    <div class="searchControls">
        <div class="numberEntries">Show
            <select onchange="maxCat = Number(this.value);displayCategories(categoriesData,1)">
                <option value="5">5</option>
                <option value="10">10</option>
                <option id="allNumberEntriesCategories">All</option>
            </select>
            Entries
        </div>
        <input type="search" name="" id="" placeholder="Search Here..." oninput="searchSomething(categoriesData,this.value,'displayCategories',currentCategoryPageNum)">
    </div>
    <table border="1" id="categorytable">
        <tr>
            <th>#</th>
            <th>Name</th>
            <th>Action</th>
        </tr>
    </table>
    <div class="searchControls">
        <span class="ShownDetails">Showing 1 to 5 of 5 entries</span>
        <div class="NextPreCon">
            <div class=".pre bx bx-caret-left" onclick="displayCategories(categoriesData,--currentCategoryPageNum)"></div>
            <div class="firstPageBtn" onclick="displayCategories(categoriesData,1)">1</div>
            <span>... <span></span> ...</span>
            <div class="lastPageBtn" onclick="displayCategories(categoriesData,maxCatP)"></div>
            <div class="next bx bx-caret-right" onclick="displayCategories(categoriesData,++currentCategoryPageNum)"></div>
        </div>
    </div>
</div>

<div id="processDone" class="failed"></div>


<div id="deleteBox">
    <form class="box" id="deletecategoryForm" onsubmit="conformDeleteCategory()">
        <h2>Delete category</h2>
        <p>Are you sure to detete this Category.</p>
        <button class="back" value="#deleteBox" onclick="hidePopUp(this.value)">Back</button>
        <input type="hidden" id="conformDeleteID" name="deleteID">
        <button id="conformDeleteBtn">Delete</button>
</form>
</div>
<div id="editBox">
    <form class="box" id="editcategoryForm" onsubmit="edit_category()">
        <h2>Edit Item</h2>
        <input type="text" name="editedCategoryName" id="editedCategoryName" placeholder="Enter New Name">
        <select name="editedCategorySize" id="editedCategorySize">
            <option value="1">Half - Full</option>
            <option value="2">S - M - L</option>
        </select>
        <input type="hidden" name="newCategoryID" id="newCategoryID">
        <button type="reset" value="#editBox" class="back" onclick="hidePopUp(this.value)">Back</button>
        <button type="submit" id="conformEditBtn">Edit</button>
    </form>
</div>