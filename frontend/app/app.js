

EC = angular.module('EC', [
    'ngResource',
    'ui.router',
    'EC.compare',
]);


require('./router');

//components
require('./components/compare/compare');


//Resources
require('./components/compare/compareResource');

//Services
require('./components/compare/compareService');