Pointer = new Mongo.Collection('pointers')

if (Meteor.isClient) {

  var id = new Mongo.ObjectID

  Template.pointersList.helpers({
    pointers: function(){
      return Pointer.find({});
    },

    id: function(){
      return id._str
    },

    x: function(){
      return Pointer.findOne({},{x:1, _id: id._str}).x
    },

    y: function(){
      return Pointer.findOne({},{y:1, _id: id._str}).y
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
    var x = (motion.gamma*10).toPrecision(3)
    var y = (motion.beta*10).toPrecision(3)
    Pointer.update(id._str, {x: x, y: y})
    console.log("x: %s | y: %s", x,y)
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
