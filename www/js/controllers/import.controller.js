(function() {
    'use strict';

    angular
        .module('TractNotes')
        .controller('ImportController', ImportController);

    ImportController.$inject = ['$rootScope', 'xmldataService', 'Drive', '$state'];

    /* @ngInject */
    function ImportController($rootScope, xmldataService, Drive, $state) {
        var vm = this;
        vm.title = 'ImportController';
        vm.importButton = importButton;
        vm.files = [];
        vm.type = [];
        vm.source = [];
        vm.selectedSource = null;
        vm.selectedType = null;

        activate();

        ////////////////

        function activate() {
            vm.type = [
              { text: "GPX", value: "gpx" },
              { text: "KML", value: "kml" }
            ];

            vm.source = [
              { text: "Google Drive", value: "drive" },
              { text: "Device", value: "device" },
              { text: "URL", value: "url" }
            ];
        }

        // @todo error handling

        function importButton(url) {
            if(vm.selectedSource == "drive") {
                var auth_token = gapi.auth.getToken();
                if(auth_token) {
                    importFromDrive();
                }
            }
            if(vm.selectedSource == "url") {
                sendImportURL(url);
            }
        }

        function importFromDrive() {
            Drive.readFilesOfType(vm.selectedType).then(function(files) {
                console.log("FileRead: success.");
                Drive.setFileList(files);
                $state.go('app.drive');
            }, function() {
                console.log("FileRead: error.");
            });
            
            //Google Picker API 
            // Drive.showPicker().then(function(id) {
            //     vm.id = id;
            //     console.log("FileSelection: success.");
            //     }, function() {
            //         console.log("FileSelection: error.");
            //         });
        }

        function sendImportURL(url) {
            xmldataService.setImportURL(url);            
        }
    }
})();