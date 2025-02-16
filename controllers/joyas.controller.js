import { joyasModel } from "../models/joyas.model.js";
const getJoyasAllController = async (req, res) => {
  const { limits, page, order_by } = req.query;

  const isPageValid = /^[1-9]\d*$/.test(page);
  if (!isPageValid) {
    return res.status(400).json({ message: "Invalid page number, number > 0" });
  }

  try {
    const joyas = await joyasModel.getJoyasAllModel({ limits, page, order_by });
    return res.json(joyas);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const getJoyasFiltroController = async (req, res) => {
  const { precio_min, precio_max, categoria, metal } = req.query;

  try {
    const joyasFiltradas = await joyasModel.getJoyasFiltroModel({
      precio_min,
      precio_max,
      categoria,
      metal,
    });
    return res.json(joyasFiltradas);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const getJoyasError = async (req, res) =>
  res.status(404).send("Esta ruta no existe");

export const joyasController = {
  getJoyasAllController,
  getJoyasFiltroController,
  getJoyasError,
};
