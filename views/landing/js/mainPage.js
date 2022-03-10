module.exports = {
    populated: false,
    topOpen: false,
    rightOpen: false,
    leftOpen: false,

    display: function(){
        if(!this.populated){
            document.getElementById("menuButton").onclick = ()=>{this.rotate("top")};
            document.getElementById("rightButton").onclick = ()=>{this.rotate("right")};

            document.getElementById("projectsOpen").onclick = ()=>{controller.changePage("projects")};
            document.getElementById("blogOpen").onclick = ()=>{controller.changePage("blog")};
            document.getElementById("galleryOpen").onclick = ()=>{controller.changePage("gallery")};
            document.getElementById("currencyOpen").onclick = ()=>{controller.changePage("currency")};

            // let i = 1;
            // let skills = document.querySelectorAll(".skill");
            // setInterval(()=>{
            //     for(let j = 0; j < skills.length; j++){
            //         skills[j].style.opacity = 0;
            //     }
            //     skills[i].style.opacity = 1;
            //     i = i === skills.length - 1 ? 0 : i + 1;
            // }, 3000);

            this.populated = true;
        }
    },    

    rotate: function(location){
        switch(location){
            case "top":
                this.topOpen = this.topOpen ? false : true;
                break;
            case "right":
                this.rightOpen = this.rightOpen ? false : true;
                break;
            case "left":
                this.leftOpen = this.leftOpen ? false : true;
                break;
        }

        this.calculateRotation();
    },

    calculateRotation: function(){
        let mainContainer = document.getElementById("mainContainer");

        mainContainer.style.transform = "none";
        mainContainer.style.transformOrigin = "bottom";
        if(this.topOpen && this.rightOpen && this.leftOpen){
            mainContainer.style.transform = "rotateX(15deg) scale(0.95)";
        }else if(this.topOpen && this.leftOpen){
            mainContainer.style.transform = "rotateX(15deg) rotateY(-20deg) translate(0, 35px)";
        }else if(this.topOpen && this.rightOpen){
            mainContainer.style.transform = "rotateX(15deg) rotateY(20deg) translate(0, 35px)";
        }else if(this.leftOpen && this.rightOpen){
            mainContainer.style.transformOrigin = "top";
            mainContainer.style.transform = "rotateX(-5deg) scale(0.85, 1)";
        }else if(this.topOpen){
            mainContainer.style.transform = "rotateX(15deg)";
        }else if(this.rightOpen){
            mainContainer.style.transform = "rotateY(20deg)";
        }else if(this.leftOpen){
            mainContainer.style.transform = "rotateY(-20deg)";
        }
    }
}