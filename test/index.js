var should = require('chai').should(),
    proxyCacheMultiMiddleware = require('..')
;

describe('proxy-cache-multi-middleware', function() {
  var expected = ["hello", "world"]
  var expectedString = JSON.stringify(expected)
  it('should eaual ' + expectedString, function(done) {
    var test = proxyCacheMultiMiddleware()
    var json = JSON.stringify(test)
    json.should.equal(expectedString);
    done();
  });
});
