'use strict';
var assert = require('assert');
var treeupdater = require('../');

describe('treeupdater node module', function () {
  it ('match should be C', function () {
    //var tree = treeupdater().parseTree('(A:0.1,B:0.2,(C:0.3,D:0.4)E:0.5)F');
    var match = treeupdater().returnMatch('{'+
      '"N": [1,1,3,4,4],'+
      '"match": "C",'+
      '"snps": 0.5'+
    '}');
    assert.equal(match.match, 'C');
  });

  it ('must return JSON tree', function(){
    var tree = treeupdater().parseTree('(A:0.1,B:0.2,(C:0.3,D:0.4)E:0.5)F');
    assert.equal(tree['name'], 'F');
    assert.equal(
      JSON.stringify(tree['children'][0]),
      JSON.stringify({name: "A", branch_length: 0.1})
    );
    assert.equal(
      JSON.stringify(tree['children'][1]),
      JSON.stringify({name: "B", branch_length: 0.2})
    );
    assert.equal(tree['children'][2].name, 'E');
  });

  it ('must update tree with proper match', function(){
    var match = treeupdater().returnMatch('{'+
      '"N": [1,1,3,4,4],'+
      '"match": "C",'+
      '"snps": 0.5,'+
      '"name": "H"'+
    '}');
    var tree = treeupdater().parseTree('(A:0.1,B:0.2,(C:0.3,D:0.4)E:0.5)F');
    treeupdater().updateTree(tree, match);
    assert.equal(tree.children[2].children[0].children[0].name, "H");
    assert.equal(tree.children[2].children[0].children[0].branch_length, 0.5);
  });

});
