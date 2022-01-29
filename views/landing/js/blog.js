module.exports = {
    populated: false,

    display: function(){
        if(!this.populated){
            this.populated = true;
        }
    }
}