const prisma = require("../prisma/index");
const verJwtToken = require("../helpers/verJwtToken");

exports.uploadFaq = async (req, res) => {
  try {
    const { title, description, keyword } = req.body;

    if (!title || !description || !keyword) {
      return res.status(400).json({ error: "Please provide all field" });
    }

    const tk = req.headers["authorization"];
    if (!tk) return res.sendStatus(403);

    if (!verJwtToken(tk)) return res.sendStatus(403);

    const { userId, iat, exp } = verJwtToken(tk);

    if (exp > Date.now()) {
      return res.sendStatus(403);
    }

    const checkOrg = await prisma.organization.findFirst({
      where: { id: userId },
    });

    if (checkOrg) {
      const formattedEventDate = new Date(eventDate).toISOString();
      const organizationReference = {
        connect: { id: checkOrg },
      };
      const event = await prisma.event.create({
        data: {
          title,
          description,
          keyword,
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

exports.deleteFaq = async (req, res) => {
  try {
    const { id } = req.body;
    const faq = await prisma.faq.findFirst({
      where: { id: id },
    });

    if (!faq) {
      return res.status(400).json({ error: "Faq not found" });
    }

    const tk = req.headers["authorization"];
    if (!tk) return res.sendStatus(403);

    if (!verJwtToken(tk)) return res.sendStatus(403);

    const { userId, iat, exp } = verJwtToken(tk);

    if (exp > Date.now()) {
      return res.sendStatus(403);
    }

    const checkOrg = await prisma.organization.findFirst({
      where: { id: userId },
    });

    if (checkOrg) {
      await prisma.faq.delete({ where: { id: id } });
      return res.status(200).json({ message: "faq deleted" });
    } else {
      return res.status(403).json({ error: "Permission denied" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error occurred" });
  }
};

exports.updateFaq = async (req, res) => {
  try {
    const { id, title, description, keyword } = req.body;

    const existFaq = await prisma.faq.findFirst({
      where: { id: id },
    });

    const tk = req.headers["authorization"];
    if (!tk) return res.sendStatus(403);

    if (!verJwtToken(tk)) return res.sendStatus(403);

    const { userId, iat, exp } = verJwtToken(tk);

    if (exp > Date.now()) {
      return res.sendStatus(403);
    }

    const checkOrg = await prisma.organization.findFirst({
      where: { id: userId },
    });

    if (!existEvent.checkOrg) {
      return res.status(403).json({ error: "Permission denied" });
    } else {
      const updatedFaq = await prisma.faq.update({
        where: { id: id },
        data: {
          title,
          description,
          keyword,
        },
      });
    }

    return res.status(200).json({ message: "faq update" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error occurred" });
  }
};
