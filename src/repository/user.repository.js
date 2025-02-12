import User from "../models/User.model.js";

class UserRepository {
    async createUser({ username, email, password, verificationToken }) {
        try {
            const new_user = new User({
                username,
                email,
                password,
                verificationToken,
                modifiedAt: null,
            });
            return await new_user.save();
        } catch (error) {
            console.error(error);
            throw new Error("Error al crear usuario");
        }
    }

    async findUserByEmail(email) {
        return await User.findOne({ email: email });
    }

    async findById(id) {
        return await User.findById(id);
    }

    async verifyUser(user_id) {
        const user = await this.findById(user_id);
        user.verified = true;
        user.save();
    }
}

export default new UserRepository();
