import Service from "../models/service";

export const addService = async (req, res) => {
  const { title, description, price, location, category } = req.body;

  if (!title || !price || !location || !category) {
    return res.status(400).json({ message: "Please fill all required fields" });
  }

  const service = await Service.create({
    guide: req.user._id,
    title,
    description,
    price,
    location,
    category,
  });

  res.status(201).json(service);
};

export const getServices = async (req, res) => {
  const services = await Service.find().populate("guide", "name email");
  res.json(services);
};
