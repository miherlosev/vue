var path           = require('path');
var httpServer     = require('http-server');
var createTestCafe = require('testcafe');

var server = httpServer.createServer({
    root: path.resolve(__dirname, '../../')
});

server.listen(8080);

createTestCafe('localhost', 1337, 1338)
    .then(function (testCafe) {
        return testCafe.createRunner();
    })
    .then(function (runner) {
        // NOTE: https://github.com/DevExpress/testcafe/issues/980
        return runner.src([
            'test/e2e/tests/commits.js',
            'test/e2e/tests/grid.js',
            'test/e2e/tests/markdown.js',
            'test/e2e/tests/modal.js',
            'test/e2e/tests/select2.js',
            'test/e2e/tests/svg.js',
            'test/e2e/tests/todomvc.js',
            'test/e2e/tests/tree.js'
        ])
            .browsers('chrome')
            .reporter('spec')
            .run();
    })
    .then(function (failed) {
        server.close();
        process.exit(failed);
    })
    .catch(function (err) {
        console.log('Uhandled error');
        console.log(err);
    });
