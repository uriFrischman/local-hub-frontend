/**
 * Created by Uri on 2017-06-13.
 */


function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 34.397, lng: 150.644 },
        scrollwheel: false,
        zoom: 2
    });
    $.get("http://local-hub.herokuapp.com/api/items", function (data) {
        data.forEach(function (item) {
            var position = {lat: item.location.geolocation[0], lng: item.location.geolocation[1]};
            var marker = new google.maps.Marker({
                position: position,
                map: map,
                title: item.name
            });
        })
    })


}

var GOOGLE_MAPS_API_KEY = "AIzaSyDslgvFhh-aCwWDyk-A6fBMgU6wrrR95f8";


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

   $scope.searchForDevicesData = "";

   $scope.openAlertsModal = function () {
       $scope.alertsModal.activate();
   };

   $scope.itemsModalInfo = {};
   $scope.alertModalInfo = {};

   $scope.openItemsModal = function () {
       $scope.itemsModal.activate();
   };

   $scope.closeItemsModal = function () {
        $scope.itemsModal.deactivate();
   };

   $scope.closeAlertsModal = function () {
       $scope.alertsModal.deactivate();

   };

   $scope.devices = [];
   $scope.getDevices = function () {
       $http.get('http://local-hub.herokuapp.com/api/items').then(function (data) {
           $scope.devices = data.data;
           console.log($scope.devices)
       });
   };
   $scope.getDevices();

    function getRandomInRange(from, to, fixed) {
        return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
        // .toFixed() returns string, so ' * 1' is a trick to convert to number
    }

   $scope.addItem = function (data) {
           var formattedData = {
               name: data.name,
               type_of_device: data.type_of_device,
               _id: data.id,
               longitude: getRandomInRange(-180, 180,3).toString(),
               latitude: getRandomInRange(-180, 180,3).toString()
               // longitude: "40.7589",
               // latitude: "73.9851"
           };
           console.log(formattedData);
           $.post("http://local-hub.herokuapp.com/api/item", formattedData);
           $scope.getDevices();
   };

   $scope.addAlert = function (data) {

       var items = {};
       data.items.forEach(function (item, index) {
           // items[index.toString()] = JSON.parse(item);
           // items[index.toString()] = item;
           item = JSON.parse(item);
           items[index.toString()] = {"_id": item._id, "name": item.name, "item_longitude": item.location.geolocation[1].toString(), "item_latitude": item.location.geolocation[0].toString(), "type_of_device" :item.type_of_device}
       });


       var times = {
           "0": data.timeFrom.getHours().toString() + ":" + (data.timeFrom.getMinutes()<10?'0':'') + data.timeFrom.getMinutes(),
           "1": data.timeTo.getHours().toString() + ":" + (data.timeTo.getMinutes()<10?'0':'') + data.timeTo.getMinutes()
       };

        var formattedData = {
            name: data.name,
            distance: data.distanceInMeters.toString(),
            items: items,
            alert_latitude: getRandomInRange(-180,180,3).toString(),
            alert_longitude: getRandomInRange(-180, 180,3).toString(),
            times:times
        };
        $.post("http://local-hub.herokuapp.com/api/alert", formattedData);
        console.log("formatteddata", formattedData);
   };





   // $scope.sampleDevices = [
   //     {
   //        kind: 'car',
   //        name: "John's Car",
   //        location: '175 Main Street',
   //        needToAlert: true
   //     },
   //     {
   //         kind: 'wallet',
   //         name: "Bill's Wallet",
   //         location: '175 Main Street',
   //         needToAlert: true
   //     },
   //     {
   //         kind: 'keys',
   //         name: "Wayne's Keys",
   //         location: '175 Main Street',
   //         needToAlert: false
   //     },
   //     {
   //         kind: 'phone',
   //         name: "Sam's Nexus 5",
   //         location: '175 Main Street',
   //         needToAlert: false
   //     },
   //     {
   //         kind: 'car',
   //         name: "Bruce's Van",
   //         location: '175 Main Street',
   //         needToAlert: true
   //     },
   //     {
   //         kind: 'phone',
   //         name: "Josh's iPhone",
   //         location: '175 Main Street',
   //         needToAlert: false
   //     }
   // ];





});