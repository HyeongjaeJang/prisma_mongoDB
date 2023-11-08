const prisma = require("../prisma/index");
const cookieToken = require("../utils/cookieToken");

exports.uploadEvent = async (req, res) => {
  try {
    const { keyword, eventDate, title, description, organization, location } =
      req.body;
    if (
      !keyword ||
      !eventDate ||
      !title ||
      !description ||
      !organization ||
      !location
    ) {
      return res.status(400).json({ error: "Please provide all fields" });
    }
    if (organization.id === organization.id) {
      const formattedEventDate = new Date(eventDate).toISOString();
      const organizationReference = {
        connect: { id: organization },
      };
      const event = await prisma.event.create({
        data: {
          keyword,
          eventDate: formattedEventDate,
          title,
          description,
          organization: organizationReference,
          location,
        },
      });
      cookieToken(event, res);
      return res.status(200).json({ message: "Event created" });
    } else {
      return res.status(403).json({ error: "Permission denied" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "error occurred" });
  }
};

exports.deleteEvent = async (req, res) => {
  try {
    const { id, organization } = req.body;
    const event = await prisma.event.findFirst({
      where: { id: id },
    });

    if (!event) {
      return res.status(400).json({ error: "Event not found" });
    }

    if (event.organizationId === organization) {
      await prisma.event.delete({ where: { id: id } });
      return res.status(200).json({ message: "Event deleted" });
    } else {
      return res.status(403).json({ error: "Permission denied" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error occurred" });
  }
};

exports.updateEvent = async (req, res) => {
  try {
    const {
      id,
      keyword,
      eventDate,
      title,
      description,
      organization,
      location,
    } = req.body;

    const existEvent = await prisma.event.findFirst({
      where: { id: id },
    });

    if (existEvent.organizationId !== organization) {
      return res.status(403).json({ error: "Permission denied" });
    }

    const updatedEvent = await prisma.event.update({
      where: { id: id },
      data: {
        keyword,
        eventDate,
        title,
        description,
        organization,
        location,
      },
    });

    return res.status(200).json({ message: "Event update" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error occurred" });
  }
};
