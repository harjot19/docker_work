const mongoose = require("mongoose");
console.log("inside mongo database")
mongoose
	.connect(
	'mongodb://mongo_con:27017/nodedb',
	 { useNewUrlParser: true,useMongoClient: true }
	 )
	 .then(() => console.log('MongoDB Connected'))
	 .catch(err => console.log(err));