# graphql-example
Graphql &amp; ExpressJs

## Query
```graphql
{
  all {
    name
		picture
  }
  byA: search(wildcard:"a"){
   _id
    name
    isActive
    
  }
  byC: search(wildcard:"c"){
    index
    balance
    picture
  }
  byD: search(wildcard:"d"){  
    email
    balance
    friends {
      name
    }
  }
  balanceHigherThan(balance:2500) {
    name
    age
    isActive
    guid
    latitude
    longitude
    eyeColor
    company
    phone
  }
}
```
