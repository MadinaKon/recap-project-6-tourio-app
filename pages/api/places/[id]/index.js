import dbConnect from "../../../../db/models/connect";
import Place from "../../../../db/models/Place";
import Comment from "../../../../db/models/Comment";

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

  // if (request.method === "POST") {
  //   const place = await Place.findById(id);
  //   console.log("COMMENT BE PLACE ", place);
  //   try {
  //     const commentData = request.body;
  //     await Place.create(commentData);

  //     response.status(200).json({ place: place, comments: comments });
  //   } catch (error) {
  //     console.log(error);
  //     response.status(400).json({ error: error.message });
  //   }
  // }

  if (request.method === "POST") {
    const place = await Place.findById(id);
    try {
      const commentData = request.body;

      console.log("{ ...commentData, placeId: id } ", {
        ...commentData,
        placeId: id,
      });

      await Comment.create({ ...commentData, placeId: id });

      // response.status(200).json({ place: place, comments: comment });
      response.status(200).json({ ...commentData, placeId: id });
    } catch (error) {
      console.log(error);
      response.status(400).json({ error: error.message });
    }
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
