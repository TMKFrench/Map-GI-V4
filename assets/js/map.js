$(window).load(function(){

    var mymap;
    var markeropa;
    var catmarkers = [];
    var savearray = [];
    var cordiarray = [], cdelicarray = [], cprecarray = [], cluxearray = [], cdefiarray = [], cfeearray = [], succesarray = [], anemoarray = [], panoarray = [];
	var cordilarray = [], cdeliclarray = [], cpreclarray = [], cluxelarray = [], cdefilarray = [], cfeelarray = [], succeslarray = [], geocularray = [], panolarray = [], sceaugeoarray = [];
	var mondstadtarray = ["cordi","cdelic","cprec","cluxe","cdefi","cfee","succes","anemo","pano"];
    var liyuearray = ["cordil","cdelicl","cprecl","cluxel","cdefil","cfeel","succesl","geocul","panol"];
    var nbtmark = 0;

    var _region = window.localStorage.getItem('region');
    var REGION = (typeof _region !== 'undefined' && _region === 'mondstadt') ? _region : 'liyue';

// Réglages de la LightBox ligne de commande : <a href="/media/test.jpg" data-lightbox="test1" data-title="Image de test"><img class="thumb" src="/media/test.jpg" width="230px" alt="Image de test"/></a>
    lightbox.option({
        'fadeDuration': 400,
        'imageFadeDuration': 400,
        'maxWidth': 1200,
        'maxHeight': 900,
        'resizeDuration': 400
    });

// Fonctions Interaction sur la Map

    function onMapClick(e) {
        console.log(i18n["ui-click"] + mymap.wrapLatLng(e.latlng));
    }

    function onMarkerClick(e) {
        markeropa = this;
    }

// Fonctions de Gestion des Marqueurs

    function markeropacity(e) {
        if (e){
            markeropa.setOpacity(0.45);
        }
        else {
            markeropa.setOpacity(1);
        }
    }

    function initarray() {
        var i = 0;
        while (catmarkers[i]) {
            cookname = "chkbox" + catmarkers[i];
            switch (catmarkers [i]) {
                case "cordi":
                    cordiarray = JSON.parse(localStorage.getItem(cookname));
                    break;
                case "cdelic":
                    cdelicarray = JSON.parse(localStorage.getItem(cookname));
                    break;
                case "cprec":
                    cprecarray = JSON.parse(localStorage.getItem(cookname));
                    break;
                case "cluxe":
                    cluxearray = JSON.parse(localStorage.getItem(cookname));
                    break;
                case "cdefi":
                    cdefiarray = JSON.parse(localStorage.getItem(cookname));
                    break;
                case "cfee":
                    cfeearray = JSON.parse(localStorage.getItem(cookname));
                    break;
                case "succes":
                    succesarray = JSON.parse(localStorage.getItem(cookname));
                    break;
                case "anemo":
                    anemoarray = JSON.parse(localStorage.getItem(cookname));
                    break;
                case "pano":
                    panoarray = JSON.parse(localStorage.getItem(cookname));
                    break;
                case "cordil":
                    cordilarray = JSON.parse(localStorage.getItem(cookname));
                    break;
                case "cdelicl":
                    cdeliclarray = JSON.parse(localStorage.getItem(cookname));
                    break;
                case "cprecl":
                    cpreclarray = JSON.parse(localStorage.getItem(cookname));
                    break;
                case "cluxel":
                    cluxelarray = JSON.parse(localStorage.getItem(cookname));
                    break;
                case "cdefil":
                    cdefilarray = JSON.parse(localStorage.getItem(cookname));
                    break;
                case "cfeel":
                    cfeelarray = JSON.parse(localStorage.getItem(cookname));
                    break;
                case "succesl":
                    succeslarray = JSON.parse(localStorage.getItem(cookname));
                    break;
                case "geocul":
                    geocularray = JSON.parse(localStorage.getItem(cookname));
                    break;
                case "panol":
                    panolarray = JSON.parse(localStorage.getItem(cookname));
                    break;
                case "sceaugeo":
                    sceaugeoarray = JSON.parse(localStorage.getItem(cookname));
                }
            i++
        }
    }

    function initmarker(markers,cbxname) {
        // Transfert des cookies vers LocalStorage
        $.cookie.json = true;
        if ($.cookie("chkbox" + cbxname)) {
            localStorage.setItem("chkbox" + cbxname, JSON.stringify($.cookie("chkbox" + cbxname)));
            $.removeCookie("chkbox" + cbxname, { path: '/' });
        }

        var cookm = JSON.parse(localStorage.getItem("chkbox" + cbxname));
        var i = 0;
        catmarkers.push(cbxname);
        if (cookm) {
            while (cookm[i]) {
                markeropa = markers[cookm[i] - 1];
                markeropacity (true);
                i++;
            }
        }
    }

// Debuggage des markers

    function initmarkerdebug(markers,cbxname){
        var cookm = JSON.parse(localStorage.getItem("chkbox" + cbxname));
        console.log(localStorage.getItem("chkbox" + cbxname));
        var i = 0;
        catmarkers.push(cbxname);
        if (cookm) {
            while (cookm[i]) {
                markeropa = markers[cookm[i] - 1];
                console.log("Marker n° " + cookm[i]);
                markeropacity (true);
                i++;
            }
        }

    }

    function selectarray(mtype,mnumb,mstate) {
        switch (mtype) {
            case "cordi":
                cookts = gestionarray (cordiarray, mnumb, mstate);
                break;
            case "cdelic":
                cookts = gestionarray (cdelicarray, mnumb, mstate);
                break;
            case "cprec":
                cookts = gestionarray (cprecarray, mnumb, mstate);
                break;
            case "cluxe":
                cookts = gestionarray (cluxearray, mnumb, mstate);
                break;
            case "cdefi":
                cookts = gestionarray (cdefiarray, mnumb, mstate);
                break;
            case "cfee":
                cookts = gestionarray (cfeearray, mnumb, mstate);
                break;
            case "succes":
                cookts = gestionarray (succesarray, mnumb, mstate);
                break;
            case "anemo":
                cookts = gestionarray (anemoarray, mnumb, mstate);
                break;
            case "pano":
                cookts = gestionarray (panoarray, mnumb, mstate);
                break;
            case "cordil":
                cookts = gestionarray (cordilarray, mnumb, mstate);
                break;
            case "cdelicl":
                cookts = gestionarray (cdeliclarray, mnumb, mstate);
                break;
            case "cprecl":
                cookts = gestionarray (cpreclarray, mnumb, mstate);
                break;
            case "cluxel":
                cookts = gestionarray (cluxelarray, mnumb, mstate);
                break;
            case "cdefil":
                cookts = gestionarray (cdefilarray, mnumb, mstate);
                break;
            case "cfeel":
                cookts = gestionarray (cfeelarray, mnumb, mstate);
                break;
            case "succesl":
                cookts = gestionarray (succeslarray, mnumb, mstate);
                break;
            case "geocul":
                cookts = gestionarray (geocularray, mnumb, mstate);
                break;
            case "panol":
                cookts = gestionarray (panolarray, mnumb, mstate);
                break;
            case "sceaugeo":
                cookts = gestionarray (sceaugeoarray, mnumb, mstate);
        };
        localStorage.setItem("chkbox" + mtype, JSON.stringify(cookts));
    };

    function gestionarray(tempcook, chknb, etat) {
        if (etat) {
            tempcook.push(chknb);
        } else {
            var i = 0;
            while (tempcook[i]) {
                if (tempcook[i] == chknb) {
                    tempcook.splice(i, 1);
                };
                i++;
            };
        };
        return tempcook;
    };

    function activecb(mtype,mnumb) {
        var arrayvide = [];
        cooktl = JSON.parse(localStorage.getItem("chkbox" + mtype));
        if (cooktl) {
            var i = 0;
            while (cooktl[i]) {
                if (cooktl[i] == mnumb) {
                    return true;
                };
                i++;
            };
            return false;
        } else {
            localStorage.setItem("chkbox" + mtype, JSON.stringify(arrayvide));
            initarray();
            return false;
        };
    };

    function resetmarkers() {
        doreset();
        alert(i18n["ui-reset"]);
        var lang = (typeof(sessionStorage.languagemap) && sessionStorage.languagemap === 'fr') ? 'fr' : '';
        var url = 'index' + ((REGION === 'mondstadt') ? '' : 'l') + lang + '.html';

        return document.location.href = url;
};

    function doreset () {
        var  i=0, cbx;
        var arraytoreset = mondstadtarray.concat(liyuearray);
        console.log(JSON.stringify(arraytoreset));
        while (arraytoreset[i]) {
            cbx = "chkbox" + arraytoreset[i];
            localStorage.removeItem(cbx);
            i++;
        };
    };

    function savecookies() {
        savearray = ["v2"];
        var i=0, cbx;
        var arraytosave = mondstadtarray.concat(liyuearray);
        while (arraytosave[i]) {
            cbx = "chkbox" + arraytosave[i];
            savearray.push(arraytosave[i]);
            if (localStorage.getItem(cbx)) {
                savearray.push(JSON.parse(localStorage.getItem(cbx)));
            } else {
                savearray.push([]);
            };
            i++;
        };
        return savearray;
    };

    function loadcookies(lstmrk) {
        if (lstmrk[0] == "v2") {
            doreset();
            var i = 1, cbx;
            while (lstmrk[i]) {
                cbx = "chkbox" + lstmrk[i];
                localStorage.setItem(cbx, JSON.stringify(lstmrk[i+1]));
                i = i + 2;
            };
            alert(i18n["ui-import"]);
            var lang = (typeof(sessionStorage.languagemap) && sessionStorage.languagemap === 'fr') ? 'fr' : '';
            var url = 'index' + ((REGION === 'mondstadt') ? '' : 'l') + lang + '.html';
    
            return document.location.href = url;
        } else {
            alert(i18n["ui-fileerror"]);
        };
    };

    function reselectmenu(){
        $('#activation-select-options li').each(function(){
            if ($(this).hasClass('selected')) {
                $('.' + $(this).attr('value')).hide();
            }
        });
        $('.matbtn').each(function(){
            if ($(this).hasClass('pressed')) {
                $('.' + $(this).attr('value')).hide();
            }
        });
        if (REGION === "mondstadt") {
            if (localStorage.MenumapgenshinMLi) {
                var listatut = JSON.parse(localStorage.MenumapgenshinMLi);
            } else {
                localStorage.MenumapgenshinMLi = [];
            };
            if (localStorage.MenumapgenshinMBtn) {
                var btnstatut = JSON.parse(localStorage.MenumapgenshinMBtn);
            } else {
                localStorage.MenumapgenshinMBtn = [];
            };
        } else {
            if (localStorage.MenumapgenshinLLi) {
                var listatut = JSON.parse(localStorage.MenumapgenshinLLi);
            } else {
                  localStorage.MenumapgenshinLLi = [];
             };
             if (localStorage.MenumapgenshinLBtn) {
                var btnstatut = JSON.parse(localStorage.MenumapgenshinLBtn);
            } else {
                  localStorage.MenumapgenshinLBtn = [];
             };
        };
        if(listatut){
            listatut.forEach(function(element) {
                $("#li" + element).removeClass('selected');
                $('.' + element).show();
            });
        };
        if (btnstatut){
            btnstatut.forEach(function(element) {
                $("#btn" + element).removeClass('pressed').attr('src', "media/icones/" + element + "on.png");
                $('.' + element).show();
            });
        };
    };

    function openMenu(){
        $('#activation-select-box').addClass('selecting').text(i18n["ui-close"]);
        $('#activation-select-options').slideDown(150);
    };

    $(function () {

// Initialisation et chargement de la Map

    mymap = L.map('mapid', {
        crs: L.CRS.Simple,
        minZoom : -2,
        maxZoom : 2
    });

    mymap.zoomControl.setPosition('topright')
        console.log('REGION:', REGION);
    if (REGION === "mondstadt") {
        mymap.setMaxBounds(new L.latLngBounds([-700,-200], [3025,4086]));
        var bounds = [[0,0], [2325,3886]];
        var image = L.imageOverlay('media/map-mondstadt.jpg', bounds).addTo(mymap);
    } else {
        mymap.setMaxBounds(new L.latLngBounds([-700,-200], [4469,4047]));
        var bounds = [[0,0], [3769,3847]];
        var image = L.imageOverlay('media/map-liyue.jpg', bounds).addTo(mymap);
    };
    mymap.fitBounds(bounds);

// Initialisation des marqueurs

    function loadmarker(marklist, markico, marktitle,filename,cbxname) {
        var listback = [], marq = [], nfichier, i, mtype;
        // console.log(marklist.length)
        for (i=0; i<marklist.length; i++) {
            marq = marklist[i];
            // console.log("mark n° "+ (i+1) + " " + JSON.stringify(marq)); // Pour Debug les marqueurs
            mtype = marq[0];
            nfichier = filename + (i+1);
            switch (mtype) {
                case 0 : // Img
                    L.marker(marq[1], {icon: markico, title: marktitle}).addTo(mymap).bindPopup('<a href="media/'+nfichier+'.jpg" data-lightbox="'+nfichier+'" data-title="'+marktitle+'"><img class="thumb" src="media/'+nfichier+'.jpg"/></a>', popupOptions);
                    break;
                case 1 : // Img + cb
                    listback.push(L.marker(marq[1], {icon: markico, title: marktitle}).addTo(mymap).on('click', onMarkerClick).bindPopup('<a href="media/'+nfichier+'.jpg" data-lightbox="'+nfichier+'" data-title="'+marktitle+'"><img class="thumb" src="media/'+nfichier+'.jpg"/></a><br><h2><input id="mapbox" name="'+cbxname+'" value="'+ (i+1)+'" type="checkbox" /> '+i18n['ui-found']+'</h2>', popupOptions));
                    break;
                case 2 : // Img + txt
                    L.marker(marq[1], {icon: markico, title: marktitle}).addTo(mymap).bindPopup('<h1><a href="media/'+nfichier+'.jpg" data-lightbox="'+nfichier+'" data-title="'+marktitle+'"><img class="thumb" src="media/'+nfichier+'.jpg"/></a><br><br>'+marq[2]+'</h1>', popupOptions);
                    break;
                case 3 : // Img + txt + cb
                    listback.push(L.marker(marq[1], {icon: markico, title: marktitle}).addTo(mymap).on('click', onMarkerClick).bindPopup('<h1><a href="media/'+nfichier+'.jpg" data-lightbox="'+nfichier+'" data-title="'+marktitle+'"><img class="thumb" src="media/'+nfichier+'.jpg"/></a><br><br>'+marq[2]+'<br><h2><input id="mapbox" name="'+cbxname+'" value="'+ (i+1)+'" type="checkbox" /> '+i18n['ui-found']+'</h2>', popupOptions));
                    break;
                case 4 : // Video ss txt
                    L.marker(marq[1], {icon: markico, title: marktitle}).addTo(mymap).bindPopup('<iframe width="560" height="315" src="//www.youtube.com/embed/'+marq[2]+'?rel=0" frameborder="0" allowfullscreen></iframe>', popupOptions);
                    break;
                case 5 : // Video ss txt + cb
                    listback.push(L.marker(marq[1], {icon: markico, title: marktitle}).addTo(mymap).on('click', onMarkerClick).bindPopup('<iframe width="560" height="315" src="//www.youtube.com/embed/'+marq[2]+'?rel=0" frameborder="0" allowfullscreen></iframe><br><h2><input id="mapbox" name="'+cbxname+'" value="'+ (i+1)+'" type="checkbox" /> '+i18n['ui-found']+'</h2>', popupOptions));
                    break;
                case 6 : // Video + txt
                    L.marker(marq[1], {icon: markico, title: marktitle}).addTo(mymap).bindPopup('<iframe width="560" height="315" src="//www.youtube.com/embed/'+marq[2]+'?rel=0" frameborder="0" allowfullscreen></iframe><br><h1>'+marq[3]+'</h1>', popupOptions);
                    break;
                case 7 : // Video + txt + cb
                    listback.push(L.marker(marq[1], {icon: markico, title: marktitle}).addTo(mymap).on('click', onMarkerClick).bindPopup('<iframe width="560" height="315" src="//www.youtube.com/embed/'+marq[2]+'?rel=0" frameborder="0" allowfullscreen></iframe><br><h1>'+marq[3]+'<br><h2><input id="mapbox" name="'+cbxname+'" value="'+ (i+1)+'" type="checkbox" /> '+i18n['ui-found']+'</h2></h1>', popupOptions));
                    break;
                case 8 : // txt
                    L.marker(marq[1], {icon: markico, title: marktitle}).addTo(mymap).bindPopup('<h1>'+marq[2]+'</h1>', popupOptions);
                    break;
                case 9 : // txt + cb
                    listback.push(L.marker(marq[1], {icon: markico, title: marktitle}).addTo(mymap).on('click', onMarkerClick).bindPopup('<h1>'+marq[2]+'<br><h2><input id="mapbox" name="'+cbxname+'" value="'+ (i+1)+'" type="checkbox" /> '+i18n['ui-found']+'</h2></h1>', popupOptions));
                    break;
                case 10 : // null
                    L.marker(marq[1], {icon: Null, title: ""}).addTo(mymap).bindPopup('<h1>'+marq[2]+'</h1>', popupOptions);
                    break;
                case 11 : // null + cb
                    listback.push(L.marker(marq[1], {icon: Null, title: ""}).addTo(mymap).on('click', onMarkerClick).bindPopup('<h1>'+marq[2]+'<br><h2><input id="mapbox" name="'+cbxname+'" value="'+ (i+1) +'" type="checkbox" /> '+i18n['ui-found']+'</h2></h1>', popupOptions));
                    break;
                case 12 : // sans popup
                    L.marker(marq[1], {icon: markico, title: marktitle}).addTo(mymap);
            };
        };
        console.log(marktitle + " : " + marklist.length + i18n["ui-load"]);
        nbtmark += marklist.length;
        // console.log("nombre de marqueur Total chargés : " + nbtmark); // Pour debug
        return listback;
    };

    // Chargement des Marqueurs

        // Marqueurs communs

    loadmarker(listcristal,Cristal,i18n.cat11,"","");
    loadmarker(listelectroc,Electrocris,i18n.cat12,"","");
    loadmarker(listfbrume,Fbrume,i18n.cat13,"","");
    loadmarker(listffeu,Ffeu,i18n.cat14,"","");
    loadmarker(listgdloup,Gdloup,i18n.cat45,"","");
    loadmarker(listpomme,Pomme,i18n.cat15,"","");
    loadmarker(listcarotte,Carotte,i18n.cat16,"","");
    loadmarker(listradis,Radis,i18n.cat17,"","");
    loadmarker(listferblanc,Ferblanc,i18n.cat25,"","");
    loadmarker(listgrenouille,Grenouille,i18n.cat27,"","");
    loadmarker(listlezard,Lezard,i18n.cat28,"","");
    loadmarker(listpapillon,Papillon,i18n.cat42,"","");
    loadmarker(listluciole,Luciole,i18n.cat43,"","");
    loadmarker(listnoyauc,Noyauc,i18n.cat44,"","");
    loadmarker(listeclatcm,Eclatcm,i18n.cat26,"","");

        // Marqueurs par région

    if (REGION === "mondstadt") {

        loadmarker(liststatue,Statue,i18n.cat01,"statue","");
        loadmarker(listteleport,Teleport,i18n.cat02,"tp","");
        var markerspano = loadmarker(listpano,Pano,i18n.cat03,"pano","pano");
        initmarker (markerspano, "pano");
        var markerscordi = loadmarker(listcordi,Cordi,i18n.cat04,"oc","cordi");
        initmarker (markerscordi, "cordi");
        var markerscdelic = loadmarker(listcdelic,Cdelic,i18n.cat05,"dc","cdelic");
        initmarker (markerscdelic, "cdelic");
        var markerscprec = loadmarker(listcprec,Cprec,i18n.cat06,"pc","cprec");
        initmarker (markerscprec, "cprec");
        var markerscluxe = loadmarker(listcluxe,Cluxe,i18n.cat07,"lc","cluxe");
        initmarker (markerscluxe, "cluxe");
        var markerscdefi = loadmarker(listcdefi,Cdefi,i18n.cat08,"defi","cdefi");
        initmarker (markerscdefi, "cdefi");
        var markerscfee = loadmarker(listcfee,Cfee,i18n.cat09,"","cfee");
        initmarker (markerscfee , "cfee");
        var markersanemo = loadmarker(listanemo,Anemo,i18n.cat10,"anemo","anemo");
        initmarker (markersanemo, "anemo");
        loadmarker(listtombaie,Tombaie,i18n.cat18,"","");
        loadmarker(listpissenlit,Pissenlit,i18n.cat19,"","");
        loadmarker(listhalampe,Halampe,i18n.cat20,"","");
        loadmarker(listchrysantheme,Chrysantheme,i18n.cat21,"","");
        loadmarker(listlyscalla,Lyscalla,i18n.cat22,"","");
        loadmarker(listcecilia,Cecilia,i18n.cat23,"","");
        loadmarker(listbacrochet,Bacrochet,i18n.cat24,"","");
    	var markerssucces = [
            L.marker([1378,1754], {icon: Succes, title: i18n['succes-001-title']}).addTo(mymap).on('click', onMarkerClick).bindPopup('<iframe width="560" height="315" src="//www.youtube.com/embed/gi8SNBMgcJQ?rel=0" frameborder="0" allowfullscreen></iframe><h1>'+i18n['succes-001-h1']+'</h1><h2><label><input id="mapbox" name="succes" value="1" type="checkbox" /> '+i18n['ui-found']+'</label></h2>', popupOptions),
            L.marker([1831,2791], {icon: Succes, title: i18n['succes-002-title']}).addTo(mymap).on('click', onMarkerClick).bindPopup('<iframe width="560" height="315" src="//www.youtube.com/embed/zWyh1IzC9p4?rel=0" frameborder="0" allowfullscreen></iframe><h1>'+i18n['succes-002-h1']+'</h1><h2><label><input id="mapbox" name="succes" value="2" type="checkbox" /> '+i18n['ui-found']+'</label></h2>', popupOptions),
            L.marker([ 422,2579], {icon: Succes, title: i18n['succes-003-title']}).addTo(mymap).on('click', onMarkerClick).bindPopup('<iframe width="560" height="315" src="//www.youtube.com/embed/3c27WzF91L4?rel=0" frameborder="0" allowfullscreen></iframe><h1>'+i18n['succes-003-h1']+'</h1><h2><label><input id="mapbox" name="succes" value="3" type="checkbox" /> '+i18n['ui-found']+'</label></h2>', popupOptions),
            L.marker([ 604,3080], {icon: Succes, title: i18n['succes-004-title']}).addTo(mymap).on('click', onMarkerClick).bindPopup('<iframe width="560" height="315" src="//www.youtube.com/embed/bLlx2q5xJ_k?rel=0" frameborder="0" allowfullscreen></iframe><h1>'+i18n['succes-002-h1']+'</h1><h2><label><input id="mapbox" name="succes" value="4" type="checkbox" /> '+i18n['ui-found']+'</label></h2>', popupOptions),
            L.marker([1314,1260], {icon: Succes, title: i18n['succes-005-title']}).addTo(mymap).on('click', onMarkerClick).bindPopup('<iframe width="560" height="315" src="//www.youtube.com/embed/fzLJspb266A?rel=0" frameborder="0" allowfullscreen></iframe><h1>'+i18n['succes-005-h1']+'</h1><h2><label><input id="mapbox" name="succes" value="5" type="checkbox" /> '+i18n['ui-found']+'</label></h2>', popupOptions),
            L.marker([1711, 871], {icon: Succes, title: i18n['succes-006-title']}).addTo(mymap).on('click', onMarkerClick).bindPopup('<iframe width="560" height="315" src="//www.youtube.com/embed/pBKixxEk71c?rel=0" frameborder="0" allowfullscreen></iframe><h1>'+i18n['succes-006-h1']+'</h1><h2><label><input id="mapbox" name="succes" value="6" type="checkbox" /> '+i18n['ui-found']+'</label></h2>', popupOptions)
        ];
        initmarker (markerssucces, "succes");
        nbtmark += markerssucces.length;
        console.log(i18n["ui-succes"] + markerssucces.length + i18n["ui-load"]);

        if (localStorage.nbtliyue) {
            nbtmark += Number(localStorage.nbtliyue);
        } else {
            localStorage.nbtliyue = 0;
        };
    
            // Marqueur de Bienvenue et d'infos

        //	L.marker([ 100, 150], {icon: Credits, title: "Crédits et Remerciements"}).addTo(mymap).bindPopup('<p><h4>Crédits et Remerciements</h4></p><p align="center"><h3>Conception :</h3></p><p align="center">TMKFrench</p><h3>Screenshots et Vidéos :</h3><p align="center">TMKFrench<br>ManqueDeBol<br>AstamoranVoz<br>Tumay<br>SupremB4N4N4</p><h3>Contributeurs et Aide :</h3><p align="center">Ackile<br>Larolina<br>Conan<br>kerthe17</p>', popupOptions);
        L.marker([ 100, 150], {icon: Alire, title: "Notes Importantes"}).addTo(mymap).bindPopup('<h4>Notes Importantes</h4><br><h3>Utilisation du Stockage Local :</h3><p style="color : red;">Ce site utilise un système de Stockage Local pour sauvegarder<br>vos préférences et avancement sur la Map (Menu et marqueurs).<br>En aucun cas nous ne recupérons et stockons de données personnelles.<br>Les fonctions de Reset et d\'Import/export agissent sur<br>les 2 maps de Mondstadt ET Liyue !!!</p>', popupOptions);
        if (sessionStorage.languagemap == "fr") {
            L.marker([  60,1943], {icon: Null, title: ""}).addTo(mymap).bindPopup('<h4><img src="media/logo.jpg"/><br>TMKFrench - LGDC</h4><h3>NOUVEAU !!! Tous les Panoramas<br>Bienvenue sur notre Map interactive !</h3><p>Cliquez sur une icône de votre choix pour plus d\'info.<br>Utilisez la molette de la souris pour zoomer<br>et le menu pour afficher ou masquer les POIs.<br><a style="color:red;">Nombre de Marker : ' + nbtmark + '</a><br><br><a style="color : red;"><strong>Release V3.5 du 11/11/2020</strong></a><br>Rajout des marqueurs pour les matériaux de farm<br>Passage au Stockage local à la place des cookies<br>Mise en ligne de la map de Liyue.<br><br>Si vous voulez participer en m\'envoyant de nouveaux<br>emplacements, n\'hésitez pas à me contacter<br>par mail à infomap@tmkfrench.fr ou par<br>MP sur discord : TMKFrench#4221', {'minWidth': '640px','minHeight': '480px'}).openPopup();
        } else {
            L.marker([  60,1943], {icon: Null, title: ""}).addTo(mymap).bindPopup('<h4><img src="media/logo.jpg"/><br>TMKFrench - LGDC</h4><h3>NEW !!! All Viewpoint<br>Welcome to our Interactive Map !</h3><p>Clic on a Marker of your choice for more information.<br>Use mouse wheel to zoom<br>and the menu to toggle POIs.<br><a style="color:red;">Marker\'s count : ' + nbtmark + '</a><br><br><a style="color : red;"><strong>Release V3.5 of 11/11/2020</strong></a><br>Adding Materials markers. Using local storage instead of cookies.<br>Liyue\'s Map is Online<br><br>If you want to participate, giving me new location on<br>map, feel free to contact me by mail<br>at infomap@tmkfrench.fr or by Discord PM : TMKFrench#4221', {'minWidth': '640px','minHeight': '480px'}).openPopup();
        };
    } else {
        loadmarker(liststatue,Statue,i18n.cat01,"statuel","");
        loadmarker(listteleport,Teleport,i18n.cat02,"tpl","");
        var markerspano = loadmarker(listpano,Pano,i18n.cat03,"panol","panol");
        initmarker (markerspano, "panol");
        var markerscordi = loadmarker(listcordi,Cordi,i18n.cat04,"ocl","cordil");
        initmarker (markerscordi, "cordil");
        var markerscdelic = loadmarker(listcdelic,Cdelic,i18n.cat05,"dcl","cdelicl");
        initmarker (markerscdelic, "cdelicl");
        var markerscprec = loadmarker(listcprec,Cprec,i18n.cat06,"pcl","cprecl");
        initmarker (markerscprec, "cprecl");
        var markerscluxe = loadmarker(listcluxe,Cluxe,i18n.cat07,"lcl","cluxel");
        initmarker (markerscluxe, "cluxel");
        var markerscdefi = loadmarker(listcdefi,Cdefi,i18n.cat08,"defil","cdefil");
        initmarker (markerscdefi, "cdefil");
        var markerscfee = loadmarker(listcfee,Cfee,i18n.cat09,"","cfeel");
        initmarker (markerscfee , "cfeel");
        var markersgeocul = loadmarker(listgeocul,Geocul,i18n.cat29,"geoc","geocul");
        initmarker (markersgeocul, "geocul");
        var markerssceaugeo = loadmarker(listsceaugeo,Sceaugeo,i18n.cat30,"sg","sceaugeo");
        initmarker (markerssceaugeo, "sceaugeo");
        loadmarker(listbambou,Bambou,i18n.cat31,"","");
        loadmarker(listperle,Perle,i18n.cat32,"","");
        loadmarker(listlotus,Lotus,i18n.cat33,"","");
        loadmarker(listqingxin,Qingxin,i18n.cat34,"","");
        loadmarker(listmuguet,Muguet,i18n.cat35,"muguet","");
        loadmarker(listpiment,Piment,i18n.cat36,"","");
        loadmarker(listlysverni,Lysverni,i18n.cat37,"","");
        loadmarker(listfsoie,Fsoie,i18n.cat38,"","");
        loadmarker(listjade,Jade,i18n.cat39,"","");
        loadmarker(listconque,Conque,i18n.cat40,"","");
        loadmarker(listlapis,Lapis,i18n.cat41,"","");
        var markerssucces = [
            L.marker([3146,1800], {icon: Succes, title: i18n["succesl-01-title"]}).addTo(mymap).on('click', onMarkerClick).bindPopup('<iframe width="560" height="315" src="//www.youtube.com/embed/lVXYQI-l2F4?rel=0" frameborder="0" allowfullscreen></iframe><br><h1>'+i18n["succesl-01-h1"]+'<br><h2><input id="mapbox" name="succesl" value="1" type="checkbox" /> '+i18n["ui-found"]+'</h2></h1>', popupOptions),
            L.marker([1991,2829], {icon: Succes, title: i18n["succesl-02-title"]}).addTo(mymap).on('click', onMarkerClick).bindPopup('<iframe width="560" height="315" src="//www.youtube.com/embed/SO7HtQ2JJP0?rel=0" frameborder="0" allowfullscreen></iframe><br><h1>'+i18n["succesl-02-h1"]+'<br><h2><input id="mapbox" name="succesl" value="2" type="checkbox" /> '+i18n["ui-found"]+'</h2></h1>', popupOptions)
        ];
        initmarker (markerssucces, "succesl");
        nbtmark += markerssucces.length;
        console.log(i18n["ui-succes"] + markerssucces.length + i18n["ui-load"]);

        localStorage.nbtliyue = nbtmark;
    };
// Fonctions Interaction Map

    mymap.on("click", onMapClick);

    mymap.on('popupopen', function () {
        $(":checkbox").on("change", function(){
            var checkboxtype = this.name;
            var checkboxnumber = this.value;
            var checkboxstate = this.checked;
            selectarray (checkboxtype, checkboxnumber, checkboxstate);
            markeropacity(checkboxstate);
        });
        if(document.getElementById("mapbox")){
            var checkboxtype = document.getElementById("mapbox").name;
            var checkboxnumber = document.getElementById("mapbox").value;
            var checkboxstate = activecb(checkboxtype,checkboxnumber);
            $("#mapbox").prop('checked', checkboxstate);
        };
    });

// Afficher / Masquer le Menu

    $('#activation-select-box').on('click', function() {
        if ($(this).hasClass('selecting')) {
            $(this).removeClass('selecting').text(i18n["ui-open"]);
            $('#activation-select-options').slideUp(150);
        } else {
            $(this).addClass('selecting').text(i18n["ui-close"]);
            $('#activation-select-options').slideDown(150);
        }
    });

    $('#activation-select-options li').on('click', function() {
        var val = $(this).attr('value');
        $(this).toggleClass('selected');
        $('.' + val).toggle();

        var listatut = [];
        $('#activation-select-options li').each(function(){
            if (!($(this).hasClass('section')) && !($(this).hasClass('selected')) && !($(this).hasClass('selectbtn'))) {
                listatut.push($(this).attr('value'));
            };
        });
        if (REGION === "mondstadt") {
            localStorage.MenumapgenshinMLi = JSON.stringify(listatut);
        } else {
            localStorage.MenumapgenshinLLi = JSON.stringify(listatut);
        };
    });

    $('.matbtn').on('click', function() {
        var ndf = $(this).attr('value');
        if ($(this).hasClass('pressed')) {
            $(this).attr('src', "media/icones/" + ndf + "on.png");
            $(this).toggleClass('pressed');
        } else {
            $(this).attr('src', "media/icones/" + ndf + "off.png");
            $(this).toggleClass('pressed');
        };
        $('.' + ndf).toggle();

        var btnstatut = [];
        $('.matbtn').each(function(){
            if (!($(this).hasClass('pressed'))) {
                btnstatut.push($(this).attr('value'));
            };
        });
        if (REGION === "mondstadt") {
            localStorage.MenumapgenshinMBtn = JSON.stringify(btnstatut);
        } else {
            localStorage.MenumapgenshinLBtn = JSON.stringify(btnstatut);
        };
    });

// Gestion des Boutons Menu Haut

    $('#BtnReset').on('click', function() {
        if (confirm(i18n["ui-prereset"])) {
            resetmarkers()
        }
    });

    $('#BtnEnglish').on('click', function() {
        localStorage.asken = 1;
        if (REGION === "mondstadt") {
            document.location.href='index.html';
        } else {
            document.location.href='indexl.html';
        };
    });

    $('#BtnFrench').on('click', function() {
        if (REGION === "mondstadt") {
            document.location.href='indexfr.html';
        } else {
            document.location.href='indexlfr.html';
        };
    });

    $('#BtnExport').on('click', function() {
        this.href=URL.createObjectURL(new Blob([JSON.stringify(savecookies())]));
        alert(i18n["ui-export"]);
    });

    $('#BtnImport').on('click', function (e) {
        var fileElem = document.getElementById("ImportBox");
        if (fileElem) {
            fileElem.click();
        }
        e.preventDefault();
    });

    $('#ImportBox').on('change', function(ev_) {
        var fr_;
        (fr_=new FileReader()).onload=function(ev_) {
            loadcookies(JSON.parse(this.result));
        };
        fr_.readAsText(this.files[0]);
    });

    $('#btnmap').on('click', function () {

        var lang = (typeof(sessionStorage.languagemap) && sessionStorage.languagemap === 'fr') ? 'fr' : '';
        var url = 'index' + ((REGION === 'mondstadt') ? 'l' : '') + lang + '.html';

        return document.location.href = url;
    });

    }); // Fin Fonction globale

    initarray();
    reselectmenu();
    openMenu();

}); // Fin Windows load
