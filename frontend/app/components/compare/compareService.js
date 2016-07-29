

EC.service('compareService', ['compareResource', function (compareResource) {
        this.compareExelFiles = function (files, onSuccess, onError) {
            compareResource.compareExcelFiles(files,
                function (result) {
                    onSuccess(result);
                },
                function (err) {
                    console.error(err);
                    onError(err);
                });
        };
        this.compareExelFilesBySheets = function (files, onSuccess, onError) {
            compareResource.compareExelFilesBySheets(files,
                function (result) {
                    onSuccess(result);
                },
                function (err) {
                    console.error(err);
                    onError(err);
                });
        };

        this.compareCsv = function (files, onSuccess, onError) {
            compareResource.compareCsvFiles(files,
                function (result) {
                    onSuccess(result);
                },
                function (err) {
                    console.error(err);
                    onError(err);
                });
        };
        this.getExcelFileSheets = function (file, onSuccess, onError) {
            compareResource.getExcelFileSheets(file,
                function (result) {
                    onSuccess(result);
                },
                function (err) {
                    console.error(err);
                    onError(err);
                });
        };

    }]);