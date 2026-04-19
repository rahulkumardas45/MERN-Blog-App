import { handleError } from "../helpers/handleError.js";
import BlogLike from "../models/BlogLike.model.js";

export const doLike = async (req, res, next)=>{
    try {
        const {user, blogid} = req.body;

         let like = await BlogLike.findOne({user, blogid})
        
         if(!like){
            const saveLike = new BlogLike({
                user, blogid
            })

          await saveLike.save()
          // increment the like count in redis
          await redisClient.incr(`likes:${blogid}`);

         }else{
            await BlogLike.deleteOne({user, blogid})

            // decrement the like count in redis
            await redisClient.decr(`likes:${blogid}`);
         }

         let likecount = await redisClient.get(`likes:${blogid}`);


   res.status(200)
   .json({
    likecount: Number(likecount)
   })




    } catch (error) {
        next(handleError(500, error.message))
    }
}

export const likeCount = async (req, res, next)=>{
  try {
    const { blogid, userid } = req.params;

    // 🔥 check Redis first
    let likecount = await redisClient.get(`likes:${blogid}`);

    if(!likecount){
      console.log("📦 From DB");

      likecount = await BlogLike.countDocuments({blogid});

      // store in Redis
      await redisClient.setEx(`likes:${blogid}`, 300, likecount);
    } else {
      console.log("⚡ From Redis");
    }

    let isUserliked = false;

    if(userid){
      const getuserlike = await BlogLike.countDocuments({blogid, user: userid});
      if(getuserlike > 0){
        isUserliked = true;
      }
    }

    res.status(200).json({
      likecount: Number(likecount),
      isUserliked
    });

  } catch (error) {
    next(handleError(500, error.message))
  }
};

