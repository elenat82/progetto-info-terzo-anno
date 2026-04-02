angular.module('app', ['app.controllers', 'app.directives', 'app.filters', 'app.services', 'ngRoute', 'ngAnimate', 'ngSanitize'])

    .config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
        $routeProvider.when(
            '/calzature', {
            templateUrl: 'templates/calzature.html',
            controller: 'calzatureCtrl'
        })
        .when(
            '/calzature/:id', {
            templateUrl: 'templates/dettaglio.html',
            controller: 'dettaglioCtrl'
        })
            .when(
                '/boutiques', {
                templateUrl: 'templates/boutiques.html',
                controller: 'boutiquesCtrl'
            })
            .when(
                '/su-misura', {
                templateUrl: 'templates/su-misura.html',
                controller: 'sumisuraCtrl'
            })
            .when(
                '/contatti', {
                templateUrl: 'templates/contatti.html',
                controller: 'contattiCtrl'
            })
            .when(
                '/home', {
                templateUrl: 'templates/home.html',
                controller: 'homeCtrl'
            });
        $routeProvider.otherwise(
            //{template : "<p>Pagina non trovata</p>"}
            { redirectTo: '/home' });

        //https://stackoverflow.com/a/16570533/9113074
        $locationProvider.html5Mode(true);
    }])

    .run(function ($rootScope, $timeout, $location, $route, $routeParams) {
        $rootScope.$on("$routeChangeStart", function (event, current,
            previous, rejection) {
            $rootScope.loading = true;
        });
        //questo è l'evento che ng-view ascolta per istanziare il nuovo controller
        $rootScope.$on("$routeChangeSuccess", function (event, current,
            previous, rejection) {
            $timeout(function () {
                $rootScope.loading = false;
            }, 1000);
        });
        $rootScope.$on("$routeChangeError", function (event, current,
            previous, rejection) {
            console.log("error");
        })
    });
