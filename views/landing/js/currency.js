module.exports = {
    populated: false, 

    display: function(){
        if(!populated){
            this.populated = true;
        }
    }
}