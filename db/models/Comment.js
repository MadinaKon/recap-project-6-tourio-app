import mongoose from "mongoose";
//import Place from "./Place";
import "./Place";

const { Schema } = mongoose;

const commentSchema = new Schema({
  name: { type: String, required: true },
  comment: { type: String, required: true },
  placeId: { type: String, required: true },
  // place: { type: [Schema.Types.ObjectId], ref: "Place", required: true },
});

const Comment =
  mongoose.models.Comment || mongoose.model("Comment", commentSchema);

export default Comment;
