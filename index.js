'use strict';


module.exports = function () {
  var parser = require('biojs-io-newick');
  var fs = require('fs');
  return {
      readTreeFile: function(tree) {
        fs.readFile(tree, 'utf8', function (err, data) {
          if (err) {
            return err;
          }
          return this.parseTree(data);
        });
      },
      matchFromFile: function(file){
        fs.readFile(file, 'utf8', function (err, data) {
          if (err) {
            return err;
          }
          return this.returnMatch(data);
        });
      },
      parseTree: function(string){
        return parser.parse_newick(string);
      },
      returnMatch: function(string){
        return JSON.parse(string);
      },
      updateTree: function test (tree, match){
        function trans(tree, match){
          if (tree.name === match.match){ // End recursion
            tree.children = [{name: match.name, branch_length: match.snps}];
          }else{ // Recursive
            if (tree.children){
              tree.children.forEach(function(son){
                return trans(son, match);
              });
            }
          }
        }
        return trans(tree, match);
      }
  };
};
