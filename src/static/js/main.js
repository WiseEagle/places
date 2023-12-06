jQuery(document).ready(function() {
    /*menu btn*/
    jQuery("a.menu-btn").click(function () {
        if (jQuery("menu").position().left != 0) {
            jQuery("menu").stop();
            jQuery("menu").animate({"left": 0}, "slow");
        } else {
            jQuery("menu").stop();
            jQuery("menu").animate({"left": "-280px"}, "slow");
        }
        return false;
    });
});


let placesObj = {};
//food and drink
//https://api.foursquare.com/v3/places/search?ll=39.12%2C-88.54&categories=13000



jQuery.ajax({
    method: "GET",
    dataType: 'json',
    url: "https://api.foursquare.com/v3/places/search?ll=39.12%2C-88.54",
    headers: {
        accept: 'application/json',
        Authorization: 'fsq3vKZ5chdrr+zIBkZqAAG9EGPvvqteEOrxjHXQwcbIPeo='
    },
    success: function(data){
        
        placesObj = data;
        let place;
        
        let lat = "";
        let lng = "";
        let zoom = 17;
        let name = placesObj.results[0].name;
        let fsq_id = placesObj.results[0].fsq_id;

        /*photos */
        jQuery.ajax({
            method: "GET",
            dataType: 'json',
            url: "https://api.foursquare.com/v3/places/"+fsq_id+"/photos",
            headers: {
                accept: 'application/json',
                Authorization: 'fsq3vKZ5chdrr+zIBkZqAAG9EGPvvqteEOrxjHXQwcbIPeo='
            },
            success: function(data){
                let photosObj = data;
                console.log(photosObj[2]);
                let photo = photosObj[2].prefix +"200"+ photosObj[0].suffix;
                /* each  all photos
                jQuery.each(photosObj, function (i,item) {
                    photo += "<div class='photo-item'><img src='" + item.icon.prefix +"1080"+ item.icon.suffix +  "' ></div>";
                });*/
                jQuery( ".place-header" ).attr( "style", "background-image: url('" + photo +  "');background-size: cover;" );

            }
        })
        .done(function( obj ) {
            /*console.log( "obj" + obj.json() );*/
        });
        /*photos */

        jQuery.each(placesObj.results, function (i,item) {
            
            lat = item.geocodes.main.latitude;
            lng = item.geocodes.main.longitude;
            
            
            place += "<div class='place-item'>";
            place += "<h3>" + item.name + "</h3>";
            
            place += "<div class='place-categories'>";
            jQuery.each(item.categories, function (i,item) {
                place += "<div><div class='image'><img src='" + item.icon.prefix +"30"+ item.icon.suffix + "' ></div>";
                place += "<span class='head'>" + item.name + "</span></div>";
            });
            place += "</div></div>";
            
        });

        jQuery( ".place-header h1" ).text( name );

        jQuery( ".sub-categories" ).append( "<div class='place'>" + place + "</div>" );
        
        let map = L.map('map').setView([lat, lng], zoom);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        }).addTo(map);

        L.marker([lat, lng]).addTo(map)
            .bindPopup(name)
            .openPopup();
        
        
    }
})
.done(function( obj ) {
    /*console.log( "obj" + obj.json() );*/
});






