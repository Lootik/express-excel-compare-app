EC.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state("main", {
            url: "/",
            template: require('./shared/app-layout.jade')
        })
        .state("main.compare", {
            url: "compare",
            template: '<ec-compare-list></ec-compare-list>'
        })
        .state("main.pvsVsAssure", {
            url: "compare/pvs-vs-assure",
            template: '<ec-compare-widget></ec-compare-widget>'
        });
    $urlRouterProvider.otherwise("/");
});
