##  Create a Table

In this step, you create a table named Movies. The primary key for the table is composed of the following attributes:

year – The partition key. The AttributeType is N for number.

title – The sort key. The AttributeType is S for string.

Copy and paste the following program into a file named MoviesCreateTable.js.
```javascript
var AWS = require("aws-sdk");

AWS.config.update({
  region: "us-west-2",
  endpoint: "http://localhost:8000"
});

var dynamodb = new AWS.DynamoDB();

var params = {
    TableName : "Movies",
    KeySchema: [       
        { AttributeName: "year", KeyType: "HASH"},  //Partition key
        { AttributeName: "title", KeyType: "RANGE" }  //Sort key
    ],
    AttributeDefinitions: [       
        { AttributeName: "year", AttributeType: "N" },
        { AttributeName: "title", AttributeType: "S" }
    ],
    ProvisionedThroughput: {       
        ReadCapacityUnits: 10, 
        WriteCapacityUnits: 10
    }
};

dynamodb.createTable(params, function(err, data) {
    if (err) {
        console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("Created table. Table description JSON:", JSON.stringify(data, null, 2));
    }
});
```
Note

You set the endpoint to indicate that you are creating the table in DynamoDB on your computer.

In the createTable call, you specify table name, primary key attributes, and its data types.

The ProvisionedThroughput parameter is required, but the downloadable version of DynamoDB ignores it. (Provisioned throughput is beyond the scope of this exercise.)

To run the program, type the following command:

node MoviesCreateTable.js

## Insert initial Data from JSON file
Load the Sample Data into the Movies Table
After you download the sample data, you can run the following program to populate the Movies table.

Copy and paste the following program into a file named MoviesLoadData.js:
```javascript
var AWS = require("aws-sdk");
var fs = require('fs');

AWS.config.update({
    region: "us-west-2",
    endpoint: "http://localhost:8000"
});

var docClient = new AWS.DynamoDB.DocumentClient();

console.log("Importing movies into DynamoDB. Please wait.");

var allMovies = JSON.parse(fs.readFileSync('moviedata.json', 'utf8'));
allMovies.forEach(function(movie) {
    var params = {
        TableName: "Movies",
        Item: {
            "year":  movie.year,
            "title": movie.title,
            "info":  movie.info
        }
    };

    docClient.put(params, function(err, data) {
       if (err) {
           console.error("Unable to add movie", movie.title, ". Error JSON:", JSON.stringify(err, null, 2));
       } else {
           console.log("PutItem succeeded:", movie.title);
       }
    });
});
```
To run the program, type the following command:

node MoviesLoadData.js

## Create a New Item
In this step, you add a new item to the Movies table.
```javascript
Copy and paste the following program into a file named MoviesItemOps01.js:

var AWS = require("aws-sdk");

AWS.config.update({
  region: "us-west-2",
  endpoint: "http://localhost:8000"
});

var docClient = new AWS.DynamoDB.DocumentClient();

var table = "Movies";

var year = 2015;
var title = "The Big New Movie";

var params = {
    TableName:table,
    Item:{
        "year": year,
        "title": title,
        "info":{
            "plot": "Nothing happens at all.",
            "rating": 0
        }
    }
};

console.log("Adding a new item...");
docClient.put(params, function(err, data) {
    if (err) {
        console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("Added item:", JSON.stringify(data, null, 2));
    }
});
```
Note

The primary key is required. This code adds an item that has a primary key (year, title) and info attributes. The info attribute stores sample JSON that provides more information about the movie.

To run the program, type the following command:

node MoviesItemOps01.js

## Read an Item (Query Data)
In the previous program, you added the following item to the table:
```javascript
{
   year: 2015,
   title: "The Big New Movie",
   info: { 
        plot: "Nothing happens at all.",
        rating: 0
   }
}
```
You can use the get method to read the item from the Movies table. You must specify the primary key values, so you can read any item from Movies if you know its year and title.

Copy and paste the following program into a file named MoviesItemOps02.js:
```javascript
var AWS = require("aws-sdk");

AWS.config.update({
  region: "us-west-2",
  endpoint: "http://localhost:8000"
});

var docClient = new AWS.DynamoDB.DocumentClient();

//Query params/////////////////////
var table = "Movies";
var year = 2015;
var title = "The Big New Movie";
///////////////////////////////////

var params = {
    TableName: table,
    // tham số Key để thể hiện các trường cần lấy ra
    Key:{
        "year": year,
        "title": title
    }
};

docClient.get(params, function(err, data) {
    if (err) {
        console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("GetItem succeeded:", JSON.stringify(data, null, 2));
    }
});
```
To run the program, type the following command:

node MoviesItemOps02.js

## Update an Item
You can use the update method to modify an existing item. You can update values of existing attributes, add new attributes, or remove attributes.
In this example, you perform the following updates:
Change the value of the existing attributes (rating, plot).
Add a new list attribute (actors) to the existing info map.
```javascript
The item changes from this:
{
   year: 2015,
   title: "The Big New Movie",
   info: { 
        plot: "Nothing happens at all.",
        rating: 0
   }
}
To the following:

{
   year: 2015,
   title: "The Big New Movie",
   info: { 
           plot: "Everything happens all at once.",
           rating: 5.5,
           actors: ["Larry", "Moe", "Curly"]
   }
}
```
Copy and paste the following program into a file named MoviesItemOps03.js:
```javascript
var AWS = require("aws-sdk");

AWS.config.update({
  region: "us-west-2",
  endpoint: "http://localhost:8000"
});

var docClient = new AWS.DynamoDB.DocumentClient()

var table = "Movies";

var year = 2015;
var title = "The Big New Movie";

// Update the item, unconditionally,

var params = {
    TableName:table,
    Key:{
        "year": year,
        "title": title
    },
    UpdateExpression: "set info.rating = :r, info.plot=:p, info.actors=:a",
    ExpressionAttributeValues:{
        ":r":5.5,
        ":p":"Everything happens all at once.",
        ":a":["Larry", "Moe", "Curly"]
    },
    ReturnValues:"UPDATED_NEW"
};

console.log("Updating the item...");
docClient.update(params, function(err, data) {
    if (err) {
        console.error("Unable to update item. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("UpdateItem succeeded:", JSON.stringify(data, null, 2));
    }
});
```
```
Note
This program uses UpdateExpression to describe all updates you want to perform on the specified item.
The ReturnValues parameter instructs DynamoDB to return only the updated attributes ("UPDATED_NEW").
```
To run the program, type the following command:
node MoviesItemOps03.js

## Update an Item (Conditionally)
The following program shows how to use UpdateItem with a condition. If the condition evaluates to true, the update succeeds; otherwise, the update is not performed.

In this case, the item is updated only if there are more than three actors in the movie.

Copy and paste the following program into a file named MoviesItemOps05.js:
```javascript
var AWS = require("aws-sdk");

AWS.config.update({
  region: "us-west-2",
  endpoint: "http://localhost:8000"
});

var docClient = new AWS.DynamoDB.DocumentClient()

var table = "Movies";

var year = 2015;
var title = "The Big New Movie";

// Conditional update (will fail)

var params = {
    TableName:table,
    Key:{
        "year": year,
        "title": title
    },
    UpdateExpression: "remove info.actors[0]",
    ConditionExpression: "size(info.actors) > :num",
    ExpressionAttributeValues:{
        ":num": 3
    },
    ReturnValues:"UPDATED_NEW"
};

console.log("Attempting a conditional update...");
docClient.update(params, function(err, data) {
    if (err) {
        console.error("Unable to update item. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("UpdateItem succeeded:", JSON.stringify(data, null, 2));
    }
});
```
To run the program, type the following command:

node MoviesItemOps05.js

The program should fail with the following message:

The conditional request failed

This is because the movie has three actors in it, but the condition is checking for greater than three actors.

Modify the program so that the ConditionExpression looks like this:

ConditionExpression: "size(info.actors) >= :num",
The condition is now greater than or equal to 3 instead of greater than 3.

Run the program again. The updateItem operation should now succeed.

## Delete an Item
You can use the delete method to delete one item by specifying its primary key. You can optionally provide a ConditionExpression to prevent the item from being deleted if the condition is not met.

In the following example, you try to delete a specific movie item if its rating is 5 or less.

Copy and paste the following program into a file named MoviesItemOps06.js:
```javascript
var AWS = require("aws-sdk");

AWS.config.update({
  region: "us-west-2",
  endpoint: "http://localhost:8000"
});

var docClient = new AWS.DynamoDB.DocumentClient();

var table = "Movies";

var year = 2015;
var title = "The Big New Movie";

var params = {
    TableName:table,
    Key:{
        "year": year,
        "title": title
    },
    ConditionExpression:"info.rating <= :val",
    ExpressionAttributeValues: {
        ":val": 5.0
    }
};

console.log("Attempting a conditional delete...");
docClient.delete(params, function(err, data) {
    if (err) {
        console.error("Unable to delete item. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("DeleteItem succeeded:", JSON.stringify(data, null, 2));
    }
});
To run the program, type the following command:

node MoviesItemOps06.js

The program should fail with the following message:

The conditional request failed

This is because the rating for this particular movie is greater than 5.

Modify the program to remove the condition from params.

var params = {
    TableName:table,
    Key:{
        "title":title,
        "year":year
    }
};
```
Run the program again. Now, the delete succeeds because you removed the condition.

## Query - All Movies Released in a Year with Certain Titles
The program included in this step retrieves all movies released in year 1992, with title beginning with the letter "A" through the letter "L".

Copy and paste the following program into a file named MoviesQuery02.js:
```javascript
var AWS = require("aws-sdk");

AWS.config.update({
  region: "us-west-2",
  endpoint: "http://localhost:8000"
});

var docClient = new AWS.DynamoDB.DocumentClient();

console.log("Querying for movies from 1992 - titles A-L, with genres and lead actor");

var params = {
    TableName : "Movies",
    ProjectionExpression:"#yr, title, info.genres, info.actors[0]",
    KeyConditionExpression: "#yr = :yyyy and title between :letter1 and :letter2",
    ExpressionAttributeNames:{
        "#yr": "year"
    },
    ExpressionAttributeValues: {
        ":yyyy": 1992,
        ":letter1": "A",
        ":letter2": "L"
    }
};

docClient.query(params, function(err, data) {
    if (err) {
        console.log("Unable to query. Error:", JSON.stringify(err, null, 2));
    } else {
        console.log("Query succeeded.");
        data.Items.forEach(function(item) {
            console.log(" -", item.year + ": " + item.title
            + " ... " + item.info.genres
            + " ... " + item.info.actors[0]);
        });
    }
});
```
To run the program, type the following command:

node MoviesQuery02.js

## Scan (Quite the same with Query, but Scan read every items in the tablet and return all after that run into the filter)
The scan method reads every item in the table, and returns all the data in the table. You can provide an optional filter_expression, so that only the items matching your criteria are returned. However, the filter is only applied after the entire table has been scanned.

The following program scans the entire Movies table, which contains approximately 5,000 items. The scan specifies the optional filter to retrieve only the movies from the 1950s (approximately 100 items), and discard all of the others.

Copy and paste the following program into a file named MoviesScan.js:
```javascript
var AWS = require("aws-sdk");

AWS.config.update({
    region: "us-west-2",
    endpoint: "http://localhost:8000"
});

var docClient = new AWS.DynamoDB.DocumentClient();

var params = {
    TableName: "Movies",
    ProjectionExpression: "#yr, title, info.rating",
    FilterExpression: "#yr between :start_yr and :end_yr",
    ExpressionAttributeNames: {
        "#yr": "year",
    },
    ExpressionAttributeValues: {
         ":start_yr": 1950,
         ":end_yr": 1959 
    }
};

console.log("Scanning Movies table.");
docClient.scan(params, onScan);

function onScan(err, data) {
    if (err) {
        console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        // print all the movies
        console.log("Scan succeeded.");
        data.Items.forEach(function(movie) {
           console.log(
                movie.year + ": ",
                movie.title, "- rating:", movie.info.rating);
        });

        // continue scanning if we have more movies, because
        // scan can retrieve a maximum of 1MB of data
        if (typeof data.LastEvaluatedKey != "undefined") {
            console.log("Scanning for more...");
            params.ExclusiveStartKey = data.LastEvaluatedKey;
            docClient.scan(params, onScan);
        }
    }
}
```
In the code, note the following:
ProjectionExpression specifies the attributes you want in the scan result.
FilterExpression specifies a condition that returns only items that satisfy the condition. All other items are discarded.

To run the program, type the following command:
node MoviesScan.js

Note
You can also use the Scan operation with any secondary indexes that you have created on the table. For more information, see Improving Data Access with Secondary Indexes.
