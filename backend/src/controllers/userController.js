import { prisma } from "../../DB/config.js";
import bcrypt from "bcrypt";

export const updateUser = async (req, res) => {
  try {
    const userId = req.user.id;
    const updateData = { ...req.body };

    if (updateData.password) {
      const hashedPassword = await bcrypt.hash(updateData.password, 10);
      updateData.password = hashedPassword;
    } else {
      delete updateData.password;
    }

    const user = await prisma.user.update({
      where: { id: userId },
      data: updateData,
    });

    return res.status(200).json({
      message: "User Updated Successfully",
      user,
    });
  } catch (error) {
    console.error("Error updating user:", error);
    return res
      .status(500)
      .json({ message: "Internal server error.", error: error.message });
  }
};

export const getUser = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        userName: true,
        email: true,
        imgUrl: true,
        annonymousImgUrl: true,
        gender: true,
        phone: true,
        hostel: true,
        roomNumber: true,
        isVerified: true,
        isProfileAnonymous: true,
        academicYear: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ message: "User fetched successfully", user });
  } catch (error) {
    console.error("Error fetching user:", error);
    return res
      .status(500)
      .json({ message: "Internal server error.", error: error.message });
  }
};
