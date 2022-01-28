module.exports = {
    populated: false,

    display: function(){
        if(!this.populated){
            document.getElementById("projectsBack").onclick = ()=>{controller.changePage("main")};

            this.populated = true;
        }
    }
}