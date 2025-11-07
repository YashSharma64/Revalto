import {prisma} from "../../DB/config.js"

export const createPost = async (req, res) => {
    try {
        const { itemName, itemImgUrl, description, originalPrice, secondHandPrice, condition, warrantyRemaining, isAvailable, isPostedAnonymously, authorId, category } = req.body;

        if( !itemName || !itemImgUrl || !description || !originalPrice || !secondHandPrice || !condition || !warrantyRemaining || !authorId || !category ){
            return res.status(400).json({
                message: "All required fields must be provided." 
            }); 
        }

        const newPost = await prisma.post.create({
            data: {
                itemName,
                category,
                itemImgUrl,
                description,
                originalPrice: parseFloat(originalPrice),
                secondHandPrice: parseFloat(secondHandPrice),
                condition,
                warrantyRemaining,
                isAvailable: isAvailable ?? true,
                isPostedAnonymously: isPostedAnonymously ?? true,
                authorId: parseInt(authorId),
            },
            include: {
                author: {
                    select: {
                        id: true, 
                        name: true, 
                        email: true 
                    },
                },
            },
        });

        res.status(201).json({
            message: "Post created successfully.",
            post: newPost,
        });
    }catch(error) {
        console.error("Error creating post:", error);
        res.status(500).json({ message: "Internal server error.", error: error.message });
  }
};

export const getPosts = async(req,res) => {
    try{
        const {category} = req.params
        const whereClause = category? {category} : {}
        const posts = await prisma.post.findMany({
            where : whereClause
        })
        if (!posts || posts.length === 0) {
            return res.status(404).json({
                success: false,
                message: `No posts found for category "${category}".`,
        });
    }
        return res.status(200).json(posts)
    }catch(error){
        console.error("Error fetching post:", error);
        res.status(500).json({ message: "Internal server error.", error: error.message });
    }
}

