const mainPage = require("./mainPage.js");


window.controller = {
    mainOpen: true,

    changePage: function(page){
        let main = document.getElementById("main");
        if(this.mainOpen){
            let pages = document.querySelectorAll(".page");
            for(let i = 0; i < pages.length; i++){
                pages[i].style.display = "none";
            }
            document.getElementById(page).style.display = "flex";
            main.classList.add("rotateMain");
            this.mainOpen = false;
        }else{
            main.classList.remove("rotateMain");
            this.mainOpen = true;
        }
    }
}


mainPage.display();