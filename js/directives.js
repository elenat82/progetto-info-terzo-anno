angular.module('app.directives', [])
    .directive('navbar', [function () {
        return {
            templateUrl: 'templates/navbar.html',
            controller: function ($scope, $location) {
                $scope.isActive = function (path) {
                    return $location.path() == path;
                };

                $scope.chiedi = function () {
                    let risposta = confirm("Vuoi veramente andare alla pagina dei grafici?");
                    if (risposta) {
                        open('grafici.html', '_blank');
                        localStorage.setItem('graficiVisitati', true);
                    }
                }
            },
        };

    }])
    .directive('breadcrumbs', [function () {
        return {
            templateUrl: 'templates/breadcrumbs.html',
            controller: function ($scope, $location) {
                $scope.getPagina = function () {
                    return $location.path();
                };
            },
        };
    }])
    .directive('footerdr', [function () {
        return {
            templateUrl: 'templates/footerdr.html',
            controller: function ($scope) {
            },
        };

    }])
    .directive('mappa', ['$timeout', '$rootScope', function ($timeout, $rootScope) {
        return {
            scope: {
                stores: '='
            },
            template: '<div id="map"></div>',
            controller: function ($scope) {
            },
            /* Directives that want to modify the DOM typically use the link option to register DOM listeners as well as update the DOM. It is executed after the template has been cloned and is where directive logic will be put. */
            link: function (scope, element, atttributes) {
                let torino = new google.maps.LatLng(45.09481513136826, 7.656851351752984);
                let bounds = new google.maps.LatLngBounds(torino);
                let map = new google.maps.Map(document.getElementById("map"), {
                    center: torino
                });
                let markers = [];
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(
                        function (position) {
                            map.setCenter({
                                lat: position.coords.latitude,
                                lng: position.coords.longitude,
                            });
                        },
                        function (error) {
                            switch (error.code) {
                                case error.PERMISSION_DENIED:
                                    console.log("permesso negato");
                                    break;
                                case error.POSITION_UNAVAILABLE:
                                    console.log("posizione non disponibile");
                                    break;
                                case error.TIMEOUT:
                                    console.log("timeout");
                                    break;
                                case error.UNKNOWN_ERROR:
                                    console.log("errore sconosciuto");
                                    break;
                            }
                        }
                    );
                }
                scope.stores.forEach(function(element) {
                    let marker = new google.maps.Marker({
                        position: new google.maps.LatLng(element.lat, element.lng),
                        map: map
                    });
                    let infowindow = new google.maps.InfoWindow({
                        content: '<h4>' + element.nome + '</h4>',
                        ariaLabel: element.nome,
                        pixelOffset: new google.maps.Size(element.markerOffsetX, element.markerOffsetY)
                    });
                    marker.addListener("click", function () {
                        infowindow.open({
                            anchor: marker,
                            map,
                        });
                    });
                    bounds.extend(marker.position);
                    markers.push(marker);
                    $timeout(function () {
                        //devo usare il timeout perchè fitBounds non funziona quando la mappa non è visibile
                        map.fitBounds(bounds);
                    }, 1250);
                });

                $rootScope.$on('apriInfo', function (event, data) {
                    google.maps.event.trigger(markers[data.markerId], 'click');
                });

                element.on('$destroy', function () {
                    //map = null;
                });
            }
        };

    }])
    .directive('loader', [function () {
        return {
            templateUrl: 'templates/loader.html',
            controller: function ($scope, $location, $rootScope) {
            },
        };

    }]);

