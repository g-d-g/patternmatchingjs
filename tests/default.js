var PM = require('../compiled/index');

describe("The default behaviour", function() {
  it("must accept functions in case", function() {
    expect(PM.match(3)(PM.case(function(i) {
      return i == 3;
    }, function(i) {
      return i + 2;
    }))).toBe(5);
    expect(PM.match(7)(PM.case(function(i) {
      return i == 3;
    }, function(i) {
      return i + 2;
    }))).toBeUndefined();
    expect(PM.match(3)(PM.case(function(i) {
      return i == 3;
    }, function(i) {
      return i + 2;
    }), PM.case(function(i) {
      return i == 9;
    }, function(i) {
      return i + 2;
    }))).toBe(5);
  });
  it("must support this as value", function() {
    expect(PM.match(3)(PM.case(function() {
      return this == 3;
    }, function() {
      return this + 2;
    }))).toBe(5);
  });
  it("must handle Atoms", function() {
    expect(PM.match(3)(PM.case(PM.atom(3), function(i) {
      return i + 2;
    }))).toBe(5);
    expect(PM.match(3)(PM.case(PM.atom("4"), function(i) {
      return i + 2;
    }))).toBeUndefined();
  });
  it("must handle values", function() {
    expect(PM.match(3)(PM.case(3, function(i) {
      return i + 2;
    }))).toBe(5);
    expect(PM.match(3)(PM.case("3", function(i) {
      return i + 2;
    }))).toBe(5);
  });
  it("must handle regular expressions", function() {
    var str = '5444741';
    expect(PM.match('5444741')(PM.case(/[0-9]/g, function(i) {
      return i;
    }))).toBe(str);
    expect(PM.match(str)(PM.case(/[a-z]/g, function(i) {
      return str;
    }))).toBeUndefined();
  });
  it("must handle array", function() {
    var array = [1, 2];
    var case1_2 = PM.case([1, 2], true);
    var case1_3 = PM.case([1, 3], true);
    expect(case1_2(array)).toBe(true);
    expect(case1_3(array)).toBeUndefined();
  });
  it("must handle types", function() {
    function MyType() {};

    function OtherType() {};

    var isInstanceOf = PM.case(PM.type(MyType), true);
    expect(isInstanceOf(new MyType())).toBe(true);
    expect(isInstanceOf(new OtherType())).toBeUndefined();
  });
  it("must support failed cases", function() {
    var failed = PM.case(PM.fail, true);
    expect(failed(true)).toBeUndefined();
  });
});