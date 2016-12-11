/* Javascript para hacer consultas usando la libreria basica de mongoDB */
var URL_DB = 'mongodb://saboteurApp:3,14016pi@localhost:3001/saboteurDB';
var mongoClient = require('mongodb').MongoClient; // https://mongodb.github.io/node-mongodb-native/index.html


module.exports = {
// Testeado Ok
getAllArray : function(collectionName,func){
mongoClient.connect(URL_DB, function(err, db) {
  if (err) {
  func(err);
  }
  else{
    db.collection(collectionName).find().toArray(function(err, result) {
        if (err) {
            func(err);
        }
        else{
            func(null,result); //callback
        }
          db.close();
      });
  }
});
}
,
// Testeado Ok
insertOne : function(collectionName,kv,func){
mongoClient.connect(URL_DB, function(err, db) {
  if (err) {
    func(err);
  }
  else{
      db.collection(collectionName).insertOne(kv,function(err, result) {
          if (err) {
              func(err);
          }
          else{
              func(null,result);
          }
          db.close();
      });
  }

});
}
,
// Experimental
insertMany : function(collectionName,arrayKV,func){
mongoClient.connect(URL_DB, function(err, db) {
  if (err) {
      func(err);
  }
  db.collection(collectionName).insertOne(arrayKV,function(err, result) {
    if (err) {
        func(err);
    }
    else{
        func(null,result);
    }
    db.close();
  });
});
}
,
// Testeado OK
findOneAndDelete: function(collectionName,kv,func){
mongoClient.connect(URL_DB, function(err, db) {
  if (err) {
      func(err);
  }
  db.collection(collectionName).findOneAndDelete(kv,function(err, result) {
    if (err) {
        func(err);
    }
    else{
        func(null,result);
    }
    db.close();
  });
});
}
,
// No probado
deleteOne: function(collectionName,kv,func){
mongoClient.connect(URL_DB, function(err, db) {
  if (err) {
    func(err);
  }
  db.collection(collectionName).deleteOne(kv,function(err, result) {
    if (err) {
      func(err);
    }
    else{
      func(null,result);
    }
    db.close();
  });
});
}
,
// Testeado Ok
deleteMany: function(collectionName,kv,func){
mongoClient.connect(URL_DB, function(err, db) {
  if (err) {
    func(err);
  }
  else{
      db.collection(collectionName).deleteMany(kv,function(err, result) {
          if (err) {
              func(err);
          }
          else{
              func(null,result);
          }
          db.close();
      });
  }
});
}

,
// Testeado Ok
findOne : function(collectionName,kv,func){
    mongoClient.connect(URL_DB, function(err, db) {
        if (err) {
            func(err);
        }
        else{
            db.collection(collectionName).findOne(kv,function(err, result) {
                if (err) {
                    func(err);
                }
                else{
                    func(null,result);
                }
                db.close();
            });
        }
    });
}
,
// Testeado Ok
findMany : function(collectionName,kv,func){
    mongoClient.connect(URL_DB, function(err, db) {
        if (err) {
            func(err);
        }
        else{
            db.collection(collectionName).find(kv).toArray(function(err, result) {
                if (err) {
                    func(err);
                }
                else{
                    func(null,result);
                }
                db.close();
            });
        }
    });
}
,
// Testeado OK
update : function(collectionName,kv,kvSet,mul,func){
        mongoClient.connect(URL_DB, function(err, db) {
            if (err) {
                func(err);
            }
            else{
                db.collection(collectionName).update(kv,{$set:kvSet},{multi:mul},function(err, result) {
                    if (err) {
                        func(err);
                    }
                    else{
                        func(null,result);
                    }
                    db.close();
                });
            }
        });
    }
}
