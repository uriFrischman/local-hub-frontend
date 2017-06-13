/**
 * Created by Uri on 2017-06-13.
 */
var app = angular.module('localHubDirectives', []);

app.directive('sliderItemCard', function () {
    return {
        restrict: 'E',
        templateUrl: 'templates/slider_device/slider-device.html',
        scope: {
            device: '=device'
        }
    };
})