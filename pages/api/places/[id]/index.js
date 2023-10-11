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
  //   try {
  //     const commentData = request.body;

  //     const commentId = await Comment.create({ ...commentData, placeId: id });
  //     response.status(200).json({ ...commentData, placeId: id });

  //     // await Place.findById(id).populate(comments);
  //     // const commentId = await Comment.findById(id);
  //     // get the id of the comment, we don't need a whole commentData object
  //     const place = await Place.findByIdAndUpdate(id).populate(commentId);
  //     console.log("commentId  ", commentId);
  //     console.log("place ", place);
  //   } catch (error) {
  //     console.log(error);
  //     response.status(400).json({ error: error.message });
  //   }
  // }

  if (request.method === "POST") {
    try {
      const commentData = request.body;

      const comment = await Comment.create(commentData);
      response.status(200).json(commentData);

      console.log("comment ", comment);

      await Place.findByIdAndUpdate(
        id,
        {
          $push: { comments: comment._id },
        },
        { new: true }
      );
    } catch (error) {
      console.log(error);
      response.status(400).json({ error: error.message });
    }
  }
}
