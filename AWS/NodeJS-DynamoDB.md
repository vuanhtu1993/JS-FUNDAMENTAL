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
