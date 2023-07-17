const Comment = require("../models/Comment");

//modificar codigo para add extras

const CommentController ={
    async create(req, res){
        try {
            const comment = await Comment.create(req.body)
            res.status(201).send({message: "Comment posted", comment})
        } catch (error) {
            console.error(error)
            res.status(500).send({ message: 'Error posting the comment' })
        }
    },
    async update(req, res){
        try {
            const comment = await Comment.findByIdAndUpdate(req.params._id, req.body, { new: true })
            res.send({message:"This comment has been updated successfully", comment});
        } catch (error) {
            console.error(error)
            res.status(500).send({ message: "Sorry! We could not updated this comment! You need to be authorized!", error })
        }
    },

}


module.exports = CommentController;


// const OrderController = {
//     . . .
//      async update(req, res) {
//       try {
//         const order = await Order.findByIdAndUpdate(
//           req.params._id,
//           { ...req.body, userId: req.user._id },
//           {
//             new: true,
//           }
//         );
//         res.send({ message: "order successfully updated", order });
//       } catch (error) {
//         console.error(error);
//       }
//     },
//   }
  