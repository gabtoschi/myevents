var mongoose = require('mongoose');

var eventSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
});

eventSchema.methods.isPresent = function(){
   return (!this.isFuture() && !this.isPast());
}

eventSchema.methods.isPast = function(){
    let nowTime = Date.now.getTime();

    if (nowTime > this.endDate.getTime()) return true;
    return false;
}

eventSchema.methods.isFuture = function(){
    let nowTime = Date.now.getTime();

    if (nowTime < this.startDate.getTime()) return true;
    return false;
}

mongoose.model('Event', eventSchema);