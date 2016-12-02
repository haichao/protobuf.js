var tape = require("tape");

var protobuf = require(".."),
    util = protobuf.util;

tape.test("bench.proto and bench.json", function(test) {
    protobuf.load("bench/bench.proto", undefined, function(err, root) {
        if (err)
            return test.fail(err.message);
        
        var Test = root.lookup("Test");
        var data = require("../bench/bench.json");

        test.equal(Test.verify(data), null, "should verify our test data");
        var writer = Test.encode(data);
        var decoded = Test.decode(writer.finish());
        test.deepEqual(decoded, data, "should reproduce the original data when encoded and decoded again");

        test.end();
    });
});