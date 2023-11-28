import { Schema, model } from "mongoose";
 //import bcrypt from "bcrypt";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true, 
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      
    },
    avatarURL: {
      type: String,
      required: false,
    },
    roles: [
      {
        ref: "Role",
        type: Schema.Types.ObjectId,
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

/* //compararndo el password
userSchema.statics.comparePassword = async (password, receivedPassword) => {
  return await bcrypt.compare(password, receivedPassword);
}; */

export default model("User", userSchema);