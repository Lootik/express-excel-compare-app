require('../../node_modules/bootstrap/dist/css/bootstrap.css');


EC = angular.module('EC', [
    'ngMaterial',
    'ngResource',
    'ui.router',
    'EC.compare',
    'EC.header'
]);


require('./router');

//components
require('./components/compare/compare');
require('./components/header/header');


//Resources
require('./components/compare/compareResource');

//Services
require('./components/compare/compareService');