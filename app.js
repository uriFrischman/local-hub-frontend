/**
 * Created by Uri on 2017-06-13.
 */
var app = angular.module('localHubApp', ['localHubAppModals', 'localHubDirectives']);

// app.config(['$qProvider', function ($qProvider) {
//     $qProvider.errorOnUnhandledRejections(false);
// }]);

app.controller('localHubController', function ($scope, myModal, $http) {
   $scope.user = 'User';
   $scope.alertsModal;
   $scope.itemsModal;
   $scope.alertsModal = myModal.newModal('modal', 'localHubController');
   $scope.itemsModal = myModal.newModal('items-modal/items-modal', 'localHubController');



   $scope.openAlertsModal = function () {
       // $scope.alertsModal = myModal.newModal('modal', 'localHubController');
       // console.log($scope);
       // $scope.showModal = $scope.alertsModal.activate();
       $scope.alertsModal.activate();

   };

   $scope.itemsModalInfo = {};

   $scope.addNewItem = function () {
       console.log($scope.itemsModalInfo)
   };

   $scope.openItemsModal = function () {
       $scope.itemsModal.activate();
   }

   $scope.closeItemsModal = function () {
        $scope.itemsModal.deactivate();
   }

   $scope.closeAlertsModal = function () {

   }

   $scope.devices = $http.get('http://local-hub.herokuapp.com/api/items').then(function (data) {
       console.log(data.data);
   });

   $scope.addItem = function () {
   //    http://local-hub.herokuapp.com/api/item POST
   //    _id, name, latitude, longitude, type_of_device
   //     $http.post("http://local-hub.herokuapp.com/api/item",{
   //         "_id": "123",
   //         "name": "Test name",
   //         "latitude": "34.532",
   //         "longitude": "45.32",
   //         "type_of_device": "phone"
   //     });

       var data = {
           _id: "123",
           name: "Test name",
           latitude: 34.532,
           longitude: 45.32,
           type_of_device: "phone"
       };

       // var xhr = new XMLHttpRequest();
       // xhr.open('POST', 'http://local-hub.herokuapp.com/api/item');
       // xhr.setRequestHeader('Content-Type', "application/x-www-form-urlencoded");
       // xhr.onload = function() {
       //     if (xhr.status === 200) {
       //         var userInfo = JSON.parse(xhr.responseText);
       //     }
       // };
       // xhr.send(JSON.stringify(data));


       $http({
           method: 'POST',
           url: "http://local-hub.herokuapp.com/api/item",
           data: data,
           headers : {'Content-Type': 'application/x-www-form-urlencoded'}

       }).then(function (data) {
           console.log(data);
       });
       console.log("added item");
   };


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