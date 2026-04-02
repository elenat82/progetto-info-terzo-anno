angular.module('app.services', [])
    .service('calzatureService', ['$http', function($http) {
        this.getCalzature = function() {
            var url = "calzature.json";
            return $http.get(url)
                .then(function(response) {
                        return response.data;
                    },
                    function(error) {
                        console.log(error);
                        return error;
                    }
                )
        }

        this.getTaglie = function() {
            var url = "taglie.json";
            return $http.get(url)
                .then(function(response) {
                        return response.data
                    },
                    function(error) {
                        console.log(error);
                        return response.data
                    }
                )
        }
    }])
    .service('boutiquesService', ['$http', '$rootScope', function($http, $rootScope) {
        this.getBoutiques = function() {
            var url = "boutiques.json";
            return $http.get(url)
                .then(function(response) {
                        return response.data;
                    },
                    function(error) {
                        console.log(error);
                    }
                )
        }
        this.emettiEvento = function(index) {
            $rootScope.$broadcast('apriInfo', {markerId: index});
        }
    }])
    .service('sumisuraService', ['$http', function($http) {
        this.getSumisura = function() {
            var url = "sumisura.json";
            return $http.get(url)
                .then(function(response) {
                        return response.data;
                    },
                    function(error) {
                        console.log(error);
                    }
                )
            return d.promise;
        }
    }]);