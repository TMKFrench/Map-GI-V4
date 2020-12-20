    var mymap;
    var markeropa;
    var catmarkers = [];
    var savearray = [];
    var cordiarray = [], cdelicarray = [], cprecarray = [], cluxearray = [], cdefiarray = [], cfeearray = [], succesarray = [], anemoarray = [], panoarray = [];
	var cordilarray = [], cdeliclarray = [], cpreclarray = [], cluxelarray = [], cdefilarray = [], cfeelarray = [], succeslarray = [], geocularray = [], panolarray = [], sceaugeoarray = [];
	var teyvatarray = [
        'statue','teleport','succes','pano','anemo','geocul','cordi','cdelic','cprec','cluxe','cdefi','cfee','ferblanc','cristal',
        'electrocris','eclatcm','sceaugeo','lapis','jade','noyauc','perle','conque','ffeu','fbrume','gdloup','pomme','carotte',
        'radis','halampe','chrysantheme','lyscalla','tombaie','bacrochet','pissenlit','cecilia','qingxin','muguet','piment',
        'lysverni','fsoie','bambou','lotus','grenouille','lezard','papillon','luciole'];
    var nbtmark = 0;

// Fonctions Interaction sur la Map

function onMapClick(e) {
    console.log(langue["ui-click"] + mymap.project([e.latlng.lat, e.latlng.lng], mymap.getMaxZoom()));
}

function unproject(coord) {
    return mymap.unproject(coord, mymap.getMaxZoom());
}

function onMarkerClick(e) {
    markeropa = this;
}

function getLscbx (name) {
    lscbx = localStorage.getItem("chkbox" + name);
    if(!lscbx) {
        lscbx = [];
    } else {
        lscbx = JSON.parse(lscbx);
    }
    return lscbx;
}

function activecb(cbname,cbnum) {
    var usercb = getLscbx(cbname);
    if (usercb) {
        if (usercb.indexOf(""+cbnum) >= 0) 
            return true;
        // return false;
    } else {
        localStorage.setItem("chkbox" + cbname, JSON.stringify([]));
        return false;
    };
};

// Initialisation de la Map

var mymap = new L.Map('mapid', {
    center : [0,0],
    zoom : 2,
    attributionControl : false
});

mymap.zoomControl.setPosition('topright')

// Initialisation des Layers

teyvatarray.forEach(function(e) {
    window[e+'Group'] = L.layerGroup();
});

// temporaire liste des icones et marqueurs test

var Teleport = L.icon({iconUrl:'media/icones/teleport.png', className:'teleport', iconSize:[25, 40], iconAnchor:[12, 40], popupAnchor:[0, -40]});
var Statue = L.icon({iconUrl:'media/icones/statue.png', className:'statue', iconSize:[25, 40], iconAnchor:[12, 40], popupAnchor:[0, -40]});
var Pano = L.icon({iconUrl:'media/icones/pano2.png', className:'pano', iconSize:[30, 30], iconAnchor:[15, 15], popupAnchor:[0, -15]});
var Radis = L.icon({iconUrl:'media/icones/radis.png', className:'radis', iconSize:[30, 30], iconAnchor:[15, 15], popupAnchor:[0, -15]});

var liststatue = [
    [0,[ 974,2269]],[0,[ 914,1578]],[0,[1622,2323]],[0,[1694, 825]]
];
var listteleport = [
    [0,[1734,2644]],[0,[1252,2124]],[0,[1333,1877]],[5,[1317,1750],"9aaU23xfqGA"],[0,[1023,2536]],[0,[1768,2272]],[0,[1352,2509]],[0,[1340,1385]],[0,[1883,2628]],[0,[ 515,2442]],
    [0,[1042,1879]],[0,[ 494,3005]],[0,[1233,1522]],[0,[1625,1453]],[0,[ 848,1916]],[0,[ 914,1211]],[0,[1428, 965]],[0,[1708, 887]],[0,[1845,1092]],[0,[1975, 733]],
    [0,[1631, 656]]
];
var listpano = [
    [3,[1467,2218],langue.pano01],[3,[1555,2420],langue.pano02],[3,[1103,2099],langue.pano03],[3,[1074,1825],langue.pano04],[3,[ 925,1331],langue.pano05],[3,[1410,1678],langue.pano06],[3,[1301,1762],langue.pano07],[3,[1475,2765],langue.pano08],[3,[470,2451],langue.pano09],[3,[1778,1197],langue.pano10]
];
var listpanol = [
    [3,[1246,1992],langue.pano11],[3,[ 851,1875],langue.pano12],[3,[ 771,2003],langue.pano13],[7,[1022,1761],"YvF2VWtOiAc",langue.pano14],[3,[2639,1943],langue.pano15],[3,[2974,1966],langue.pano16],[3,[1905,1910],langue.pano17],[3,[3311,1393],langue.pano18],[3,[2132,1100],langue.pano19],[3,[2145, 584],langue.pano20],
    [3,[2305, 728],langue.pano21],[3,[1700,1382],langue.pano22],[3,[1334,2416],langue.pano23],[3,[ 779,1006],langue.pano24],[3,[1113, 976],langue.pano25],[3,[ 566,1033],langue.pano26],[3,[1882,1420],langue.pano27]
];

var listradis = [
    [12,[ 734,1394]],[12,[ 761,1467]],[12,[ 935,1897]],[12,[1018,1933]]
];

var popupOptions =
    {
        'minWidth': '640px',
        'minHeight': '480px'
    }


// Initialisation du tileLayer

L.tileLayer('assets/tiles/{z}/{x}/{y}.png', {
    minZoom : 2,
    maxZoom : 6,
    continuousWorld : true,
    maxBoundsViscosity: 0.8,
    noWrap: true
}).addTo(mymap);

// Affichage du Bouton Menu

var BoutonMenu = L.easyButton({
    states : [{
        stateName: 'close-menu',
        icon: '<img src="media/icones/menuoff.png">',
        title: langue["ui-close"],
        onClick: function(btn, mymap){
            $('body').toggleClass('show-menu');
            mymap.invalidateSize();
            btn.state('open-menu')
        }
    },{
        stateName: 'open-menu',
        icon: '<img src="media/icones/menuon.png">',
        title: langue["ui-open"],
        onClick: function(btn, mymap){
            $('body').toggleClass('show-menu');
            mymap.invalidateSize();
            btn.state('close-menu')
        }
    }]
});

BoutonMenu.addTo(mymap)

// Initialisation des marqueurs

var ListGroupmark = [
    {markers: liststatue, layer: statueGroup, icon: Statue, title: langue.cat01, filename: 'statue'},
    {markers: listteleport, layer: teleportGroup, icon: Teleport, title: langue.cat02, filename: 'tp'},
    {markers: listpano, layer: panoGroup, icon: Pano, title: langue.cat03, filename: 'pano', cbxname: 'pano'},
    {markers: listpanol, layer: panoGroup, icon: Pano, title: langue.cat03, filename: 'panol', cbxname: 'panol'},
    {markers: listradis, layer: radisGroup, icon: Radis, title: langue.cat17}
];

ListGroupmark.forEach(function(e) {
    var marq = [], nfichier, i, mtype, checkbox='';
    var marklist = e.markers;
    var checkopa = getLscbx(e.cbxname);
    console.log (JSON.stringify(checkopa))
    if(typeof e.cbxname !== 'undefined') 
        catmarkers.push(e.cbxname);
    
    console.log(marklist.length)
    for (i=0; i<marklist.length; i++) {
        marq = marklist[i];
        // console.log("mark n° "+ (i+1) + " " + JSON.stringify(marq)); // Pour Debug les marqueurs
        mtype = marq[0];
        nfichier = e.filename + (i+1);
        if(typeof e.cbxname !== 'undefined')
            checkbox = '<br><h2><label><input id="mapbox" name="'+e.cbxname+'" value="'+ (i+1)+'" type="checkbox" /> '+langue['ui-found']+'</h2>';
            // console.log (checkbox);
        var marker = L.marker(unproject(marq[1]), {icon: e.icon, title: e.title});

        switch (mtype) {
            case 0 : // Img (+cb)
                marker.bindPopup('<a href="media/'+nfichier+'.jpg" data-lity"><img class="thumb" src="media/'+nfichier+'.jpg"/></a>'+checkbox, popupOptions);
                break;
            case 3 : // Img + txt (+cb)
                marker.bindPopup('<h1><a href="media/'+nfichier+'.jpg" data-lity"><img class="thumb" src="media/'+nfichier+'.jpg"/></a><br><br>'+marq[2]+checkbox, popupOptions);
                break;
            case 5 : // Video ss txt (+cb)
                marker.bindPopup('<iframe width="560" height="315" src="//www.youtube.com/embed/'+marq[2]+'?rel=0" frameborder="0" allowfullscreen></iframe>'+checkbox, popupOptions);
                break;
            case 7 : // Video + txt (+cb)
                marker.bindPopup('<iframe width="560" height="315" src="//www.youtube.com/embed/'+marq[2]+'?rel=0" frameborder="0" allowfullscreen></iframe><br><h1>'+marq[3]+checkbox+'</h1>', popupOptions);
                break;
            case 11 : // null (+cb)
                L.marker(marq[1], {icon: Null, title: ""}).addTo(e.layer).on('click', onMarkerClick).bindPopup('<h1>'+marq[2]+checkbox+'</h1>', popupOptions);
                break;
            case 12 : // sans popup
                // Have a break, have a Kitkat
        };

        if(checkbox)
            marker.on('click', onMarkerClick);

        marker.addTo(e.layer)

        if(checkopa.indexOf(""+(i+1)) >= 0)
            marker.setOpacity(0.45);

    };
    console.log(e.title + " : " + marklist.length + langue["ui-load"]);
    nbtmark += marklist.length;
        // console.log("nombre de marqueur Total chargés : " + nbtmark); // Pour debug
});

// Fonctions Interaction Map

mymap.on("click", onMapClick);
mymap.setMaxBounds(new L.LatLngBounds(unproject([0,0]), unproject([16384, 16384])));
// teyvatarray.forEach(function(e) {
//     mymap.removeLayer(window[e+'Group']);
// });

mymap.on('popupopen', function () {
    $(":checkbox").on("change", function(){
        var cbname = this.name;
        var cbnum = this.value;
        var cbstate = this.checked;
        console.log(cbname, cbnum, cbstate);
        var usercb = getLscbx(cbname);
        if (cbstate) {
            usercb.push(cbnum);
            markeropa.setOpacity(0.45);
        } else {
            usercb.splice((usercb.indexOf(""+cbnum)), 1);
            markeropa.setOpacity(1);
        }
        localStorage.setItem("chkbox" + cbname, JSON.stringify(usercb));
    });

    if(document.getElementById("mapbox")){
        var cbname = document.getElementById("mapbox").name;
        var cbnum = document.getElementById("mapbox").value;
        var etat = activecb(cbname,cbnum);
        $("#mapbox").prop('checked', activecb(cbname,cbnum));
    };
});

$(document).ready(function(){

// Gestion du Menu 

    // Selection Marqueur

    $('#menu a[data-type]').on('click', function(e){
        e.preventDefault();
  
        var type = $(this).data('type');
  
        if($(this).hasClass('active')) {
            mymap.removeLayer(window[type+'Group']);
        } else {
            mymap.addLayer(window[type+'Group']);
        }
  
        $(this).toggleClass('active');
    });


  
});