module.exports = {
    populated: false,
    template: document.getElementById("currencyCard").content.children[0],
    container: document.getElementById("currencyContainer"),

    display: function(){
        if(!this.populated){
            let buttons = document.getElementById("currencyLocations").children;
            for(let i = 0; i < buttons.length; i++){
                buttons[i].onclick = ()=>{this.displayLocation(buttons[i])};
            }
            this.populated = true;
        }
    },

    displayLocation: function(button){
        fetch(`/currency/${button.innerText}`)
            .then(r=>r.json())
            .then((currencies)=>{
                if(typeof(currencies) !== "string"){
                    while(this.container.children.length > 0){
                        this.container.removeChild(this.container.firstChild);
                    }

                    for(let i = 0; i < currencies.length; i++){
                        let currency = this.template.cloneNode(true);
                        let frontImage = currency.querySelector(".currencyFront");
                        let backImage = currency.querySelector(".currencyBack");

                        frontImage.src = currencies[i].frontImage;
                        frontImage.alt = `${currencies[i].value} ${currencies[i].name} front image`;
                        frontImage.onload = ()=>{this.resizeImage(frontImage)};
                        backImage.src = currencies[i].backImage;
                        backImage.alt = `${currencies[i].value} ${currencies[i].name} back image`;
                        backImage.onload = ()=>{this.resizeImage(backImage)};
                        currency.querySelector(".currencyValue").innerText = `${currencies[i].currencyCode} ${currencies[i].value / 100}`;
                        currency.querySelector(".currencyComment").innerText = `${currencies[i].comment}`;
                        this.container.appendChild(currency);
                    }
                }
            })
            .catch((err)=>{
                console.log(err);
            });
    },

    resizeImage: (image)=>{
        console.log(image.clientWidth);
        let width = `${image.clientWidth * 0.35}px`;
        image.style.height = `${image.clientHeight * 0.35}px`;
        image.style.width = width;
    }
}