

EC.service('compareService', ['compareResource', function (compareResource) {
        this.compareFiles = function (files, onSuccess, onError) {
            compareResource.compareFiles(files,
                function (result) {
                    onSuccess(result);
                },
                function (err) {
                    console.error(err);
                    onError(err);
                });
        };

    }]);