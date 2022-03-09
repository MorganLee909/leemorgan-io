module.exports = {
    populated: false,

    display: function(){
        if(!this.populated){
            let mapPromise = new Promise((resolve, reject)=>{
                let script = document.createElement("script");
                script.src = "https://api.mapbox.com/mapbox-gl-js/v2.3.1/mapbox-gl.js";
                script.onload = resolve;
                document.getElementById("gallery").appendChild(script);
            });
            let galleryPromise = fetch("/galleries").then(r=>r.json());

            Promise.all([mapPromise, galleryPromise])
                .then((response)=>{
                    let map = this.createMap(response[1].key);
                    this.addGalleries(response[1].galleries, map);
                })
                .catch((err)=>{});

            this.populated = true;
        }
    },

    createMap: function(key){
        mapboxgl.accessToken = key;
        
        let map = new mapboxgl.Map({
            container: "map",
            style: "mapbox://styles/mapbox/streets-v11",
            center: [-6.2764, 48.3623],
            zoom: 3
        });

        let mapDiv = document.getElementById("map");
        mapDiv.style.height = "90%";
        mapDiv.style.width = "90%";
        map.resize();
        return map;
    },

    addGalleries: function(galleries, map){
        let tagContainer = document.getElementById("galleryTags");

        let tag = document.createElement("button");
        tag.innerText = "All";
        tag.classList.add("tag");
        tagContainer.appendChild(tag);

        for(let i = 0; i < galleries.length; i++){
            let tags = galleries[i].tags.toString().replaceAll(",", ", ");
            let popup = new mapboxgl.Popup()
                .on("open", ()=>{
                    popup.setHTML(`
                        <a class="galleryPopup" href="/gallery/${galleries[i]._id}">
                            <h1>${galleries[i].title}</h1>
                            <p>${tags}</p>
                            <img class="popupImage" src="${galleries[i].image}" alt="${galleries[i].title} image">
                        </a>
                    `)
                });

            new mapboxgl.Marker()
                .setLngLat([galleries[i].location.coordinates[1], galleries[i].location.coordinates[0]])
                .addTo(map)
                .setPopup(popup);

            for(let j = 0; j < galleries[i].tags.length; j++){
                if(tags.includes(galleries[i].tags[j]) === true) continue;

                tags.push(galleries[i].tags[j]);

                let tag = document.createElement("button");
                tag.innerText = galleries[i].tags[j];
                tag.classList.add("tag");
                tagContainer.appendChild(tag);
            }
        }
    }
}