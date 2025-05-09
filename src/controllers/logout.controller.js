

const logout = async (req, res) => {
    const userId = req.body.userId;

    if (!userId) {
        return res.status(400).json({ error: "Please provide a userId" });
    }

    try {
        const existingUser = await User.findOne({ userId });

        if (!existingUser) {
            return res.status(404).json({ error: "User not found" });
        }

        existingUser.isLoggedIn = false;
        await existingUser.save();

        return res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        console.error("Error during logout:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}