import Transaction from "../models/Transaction.js";

export const index = async (req, res) => {
    const transaction = await Transaction.find({user_id:req.user._id}).sort({ createdAt: -1 });
    
    const demo = await Transaction.aggregate([
      {
        $match:{user_id:req.user._id}
      },
      {
        $group:{
          _id:{$month:"$date"},
          transactions:{$push:{amount:"$amount",description:"$description",date:"$date",category_id:"$category_id",_id:"$_id"}},
          totalExpenses:{$sum:"$amount"}
        },
      },
    ])
    res.json({ data: demo });
  }

export const create = async (req, res) => {
  // console.log(req.user);
    const { amount, description, date, category_id } = req.body;
    const transaction = new Transaction({
      amount: amount,
      description: description,
      user_id:req.user._id,
      date: date,
      category_id,
    });
    await transaction.save();
    res.json({ message: "Success" });
  }

export const remove = async (req, res) => {
    await Transaction.findOneAndDelete({ _id: req.params.id });
    res.json({ message: "Deleted Successfully" });
  }

export const update = async (req, res) => {
    await Transaction.updateOne({ _id: req.params.id }, { $set: req.body });
    res.json({ message: "Updated Successfully" });
  }