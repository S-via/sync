const typeDefs = `

type User{
_id: ID!
name: String!
email: String!
couple: Couple}

type Couple{
_id:ID!
partners:[User!]
anniversity:String!}

type Auth{
toke:ID!
user:User}

type Query{
me:User}

type Mutation{
login(email:String!,password:String!):Auth!
signUp(email:String!,name:String!,password:String!):Auth!
}

`
module.exports = typeDefs;