EC.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state("compare", {
            url: "/",
            template: '<ec-compare-widget></ec-compare-widget>'
        });
    $urlRouterProvider.otherwise("/");
});
