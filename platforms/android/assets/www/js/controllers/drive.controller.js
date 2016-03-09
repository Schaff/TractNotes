(function() {
    'use strict';

    angular
        .module('TractNotes')
        .controller('DriveController', DriveController);

    DriveController.$inject = ['$scope', 'Drive', '$state', 'xmldataService'];

    /* @ngInject */
    function DriveController($scope, Drive, $state, xmldataService) {

        var vm = this;
        vm.title = 'DriveController';
        // vm.files = [];

        // function getFiles() {
        vm.files = Drive.getFileList();
        // }

        activate();

        ////////////////

        function activate() {}

        vm.importFromURL = function(file) {
            window.alert(file.url);
            xmldataService.setImportURL(file.url);
        }
    }
})();