var currentCategoryPageNum = 1,currentItemPageNum = 1;
const asideBarItems = document.querySelectorAll(".main aside ul li");
const dynamicInfo = document.getElementById('dynamicInfo');
let formSelectors = ['#addItemForm,#editItemForm,#deleteitemForm','','#addCategoryForm,#editcategoryForm,#deletecategoryForm','','#uploadLogoForm'];

let pageDisplayDataFunctions = ['displayCategories2();displayItems(allItemsData,currentItemPageNum);displayItems2(allItemsData)','','displayCategories(categoriesData, currentCategoryPageNum);']
asideBarItems.addEventListner
    let activatedAsideBarItem = 2;
    let index = 2;
    let url = 'PHP/categoryPage';
    asideBarItems[activatedAsideBarItem].classList.add('active')
    function openCloseNavigation(element){
        element.classList.toggle('unactive');
    }

    function activeItem(index,url){
        fetch(`${url}.php`).then(res => {
           return res.text();
        }).then(data => {
            dynamicInfo.innerHTML = data;
            asideBarItems[activatedAsideBarItem].classList.remove('active');
            asideBarItems[index].classList.add('active');
            activatedAsideBarItem = index;
            dontRefresh(formSelectors[index]);
            eval(pageDisplayDataFunctions[index])
        });  
    }
    activeItem(index,url)
    function dontRefresh(elementName){
        var elements = elementName.split(",");
        var length = elements.length;
        setTimeout(() => {
            for(var i=0;i<length;i++){
            var element = elements[i];
            var a = document.querySelector(element)
            a.addEventListener('submit',e => e.preventDefault());
            }
    }, 200);
    }