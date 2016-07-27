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
        })
        .state("main.byWorkcheets", {
            url: "compare/by-worksheets",
            template: '<ec-compare-by-worksheet></ec-compare-by-worksheet>'
        })
        .state("main.compareCsv", {
            url: "compare/csv",
            template: '<ec-compare-csv></ec-compare-by-csv>'
        });
    $urlRouterProvider.otherwise("/");
});
