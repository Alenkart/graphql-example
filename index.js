const express = require('express');
const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');

const data = require('./data');

// Construct a schema, using GraphQL schema language
const schema = buildSchema(`

	type Person {
		_id: String
    	index: Int
    	guid: String
    	isActive: Boolean
    	balance: String
    	picture: String
    	age: Int
    	eyeColor: String
    	name: String
    	gender: String
    	company: String
    	email: String
    	phone: String
    	address: String
    	about: String
    	registered: String
    	latitude: String
    	longitude: String
    	tags: [String]
    	friends: [Person]
	    greeting: String
	    favoriteFruit: String
	}

  	type Query {
    	all: [Person]
    	balanceHigherThan(balance:Int): [Person]
    	search(wildcard:String): [Person]
  	}
`);

// The root provides a resolver function for each API endpoint
const root = {
  all: () => {
  	return data;
  },
  balanceHigherThan: ({ balance }) => {
    return data.filter(d => {
    	const dBalance = d.balance.replace(/[^\d.]/g,'');
    	return dBalance > balance;
    });
  },
  search: ({ wildcard }) => {
    return data.filter(d => d.name.includes(wildcard));
  },
};

const app = express();

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));

app.listen(4000);

console.log('Running a GraphQL API server at localhost:4000/graphql');