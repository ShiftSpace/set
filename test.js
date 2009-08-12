window.addEvent('domready', init);

var employeeA = {
  type: "employee",
  department: {
    name: "FooBar",
    head: {first:"Bob", last:"Smith"},
    address: {
      line1: "10101 Baz St.",
      line2: "Floor 32, Suite 4G",
      zipcode: "11111",
      city: "Bits",
      state: "NY"
    }
  },
  name: {first:"John", last:"Black"},
  salary: 5,
  title: "hacker",
  id: "99999asdf"
};

var employeeX = {
  type: "employee",
  department: {
    name: "XXXXX",
    head: {first:"XXXXX", last:"XXXXX"},
    address: {
      line1: "XXXXX",
      line2: "XXXXX",
      zipcode: "XXXXX",
      city: "XXXXX",
      state: "XXXXX"
    }
  },
  name: {first:"XXXXX", last:"XXXXX"},
  salary: 5,
  title: "XXXXX",
  id: "XXXXX"
};

function createEmployees() {
  var result = [];
  for(var i = 0; i < 100; i++) result.push(employeeX);
  result[50] = employeeA;
  return result;
}

function createArray(n) {
  var result = []
  for(var i = 0; i < n; i++) result.push("bar");
  result[n-1] = "foo";
  return result;
}

function createSet(n) {
  var result = []
  for(var i = 0; i < n; i++) result.push("bar");
  result[n-1] = "foo";
  return new Set(result);
}

function testArrayContains() {
  console.log('============================ testArrayContains');
  console.time('setup');
  var ary = createArray(5000);
  console.timeEnd('setup');
  console.time("contains");
  for(var i = 0; i < 5000; i++) {
    ary.contains("foo");
  }
  console.timeEnd("contains");
}

function testSetGet() {
  console.log('============================ testSetGet');
  console.time("setup");
  var set = createSet(5000);
  console.timeEnd("setup");
  console.time("get");
  for(var i = 0; i < 5000; i++) set.get("foo");
  console.timeEnd("get");
}

function isEqual(o1, o2) {
  var type1 = $type(o1), type2 = $type(o2);
  if(type1 != type2) return false;
  if(!["object", "array"].contains(type1)) {
    return o1 == o2;
  } else {
    var keyCount1 = 0, keyCount2 = 0;
    for(var k in o1) {
      if(!o2[k]) return false;
      if(!isEqual(o1[k], o2[k])) return false;
      keyCount1++;
    }
    for(var k in o2) keyCount2++;
    if(keyCount1 != keyCount2) return false;
    return true;
  }
}

function testEqual() {
  console.log('============================ testEqual');

  console.time("isEqual");
  for(var i = 0; i < 1000; i++) isEqual(employeeA, employeeA);
  console.timeEnd('isEqual');

  console.time("$hash");
  for(var i = 0; i < 1000; i++) $hash(employeeA) == $hash(employeeA);
  console.timeEnd('$hash');
}

function testFind() {
  console.log('============================ testFind');
  
  console.time("isEqual");
    console.time("create");
      var employees = createEmployees();
    console.timeEnd("create");
    console.time("find");
      for(var i = 0; i < employees.length; i++) {
        if(isEqual(employees[i], employeeA)) continue;
      }
    console.timeEnd('find')
  console.timeEnd('isEqual');
  
  console.time("$hash");
    console.time("create");
      var employees = new Set(createEmployees());
    console.timeEnd("create");
    console.time("get");
      employees.get(employeeA);
    console.timeEnd('get');
  console.timeEnd('$hash');
}

function init() {
  console.log('ready');
  testArrayContains();
  testSetGet();
  testEqual();
  testFind();
  
  var set0 = new Set([1, 2, 1, "dog", "bird", "dog", "dog", "cat"]);
  console.log("set0:");
  console.log(set0.toArray());
  
  var set1 = new Set([1, 2, 9, [3, 4]]);
  var set2 = new Set([1, [3, 4], 5, 9]);
  console.log("set1 set2 intersection:");
  console.log(set1.aintersection(set2));
  
  var set3 = new Set([{first:"Bob", last:"Smith"}, {first:"Mary", last:"Smith"}]);
  var set4 = new Set([{first:"Tim", last:"Smith"}, {first:"Mary", last:"Smith"}]);
  console.log("set3 set4 difference:");
  console.log(set3.adifference(set4));
  
  var set5 = new Set(["dog", "cat", "bird"]);
  var set6 = new Set(["zebra", "lion", "gazelle"]);
  console.log('set5 set6 union:');
  console.log(set5.aunion(set6));
}