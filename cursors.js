Pointer = new Mongo.Collection('pointers')

if (Meteor.isClient) {

  var id = new Mongo.ObjectID
  Pointer.insert({_id: id._str, x: 0, y: 0})

  Template.pointersList.helpers({
    pointers: function(){
      return Pointer.find({});
    }
  })

}

if (Meteor.isServer) {
  Meteor.startup(function () {

    Meteor.methods({
      clear: function(){
        Pointer.remove({})
      }
    })

  });
}
