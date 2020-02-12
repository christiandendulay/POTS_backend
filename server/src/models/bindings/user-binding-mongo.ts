import { IDBModel } from "../../commons/types";
import { User } from "../mongo-models";

const userModel: IDBModel<any> = {
  insert: async addUser => {
    const { name } = addUser;
    const newUser = await new User({ name });
    return new Promise((resolve, reject) => {
      newUser.save((err, res) => {
        err ? reject(err) : resolve(res);
      });
    });
  },
  getById: async id => {
    const user: any = await User.findOne({ _id: id }).exec();
    if (!user._id) {
      throw new Error("No user found");
    }
    return {
      id: user.id,
      name: user.name
    };
  },
  getAll: async () => {
    const users: any = await User.find({}).exec();

    return users.map(u => ({
      id: u._id.toString(),
      name: u.name
    }));
  },

  getAllByPO: async id => {},

  updateById: async data => {
    const user: any = await User.findByIdAndUpdate(
      {
        _id: data.id
      },
      {
        name: data.name
      },
      {
        new: true
      }
    ).exec();
    return {
      id: user._id,
      name: user.name
    };
  },
  deleteById: async id => {
    return new Promise((resolve, reject) => {
      User.findByIdAndDelete(id).exec((err, res) => {
        err ? reject(err) : resolve(res);
      });
    });
  }
};

export { userModel };
