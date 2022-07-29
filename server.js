const express = require ('express')
const mongoose  = require('mongoose')
const app = express()
const Person = require('./Models/Person')
const mongoUrl='mongodb+srv://Marwa123:Marwa123@project-mongoos.o4h4zhq.mongodb.net/?retryWrites=true&w=majority'
app.use(express.json());
 
mongoose.connect(mongoUrl,(err)=>{
   err ? console.log (err): console.log ('database is connected')
}) 
const port =5000
app.listen(port, (err)=>{
err ? console.log (err): console.log('server is running on port 5000')
})
var newPerson = new Person(
   {
       name: 'John',
       age:30,
       favoriteFoods:['pizza','humburger']
   }
);
newPerson.save(function(){
   console.log("person saved");
});
//Create Many Records with model.create()

let persons = [
   {
     name: "marwa",
     age: 26,
     favoriteFoods: ["pizza"],
   },
   {
     name: "kassem",
     age: 28,
     favoriteFoods: ["chawarma", "burritos"],
   },
   {
     name: "slim",
     age: 30,
     favoriteFoods: ["ma9loub"],
   },
 ];
 Person.create(persons, function (err, data) {
   console.log(data);
 });
 
 //Use model.find() to Search Your Database
 
 Person.find({ name: "marwa" }, function (err, data) {
   console.log(data);
 });
   
 //Use model.findOne() to Return a Single Matching Document from Your Database
  
 function searchByFood(search) {
   Person.findOne({ favoriteFoods: { $regex: search } }, function (err, docs) {
     console.log(docs);
   });
 }
 searchByFood("ma9loub");
 //Use model.findById() to Search Your Database By _id
  
 function findByPersonId(personId) {
   Person.findById(personId, function (err, docs) {
     console.log(docs);
   });
 }
 findByPersonId("62c3468526e16a554e5fabc2");

  //Perform Classic Updates by Running Find, Edit, then Save
  
  function findPersonAndUpdate(personId) {
   Person.findById(personId, function (err, docs) {
     docs.favoriteFoods.push("salade");
     docs.save().then((doc) => {
       console.log(doc);
     });
   });
 }
 
 findPersonAndUpdate("62e3ac24bb1c99ec70881f05");
 //Perform New Updates on a Document Using model.findOneAndUpdate()
  
 function findPersonAndUpdate(name) {
   Person.findOneAndUpdate(
     { name },
     { age: 49 },
     {
       new: true,
     }
   ).then((doc) => {
     console.log(doc);
   });
 }
 findPersonAndUpdate("slim");
  //Delete One Document Using model.findByIdAndRemove
  
  function findPersonAndRemove(personId) {
   Person.findByIdAndRemove(personId).then((doc) => {
     console.log(doc);
   });
 }
 findPersonAndRemove("62e3ab98caaef013707bfb74");
 //MongoDB and Mongoose - Delete Many Documents with model.remove()
  
 Person.remove({ name: "slim" }).then((data) => {
   console.log(data.deletedCount);
 });
 
 //Chain Search Query Helpers to Narrow Search Results
 
 function done(err, data) {
   console.log(data);
 }
 Person.find({ favoriteFoods: { $regex: "pizza" } })
   .sort({ name: 1 })
   .limit(2)
   .select("-age")
   .exec(done);