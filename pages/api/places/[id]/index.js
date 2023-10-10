import { db_comments } from "../../../../lib/db_comments";
import dbConnect from "../../../../db/models/connect";
import Place from "../../../../db/models/Place";

export default async function handler(request, response) {
  await dbConnect();
  const { id } = request.query;

  if (!id) {
    return;
  }

  if (request.method === "GET") {
    const place = await Place.findById(id);
    if (!place) {
      return response.status(404).json({ status: "Not place Found" });
    }
    response.status(200).json({ place });
  }

  if (request.method === "PATCH") {
    // const placeToPatch = await Place.findByIdAndUpdate(id);
    // response.status(200).json(placeToPatch);
    await Place.findByIdAndUpdate(id, {
      $set: request.body,
    });
    response.status(200).json({ status: `Place with id ${id} updated!` });
  }

  if (request.method === "DELETE") {
    await Place.findByIdAndDelete(id);

    response
      .status(200)
      .json({ status: `Place with id ${id} successfully deleted.` });
  }

  // const comment = place?.comments;
  // const allCommentIds = comment?.map((comment) => comment.$oid) || [];
  // const comments = db_comments.filter((comment) =>
  //   allCommentIds.includes(comment._id.$oid)
  // );

  // if (!place) {
  //   return response.status(404).json({ status: "Not found" });
  // }

  // response.status(200).json({ place: place, comments: comments });
}
