const { Schema, model } = require('mongoose');
const {Reaction, reactionSchema} = require('./Reaction')
// Schema to create Student model
const thoughtSchema = new Schema(
  {
      thoughtText:{
        type: String,
        required: true,
        min_length: 1,
        max_length: 280,
      },
      createdAt:{
        type: Date,
        default: Date.now(),
        get:(date) => new Date(date).toLocaleDateString(),
      },
      reactions:[
       reactionSchema
      ],
      user_id: 
       {
        type:Schema.Types.ObjectId,
        ref: "user"
    }
    
  },
  {
    toJSON: {
      virtuals:true,
      getters: true,
    },
    
    id:false,

  }
);

const Thought = model('thought', thoughtSchema);

module.exports = Thought;
