angular.module('app.controllers', [])
    .controller('homeCtrl', ['$scope', 'calzatureService', function ($scope, calzatureService) {
        calzatureService.getCalzature().then(
            function (res) {
                $scope.calzature = res;
                calzatureService.data = res;
                $scope.ultimiArrivi = [$scope.calzature[0], $scope.calzature[13], $scope.calzature[12], $scope.calzature[8]];
            },
            function (err) {
                console.log(err)
            });
        $('#carousel-example-generic').carousel({
            interval: 5000,
            cycle: true
        });
        $(".titolo-accordion").click(function () {
            if ($(this).children(".contenuto-accordion").is(":visible")) {
                $(".contenuto-accordion").hide("slow");
            }
            else {
                $(".contenuto-accordion").hide("slow");
                $(this).children(".contenuto-accordion").show("slow");
            }
        });

        let nswForm = document.getElementById("nws-form");
        let nswEmail = document.getElementById('nws-email');
        let btn = document.getElementById("nws-btn");
        let requirederror = document.getElementById("requirederror");
        let emailerror = document.getElementById("emailerror");
        nswEmail.addEventListener("keyup", function (event) {
            emailerror.hidden = true;
            requirederror.hidden = true;
            this.parentElement.classList.remove('has-error');
            this.parentElement.classList.remove('has-success');
            if (this.checkValidity()) {
                //btn.setAttribute("aria-disabled",false);
                this.parentElement.classList.add('has-success');
            }
            else {
                //btn.setAttribute("aria-disabled",true);
                if (nswEmail.validity.typeMismatch) {
                    emailerror.hidden = false;
                }
                if (nswEmail.validity.valueMissing) {
                    requirederror.hidden = false;
                }
                this.parentElement.classList.add('has-error');
            }
        });
        nswForm.addEventListener("submit", function (event) {
            if (!this.checkValidity()) {
                event.preventDefault();
                //btn.setAttribute("aria-disabled",true);
                if (nswEmail.validity.typeMismatch) {
                    emailerror.hidden = false;
                }
                if (nswEmail.validity.valueMissing) {
                    requirederror.hidden = false;
                }
                nswEmail.focus();
                nswEmail.parentElement.classList.remove('has-success');
                nswEmail.parentElement.classList.add('has-error');
            }
        })
    }])
    .controller('calzatureCtrl', ['$scope', 'calzatureService', function ($scope, calzatureService) {
        $scope.calzature = calzatureService.data;
        $scope.filteredCalzature = [];
        $scope.colori = [];
        $scope.altezzeTacco = [];
        $scope.filtri = {
            colore: {},
            altezzeTacco: {}
        };
        $scope.calzature.forEach(function (element) {
            if ($scope.colori.indexOf(element.colore) == -1) {
                $scope.colori.push(element.colore);
                $scope.colori.sort();
                $scope.filtri.colore[element.colore] = true;
            }
            if ($scope.altezzeTacco.indexOf(element.altezzaTacco) == -1) {
                $scope.altezzeTacco.push(element.altezzaTacco);
                $scope.altezzeTacco.sort(function (a, b) { return a - b });
                $scope.filtri.altezzeTacco[element.altezzaTacco] = true;
            }
        });
        $scope.filtraPerColore = function (el) {
            if (angular.isDefined(el)) {
                let colorecalzatura = el.colore;
                return $scope.filtri.colore[colorecalzatura];
            }
        }
        $scope.filtraPerTacco = function (el) {
            if (angular.isDefined(el)) {
                let altezzaTacco = el.altezzaTacco;
                return $scope.filtri.altezzeTacco[altezzaTacco];
            }
        }
    }])
    .controller('dettaglioCtrl', ['$scope', 'calzatureService', '$routeParams', function ($scope, calzatureService, $routeParams) {
        $scope.taglie = [];
        calzatureService.getTaglie().then(
            function (res) {
                $scope.taglie = res;
            },
            function (err) {
                console.log(err);
            });
        calzatureService.data.forEach(function (el) {
            if (el.id == $routeParams.id) {
                $scope.dettaglio = el;
            }
        });
        $scope.acquista = function () {

        }
    }])
    .controller('boutiquesCtrl', ['$scope', 'boutiquesService', function ($scope, boutiquesService) {
        $scope.stores;
        boutiquesService.getBoutiques()
            .then(function (response) {
                $scope.stores = response;
            },
                function (error) {
                    console.log(error);
                });
        $scope.emettiEvento = function (index) {
            boutiquesService.emettiEvento(index);
        }

        $scope.apriModale = function () {
            $('#modaleBoutique').modal({
                backdrop: true
            });
            $('#modaleBoutique').on('hidden.bs.modal', function (event) {


            })
        }

        $('#boutique').submit(function (event) {
            let nome = $('#nome').val();
            let email = $('#email').val();
            let messaggio = $('#messaggio').val();
            let campicompilati = nome && email && messaggio;
            let emilvalida = email.indexOf("@") != -1 && email.indexOf(".");
            let nomeRequired = $('#nome-required');
            let emailRequired = $('#email-required');
            let emailError = $('#email-error');
            let messaggioRequired = $('#messaggio-required');

            if (campicompilati && emilvalida) {
                nomeRequired.hide();
                emailRequired.hide();
                emailError.hide();
                messaggioRequired.hide();
                $('#modaleBoutique').modal('hide');
            }
            else {
                if (!nome) {
                    nomeRequired.show();
                }
                if (!email) {
                    emailRequired.show();
                }
                if (!emilvalida) {
                    emailError.show();
                }
                if(!messaggio) {
                    messaggioRequired.show();
                }
                event.preventDefault();
            }

        })

    }])
    .controller('sumisuraCtrl', ['$scope', 'sumisuraService', function ($scope, sumisuraService) {
        $scope.colori = [];
        $scope.tessuti = [];
        $scope.chiusure = [];
        $scope.decori = [];
        $scope.punte = [];
        sumisuraService.getSumisura().then(
            function (response) {
                $scope.colori = response.colori;
                $scope.tessuti = response.tessuti;
                $scope.chiusure = response.chiusure;
                $scope.decori = response.decori;
                $scope.punte = response.punte;
            },
            function (error) {
                console.log('error: ', error);
            });
        let sumisuraForm = document.getElementById("sumisuraform");
        let campivalidi = [];
        let campiInvalidi = [];
        let riepilogo = "";
        sumisuraForm.addEventListener("submit", function (event) {
            const elements = document.getElementsByClassName("alert-danger");
            while (elements.length > 0) {
                elements[0].parentNode.removeChild(elements[0]);
            }
            for (let i = 0; i < sumisuraForm.elements.length; i++) {
                const element = sumisuraForm.elements[i];
                riepilogo += element.name + " ";
                riepilogo += element.value + " ";
                if (element.validity.valid) {
                    campivalidi.push(element);
                }
                else {
                    campiInvalidi.push(element);
                }
            }
            if (campivalidi.length === sumisuraForm.elements.length) {
                campivalidi = [];
                const divElement = document.createElement("div");
                divElement.classList.add("well");
                const node = document.createTextNode("Riepilogo: " + riepilogo);
                divElement.appendChild(node);
                const element = document.getElementById("dati-form");
                element.appendChild(divElement);
                $('#modaleIndirizzo').modal({
                    backdrop: true
                });
                $('#modaleIndirizzo').on('hidden.bs.modal', function (event) {
                    riepilogo = "";
                    const divRiepilogo = document.getElementById("dati-form");
                    while (divRiepilogo.firstChild) {
                        divRiepilogo.removeChild(divRiepilogo.lastChild);
                    }
                    //oppure con jquery
                    //$("#dati-form").empty();
                })
            }
            else {
                event.preventDefault();
                campiInvalidi.forEach(function (campo) {
                    const divElement = document.createElement("div");
                    divElement.classList.add("alert", "alert-danger");
                    const iconSpan = document.createElement("span");
                    iconSpan.classList.add("glyphicon", "glyphicon-exclamation-sign");
                    const messageSpan = document.createElement("span");
                    const node = document.createTextNode(campo.validationMessage);
                    messageSpan.appendChild(node);
                    divElement.appendChild(iconSpan);
                    divElement.appendChild(messageSpan);
                    campo.parentNode.appendChild(divElement);
                });
                campiInvalidi = [];
            }
            $('.input-indirizzo').change(function (event) {
                $(this).parent().next(".alert").remove();
                $(this).parent().removeClass('has-success')
                $(this).parent().removeClass('has-error');
                if ($(this).val() == "") {
                    $(this).parent().removeClass('has-success').addClass('has-error');
                    $(this).parent().after($('<div class="alert alert-danger"><span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span><span class="sr-only">Error:</span><span>Il campo è obbligatorio.</span></div>'));
                    $(this).focus();
                }
                else {
                    $(this).parent().next(".alert").remove();
                    if ($(this).attr("name") == "cap") {
                        if ($(this).val().length == 5) {
                            $(this).parent().removeClass('has-error').addClass('has-success');
                        }
                        else {
                            $(this).parent().removeClass('has-success').addClass('has-error');
                            $(this).parent().after($('<div class="alert alert-danger"><span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span><span class="sr-only">Error:</span><span>Il campo deve essere lungo 5 caratteri.</span></div>'));
                            $(this).focus();
                        }
                    }
                    else if ($(this).attr("name") == "provincia") {
                        if ($(this).val().length == 2) {
                            $(this).parent().removeClass('has-error').addClass('has-success');
                        }
                        else {
                            $(this).parent().removeClass('has-success').addClass('has-error');
                            $(this).parent().after($('<div class="alert alert-danger"><span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span><span class="sr-only">Error:</span><span>Il campo deve essere lungo 2 caratteri.</span></div>'));
                            $(this).focus();
                        }
                    }
                    else {
                        $(this).parent().removeClass('has-error').addClass('has-success');
                        $(this).parent().next(".alert").remove();
                    }
                }
            });

            $('#indirizzo').submit(function(event) {
                if ($('.has-success').length == 4) {
                    $('#modaleIndirizzo').modal('hide');
                }
            })
        })
    }])
    .controller('contattiCtrl', ['$scope', function ($scope) {
        $scope.user = {};
        $scope.opzioniInvio = [{ id: 1, nome: "Servizio clienti" }, { id: 2, nome: "Stampa e media" }, { id: 3, nome: "Altre richieste" }, { id: 4, nome: "Risorse umane" }];
        $scope.invia = function () {
            const divElement = document.createElement("div");
            divElement.classList.add("well");
            const node = document.createTextNode("Nome: " + $scope.user.nome + " Cognome: " + $scope.user.cognome + " Email " + $scope.user.email + " Invia a: " + $scope.user.inviaa.nome + " Messaggio: " + $scope.user.messaggio);
            divElement.appendChild(node);
            const element = document.getElementById("dati-form");
            element.appendChild(divElement);
        }
    }]);