require('./lib/utils/mongoose');

const Person = require('./lib/models/Person');

const express = require('express');
const { buildSchema } = require('graphql');
const graphqlHTTP = require('express-graphql');

const data = require('./lib/data');

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
  all: async () => {

    try {

      const persons = await Person.find({});
      return persons;

    } catch(e) {

      console.log(e);
      return [];
    }

  },
  balanceHigherThan: async ({ balance }) => {

    try {

      const persons = await Person.find({});

      return persons.filter(d => {
        const dBalance = d.balance.replace(/[^\d.]/g,'');
        return dBalance > balance;
      });

    } catch (e) {

      return [];
    }

  },
  search: async ({ wildcard }) => {

    try {

      const persons = await Person.find({});

      return persons.filter(d => d.name.includes(wildcard));

    } catch (e) {

      return [];
    }

  },
};

const app = express();

app.set('json spaces', 2);

app.get('/person', (req, res, next) => {

	Person.find({}, (err, docs) => {

    if(err) {
      return res.send(err);
    } else if(docs !== undefined && docs.length > 0) {
			return res.json(docs);
		}

    next();

	});

});

app.get('/person', (req, res) => {

    const persons = data.map(person => {
      delete person._id;
      return person;
    });

    Person.insertMany(persons, function(err, docs) {
      if(err) return res.send(err);
      res.redirect('/person');
    });

});

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));

app.listen(4000);

console.log('Running a GraphQL API server at localhost:4000/graphql');