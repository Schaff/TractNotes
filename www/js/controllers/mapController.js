angular.module('TractNotes').controller('MapCtrl', ['$scope',
    '$cordovaGeolocation',
    '$stateParams',
    '$ionicModal',
    '$ionicPopup',
    '$ionicPopover',
    function(
        $scope,
        $cordovaGeolocation,
        $stateParams,
        $ionicModal,
        $ionicPopup,
        $ionicPopover
    ) {

        /**
         * Once state loaded, get put map on scope.
         */
        $scope.$on("$stateChangeSuccess", function() {

            $scope.map = {
                Layercontrol: {
                    icons: {
                      uncheck: "fa fa-toggle-off",
                      check: "fa fa-toggle-on"
                    }
                },
                markers: {},
                events: {
                    map: {
                        enable: ['context'],
                        logic: 'emit'
                    }
                },
                layers: {
                    baselayers: {
                        mapbox_streets: {
                            name: 'Mapbox Streets',
                            url: 'http://api.tiles.mapbox.com/v4/{mapid}/{z}/{x}/{y}.png?access_token={apikey}',
                            type: 'xyz',
                            layerOptions: {
                                mapid: 'mapbox.streets'
                            }
                        },
                        mapbox_satellite: {
                            name: 'Mapbox Satellite',
                            url: 'http://api.tiles.mapbox.com/v4/{mapid}/{z}/{x}/{y}.png?access_token={apikey}',
                            type: 'xyz',
                            layerOptions: {
                                mapid: 'mapbox.satellite'
                            }
                        }
                    }
                }
            };

            $scope.map.center = {
                autoDiscover: true
            };
        });

        $ionicModal.fromTemplateUrl('templates/addLocation.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.modal = modal;
        });

        /**
         * Center map on user's current position
         */
        $scope.locate = function() {

            $cordovaGeolocation
                .getCurrentPosition()
                .then(function(position) {
                    $scope.map.center.lat = position.coords.latitude;
                    $scope.map.center.lng = position.coords.longitude;
                    $scope.map.center.zoom = 15;

                    $scope.map.markers.now = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                        message: "You Are Here",
                        focus: true,
                        draggable: false
                    };

                }, function(err) {
                    // error
                    console.log("Location error!");
                    console.log(err);
                });

        };

        // .fromTemplateUrl() method
        $ionicPopover.fromTemplateUrl('templates/filePopover.html', {
          scope: $scope
        }).then(function(popover) {
          $scope.popover = popover;
        });


        $scope.openPopover = function($event) {
          $scope.popover.show($event);
        };
        $scope.closePopover = function() {
          $scope.popover.hide();
        };
        //Cleanup the popover when we're done with it!
        $scope.$on('$destroy', function() {
          $scope.popover.remove();
        });
        // Execute action on hide popover
        $scope.$on('popover.hidden', function() {
          // Execute action
        });
        // Execute action on remove popover
        $scope.$on('popover.removed', function() {
          // Execute action
        });
    }
]);