const prisma = require("../prisma/index");

exports.notification = async (req, res) => {
  try {
    const { id, title, description, event, createdAt, updatedAt } = req.body;

    const options = {
      onedayBefore: new Date(event.eventDate - 3 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    };

    const notification = await prisma.notification.update({
      data: {
        id,
        title,
        description,
        event,
        createdAt,
        updatedAt,
      },
    });

    if (options.onedayBefore) {
      return res
        .status(200)
        .json({ message: "The event will be closed tomorrow" });
    }

    if (updatedAt.updatedAt) {
      return res.status(200).json({ message: "The event is updated now" });
    }

    if (createdAt.createdAt) {
      return res.status(200).json({ message: "Another event is open now" });
    }
  } catch (err) {}
};
