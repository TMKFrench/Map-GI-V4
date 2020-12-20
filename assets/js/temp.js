  function onMapClick(e) {
    console.log("Position @ " + map.project([e.latlng.lat, e.latlng.lng], map.getMaxZoom()));
  }

  function unproject(coord) {
    return map.unproject(coord, map.getMaxZoom());
  }

  function updateCurrentMarker() {
    currentMarker = this;
  }

  function saveUserMarkers(uid, checked) {
    var markers = getUserMarkers();

    if(checked) {
      if(markers.indexOf(uid) < 0) {
        markers.push(uid);
      }
      currentMarker.setOpacity(.5);
    } else {
      if(markers.indexOf(uid) >= 0) {
        markers.splice(markers.indexOf(uid), 1);
      }
      currentMarker.setOpacity(1);
    }

    localStorage.setItem('userMarkers', JSON.stringify(markers));
  }

  function getUserMarkers() {
    var markers = localStorage.getItem('userMarkers');

    if(!markers) {
      markers = [];
    } else {
      markers = JSON.parse(markers);
    }

    return markers;
  }

  function getParamsURL() {
    var url = location.search,
        query = url.substr(1),
        result = {};

    query.split("&").forEach(function(part) {
      var item = part.split("=");
      result[item[0]] = decodeURIComponent(item[1]);
    });

    return result;
  }

  function popUpOpen(e) {
    var content = e.popup.getContent();

    if($(content).find('input#user-marker').length > 0) {
      var userMarkers = getUserMarkers();
      if(userMarkers.indexOf( $(content).find('input#user-marker').first().data('id') ) >= 0) {
        $('input#user-marker[data-id="'+$(content).find('input#user-marker').first().data('id')+'"]').prop('checked', 'checked');
      }
    }
  }



  var currentMarker;
  var total = 0;
  var params = getParamsURL();
  var userMarkers = getUserMarkers();

  // Initialisation de la carte
  var map = new L.Map('map', {
      center : [0,0],
      zoom : 4,
      zoomControl: false
  });



  // Générer les layers
  var groups = [
    'statue', 'teleporter', 'anemoculus', 'geoculus', 'panorama', 'mondstadtshrine', 'liyueshrine', 'seelie',
    'jueyunchili', 'valberry', 'itswarm', 'overlookingview', 'dungeon'
  ];
  groups.forEach(function(e) {
    window[e+'Group'] = L.layerGroup();
  });



  // Liste des marqueurs
  var markers = [
    {
      id: 'statue',
      group: statueGroup,
      icon: statueIcon,
      format: 'image',
      title: 'Statue des Sept',
      markers: [
        {
          id: 'mondstadt01',
          coords: [5424, 2556],
        },
       ]

    },
    ]


  // Création de la carte
  L.tileLayer('assets/img/tiles/{z}/{x}/{y}.jpg', {
      attribution: '<a href="https://gaming.lebusmagique.fr">Le Bus Magique Gaming</a>',
      maxZoom: 5,
      minZoom: 3,
      continuousWorld: true,
      maxBoundsViscosity: 0.8,
      noWrap: true
  }).addTo(map);

  var toolbarZoom = L.easyBar([
    L.easyButton( '<img src="assets/img/plus.png">',  function(control, map){map.setZoom(map.getZoom()+1);}),
    L.easyButton( '<img src="assets/img/minus.png">',  function(control, map){map.setZoom(map.getZoom()-1);}),
  ]);

  var toolbarMenu = L.easyBar([
    L.easyButton( '<img src="assets/img/menu.png">',  function(control, map){
      $('body').toggleClass('show-menu');
      map.invalidateSize();
    }),
  ]);

  var toolbarResetMarkers = L.easyBar([
    L.easyButton( '<img src="assets/img/reset.png">',  function(control, map){
      if(confirm('Êtes-vous sûr de vouloir supprimer le suivi de vos marqueurs ?')) {
        localStorage.removeItem('userMarkers');
        window.location.reload();
      }
    }),
  ]);

  var toolbarInfo = L.easyBar([
    L.easyButton( '<img src="assets/img/info.png">',  function(control, map){var lightbox = lity('#info');}),
  ]);

  toolbarZoom.addTo(map);
  toolbarMenu.addTo(map);
  toolbarResetMarkers.addTo(map);
  toolbarInfo.addTo(map);



  // Génération des marqueurs
  markers.forEach(function(g) {

    g.markers.forEach(function(m){
      var checkbox = '', icon, format, title = '', text = '', guide = '';

      if((typeof m.checkbox !== 'undefined' && m.checkbox) || (typeof g.checkbox !== 'undefined' && g.checkbox))
        checkbox = '<label><input type="checkbox" id="user-marker" data-id="'+g.id+m.id+'" /><span>Terminé</span></label>';

      if(typeof g.text !== 'undefined')
        text = '<p>'+g.text+'</p>';
      if(typeof m.text !== 'undefined')
        text = '<p>'+m.text+'</p>';

      if(typeof g.title !== 'undefined')
        title = '<h4>'+g.title+'</h4>';
      if(typeof m.title !== 'undefined')
        title = '<h4>'+m.title+'</h4>';

      if(typeof g.guide !== 'undefined')
        guide = '<a href="'+g.guide+'" class="guide" target="_blank">Guide</a>';
      if(typeof m.guide !== 'undefined')
        if(typeof g.guide !== 'undefined' && m.guide.substr(0, 1) === '#')
          guide = '<a href="'+g.guide+m.guide+'" class="guide" target="_blank">Guide</a>';
        else
          guide = '<a href="'+m.guide+'" class="guide" target="_blank">Guide</a>';

      icon = (typeof m.icon !== 'undefined') ? m.icon : g.icon;
      format = (typeof m.format !== 'undefined') ? m.format : g.format;

      var marker = L.marker(unproject(m.coords), {icon: icon});

      if(format === 'popup')
        marker.bindPopup(title+text+guide+checkbox);
      else if(format === 'video')
        marker.bindPopup(title+'<a class="video" href="//www.youtube.com/watch?v='+m.video+'" data-lity><img src="https://i.ytimg.com/vi/'+m.video+'/hqdefault.jpg" /></a>'+text+guide+checkbox);
      else if(format === 'image')
        marker.bindPopup(title+'<a href="assets/img/medias/'+g.id+m.id+'.jpg" class="image" data-lity><img src="assets/img/medias/'+g.id+m.id+'-thumb.jpg" onerror="this.src=\'assets/img/medias/default.jpg\'" /></a>'+text+guide+checkbox);
      else if(format === 'banner')
        marker.bindPopup(title+'<img src="assets/img/medias/'+g.id+m.id+'.jpg" onerror="this.src=\'assets/img/medias/default.jpg\'" />'+text+guide+checkbox);

      if(checkbox)
        marker.on('click', updateCurrentMarker);

      marker.addTo(g.group);
      total++;

      if(userMarkers.indexOf(g.id+m.id) >= 0)
        marker.setOpacity(.5);

    });

  });

  $('#total').text(total);



  // Limites de la carte
  map.setMaxBounds(new L.LatLngBounds(unproject([1024,1024]), unproject([7168, 7168])));



  // Afficher les coordonnées du clic
  map.on('click', onMapClick);



  // Masquer tous les layers
  groups.forEach(function(e) {
    map.removeLayer(window[e+'Group']);
  });



  // Gérer le contenu de la popup
  map.on('popupopen', popUpOpen);



  $(document).ready(function() {

    var w = window.innerWidth;
    if(w <= 500) {
      $('body').removeClass('show-menu');
      map.invalidateSize();
    }

    if(params.x && params.y) {
      var zoom = (params.z && ['4', '5'].indexOf(params.z) >= 0) ? params.z : 4;
      map.setView(unproject([params.x, params.y]), zoom);
    }

    if(params.markers) {
      var pmarkers = params.markers.split(',');
      pmarkers.forEach(function(e) {
        if(typeof window[e+'Group'] !== 'undefined') {
          $('#menu a[data-type="'+e+'"]').addClass('active');
          map.addLayer(window[e+'Group']);
        }
      });
    }

    if(params['hide-menu']) {
      $('body').removeClass('show-menu');
      map.invalidateSize();
    }

    $(document).on('change', 'input[type="checkbox"]', function() {
      saveUserMarkers($(this).data('id'), $(this).is(':checked'));
    });

    $('#menu a[data-type]').on('click', function(e){
      e.preventDefault();

      var type = $(this).data('type');

      if($(this).hasClass('active')) {
        map.removeLayer(window[type+'Group']);
      } else {
        map.addLayer(window[type+'Group']);
      }

      $(this).toggleClass('active');
    });
  });