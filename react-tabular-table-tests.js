// Import Tinytest from the tinytest Meteor package.
import { Tinytest } from "meteor/tinytest";

// Import and rename a variable exported by react-tabular-table.js.
import { name as packageName } from "meteor/react-tabular-table";

// Write your tests here!
// Here is an example.
Tinytest.add('react-tabular-table - example', function (test) {
  test.equal(packageName, "react-tabular-table");
});
