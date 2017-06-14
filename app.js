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
            google.maps.event.addListener(marker , 'click', function(){
                var infowindow = new google.maps.InfoWindow({
                    content:marker.title,
                    position: marker.position,
                });
                infowindow.open(map);
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
   $scope.user = 'ITC';

   $scope.openAlertsModal = function () {
       $scope.alertsModal = myModal.newModal('modal', 'localHubController');
       $scope.alertsModal.activate();
   };

   $scope.itemsModalInfo = {};
   $scope.alertModalInfo = {};

   $scope.openItemsModal = function () {
       $scope.itemsModal = myModal.newModal('items-modal/items-modal', 'localHubController');
       $scope.itemsModal.activate();
   };

   $scope.closeItemsModal = function () {
       $(".itemsModal").remove();
   };


   $scope.closeAlertsModal = function () {
       $(".alertsModal").remove();

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
        if (data.long && data.lat) {
            var formattedData = {
                name: data.name,
                type_of_device: data.type_of_device,
                _id: data.id,
                longitude: data.long,
                latitude: data.lat
            };
        } else {
            var formattedData = {
                name: data.name,
                type_of_device: data.type_of_device,
                _id: data.id,
                longitude: getRandomInRange(-180, 180,3).toString(),
                latitude: getRandomInRange(-180, 180,3).toString()
            };
        }

           console.log(formattedData);
           $.post("http://local-hub.herokuapp.com/api/item", formattedData, function (data) {
               console.log("hruejioejfgdisho")
               $scope.devices.push(formattedData);
               console.log($scope.devices.length)
           });
           // $scope.devices = $scope.getDevices();
       $(".itemsModal").remove();
   };

   $scope.addAlert = function (data) {

       var items = {};
       data.items.forEach(function (item, index) {
           // items[index.toString()] = JSON.parse(item);
           // items[index.toString()] = item;
           item = JSON.parse(item);
           items[index.toString()] = {"_id": item._id, "name": item.name, "item_longitude": item.location.geolocation[1].toString(), "item_latitude": item.location.geolocation[0].toString(), "type_of_device" :item.type_of_device}
       });
       console.log('ITEMS', items['0'])


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
       $(".alertsModal").remove();
   };

    $scope.needToAlert = function () {
        $http.get("http://local-hub.herokuapp.com/api/alerts").then(function (data) {
            var allAlerts = data.data;
            allAlerts.forEach(function (alert) {
                if (alert.needs_to_alert) {
                    console.log("these need to be updated");
                    alert.items.forEach(function (item) {
                        console.log(item)
                    })
                } else {
                    console.log("these do not need to be updated");
                    alert.items.forEach(function (item) {
                        console.log(item)
                        var index = $scope.devices.indexOf(item);
                        console.log(index)
                    })
                }
            })
        })
    }


   //random-gps-server.herokuapp.com/move/ID OF ITEM


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