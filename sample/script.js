angular.module('angularApp', ['angular.selection'])

.controller('MainController', function($scope) {
    
    $scope.apps = [{
        name: 'Virtual Line',
        logo: 'https://d2hlei1umhw6cd.cloudfront.net/icons/virtualline_128x128_2.png',
        description: 'Sales & Support Hotline'
    }, {
        name: 'SIP',
        logo: 'https://d2hlei1umhw6cd.cloudfront.net/icons/sip_128x128_2.png',
        description: 'Enterprise voice for IP-PBX'
    }, {
        name: 'Call Recording',
        logo: 'https://d2hlei1umhw6cd.cloudfront.net/icons/callrecording_128x128.png',
        description: 'Record your calls'
    }];
    
    $scope.onSelect = function (item) {
        console.log(item);
    };
});