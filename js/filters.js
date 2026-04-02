angular.module('app.filters', [])
    .filter('pathToBreadcrumb', function (calzatureService, $routeParams) {
        
        return function (input) {
            if ($routeParams.id) {
                let str1 = input.replace("/", "").replace("-", " ");
                let str2 = str1.split('/')[0];
                str2 = str2.charAt(0).toUpperCase() + str2.slice(1);
                let id = str1.split('/')[1];
                let str3;
                calzatureService.data.forEach(function(element) {
                    if (element.id == id) {
                        str3 = element.nome;
                    }
                });
                return str2 + "  /  " + str3;
            }
            else {
                let page = input.replace("/", "").replace("-", " ");
                page = page.charAt(0).toUpperCase() + page.slice(1);
                return page;
            }

        }
    })
    .filter('colorNameToSwatch', function ($sce) {
        return function (input) {
            let swatch = '<span class="color-swatch color-' + input + '"></span><span>' + input + '</span>';
            return $sce.trustAsHtml(swatch)
        }
    });