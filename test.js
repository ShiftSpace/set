window.addEvent('domready', init);

function createArray(n)
{
  var result = []
  for(var i = 0; i < n; i++)
  {
    result.push("bar");
  }
  result[n-1] = "foo";
  return result;
}

function createSet(n)
{
  var result = []
  for(var i = 0; i < n; i++)
  {
    result.push("bar");
  }
  result[n-1] = "foo";
  return new Set(result);
}

function testArrayContains()
{
  console.log('testArrayContains setup:');
  console.time('setup');
  var ary = createArray(10000);
  console.timeEnd('setup');
  console.log('contains:');
  console.time("contains");
  for(var i = 0; i < 5000; i++)
  {
    ary.contains("foo");
  }
  console.timeEnd("contains");
}

function testSetGet()
{
  console.log('testSetGet setup:');
  console.time("setup");
  var set = createSet(10000);
  console.timeEnd("setup");
  console.log('get:');
  console.time("get");
  for(var i = 0; i < 5000; i++)
  {
    set.get("foo");
  }
  console.timeEnd('get');
}

function init()
{
  console.log('ready');
  testArrayContains();
  testSetGet();
  
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