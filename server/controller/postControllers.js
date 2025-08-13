import  {Post}  from "../models/postModel.js";
 
const createPostController=async(req,res)=>
{
    try {
        const{title,description}=req.body;

        if(!title || !description)
        {
            return res.json({
                success:false,
                message:"title or description not sent properly"
            })
        }

        const newPost=new Post({
            title,
            description,
            postedBy:req.auth._id,
        });
        const savedPost=await newPost.save();
        
console.log('req object here is ====----===->>> ',req);

        if(savedPost)
        {
            return res.json({
                success:true,
                message:"post saved successfully",
                savedPost:savedPost,
            })
        }
        
    } catch (error) {
        return res.json({
            success:false,
            message:"post not saved successfully",
            error:error,
        })
    }

}


export {createPostController};