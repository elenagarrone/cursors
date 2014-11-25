Pointer = new Mongo.Collection('pointers')

if (Meteor.isClient) {

  var id = new Mongo.ObjectID

  Template.pointersList.helpers({
    pointers: function(){
      return Pointer.find({});
    }
  });

  Template.button.rendered = function(){
    var el = this.find('a')
    Hammer(el).on('press', function(event){
      console.log('Create Mongo Object')
      Pointer.insert({_id: id._str, x: 0, y: 0})
      startMovementCapture()
    })

    Hammer(el).on('hammer.input', function(event){
      if (event.isFirst === false){
        Pointer.remove(id._str)
        console.log('Delete Mongo Object')
        stopMovementCapture()
      }
    })
  }

  function writeCoordinance(motion){
    console.log(motion.gamma)
  }

  function startMovementCapture(){
    window.addEventListener('deviceorientation', writeCoordinance, false)
  }

  function stopMovementCapture(){
    window.removeEventListener('deviceorientation', writeCoordinance, false)

  }

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
