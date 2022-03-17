const { Schema, model, Types } = require('mongoose');

// Schema to create Student model
const reactionSchema = new Schema(
  {
      reactionId:{
        type:Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
      },
      reactionBody:{
          type: String,
          required: true,
          min_length: 1,
          max_length: 280,
      },
      user_id: 
      {
       type:Schema.Types.ObjectId,
       ref: "user"
   },

       createdAt:{
            type: Date,
            default: Date.now(),
            get:(date) => new Date(date).toLocaleDateString(),
          },
    
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

const Reaction = model('reaction', reactionSchema);

module.exports = {Reaction, reactionSchema};
