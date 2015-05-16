var should = require('chai').should()

describe('proxy-cache-multi-middleware', function() {
  var expected = ["hello", "world"]
  var expectedString = JSON.stringify(expected)
  it('should loads', function(done) {
    require('..')
    done();
  });
});
