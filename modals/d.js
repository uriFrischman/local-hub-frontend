angular.module('localHubAppModals', [
    'btford.modal'
]).

// let's make a modal called `myModal`
factory('myModal', function (btfModal) {
    return {
        newModal: function (fileName, controller) {
            return btfModal({
                controller: controller,
                controllerAs: 'modal',
                templateUrl: 'modals/' + fileName +'.html'
            });
        }
    }
    // return btfModal({
    //     controller: 'MyModalCtrl',
    //     controllerAs: 'modal',
    //     templateUrl: 'modals/modal.html'
    // });
}).

// typically you'll inject the modal service into its own
// controller so that the modal can close itself
controller('MyModalCtrl', function ($scope, $timeout, myModal) {

    $scope.closeMe = function () {
        myModal.deactivate();
    };
});