import { getToken, hashPass, verifyPass } from "../../auth/index.js";
import { userValidator } from "../../helpers/validator.js";
import { UserModel } from "../../model/user.js";

export class UserController {
  register = async (req, res) => {
    try {
      userValidator.validateAsync(req.body);
      const user = await UserModel.create({
        ...req.body,
        password: await hashPass(req.body.password),
      });
      return res
        .status(201)
        .json({ user: user.username, message: "User created" });
    } catch (err) {
      return res.status(500).json({ message: "Error creating new user" }).end();
    }
  };

  login = async (req, res) => {
    try {
      const user = await UserModel.findOne({ username: req.body.username });
      if (!user)
        return res.status(401).json({ message: "Invalid credentials" }).end();
      if (!(await verifyPass(req.body.password, user.password)))
        return res.status(401).json({ message: "Invalid credentials" }).end();
      const token = await getToken({
        _id: String(user._id),
        username: user.username,
        role: user.role,
      });
      return res.json({
        message: `Welcome ${user.username}`,
        token: token?.[0],
      });
    } catch (err) {
      return res.status(500).end();
    }
  };

  me = async (req, res) => {
    const user = await UserModel.findById(req.body.user._id);
    if (!user) return res.status(401).end();
    return res
      .json({ id: user._id, username: user.username, role: user.role })
      .end();
  };
}
