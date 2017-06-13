/**
 * Created by Uri on 2017-06-13.
 */
var app = angular.module('localHubApp', ['localHubAppModals', 'localHubDirectives']);

app.controller('localHubController', function ($scope, myModal) {
   $scope.user = 'User';

   $scope.showModal = myModal.activate;


   $scope.sampleDevices = [
       {
          kind: 'car',
          name: "John's Car",
          location: '175 Main Street',
          needToAlert: true
       },
       {
           kind: 'wallet',
           name: "Bill's Wallet",
           location: '175 Main Street',
           needToAlert: true
       },
       {
           kind: 'keys',
           name: "Wayne's Keys",
           location: '175 Main Street',
           needToAlert: false
       },
       {
           kind: 'phone',
           name: "Sam's Nexus 5",
           location: '175 Main Street',
           needToAlert: false
       },
       {
           kind: 'car',
           name: "Bruce's Van",
           location: '175 Main Street',
           needToAlert: true
       },
       {
           kind: 'phone',
           name: "Josh's iPhone",
           location: '175 Main Street',
           needToAlert: false
       }
   ];

});