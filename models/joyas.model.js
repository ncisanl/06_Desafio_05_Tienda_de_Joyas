import format from "pg-format";
import { pool } from "../database/connection.js";

const BASE_URL = `/joyas`;

const getJoyasAllModel = async ({
  limits = 3,
  page = 1,
  order_by = "id_ASC",
}) => {
  const [order, by] = order_by.split("_");
  const query = "SELECT * FROM inventario ORDER BY %s %s LIMIT %s OFFSET %s";
  const offset = (page - 1) * limits;
  const formattedQuery = format(query, order, by, limits, offset);
  const { rows } = await pool.query(formattedQuery);

  const totalJoyas = rows.length;

  const stockTotal = rows.reduce((sum, row) => sum + row.stock, 0);

  const results = rows.map((row) => {
    return {
      name: row.nombre,
      href: `${BASE_URL}/joyas/${row.id}`,
    };
  });

  return {
    totalJoyas,
    stockTotal,
    results,
  };
};

const getJoyasFiltroModel = async ({
  precio_min,
  precio_max,
  categoria,
  metal,
}) => {
  let filtros = [];
  const values = [];

  const agregarFiltro = (campo, comparador, valor) => {
    values.push(valor);
    const { length } = filtros;
    filtros.push(`${campo} ${comparador} $${length + 1}`);
  };

  if (precio_min) agregarFiltro("precio", ">=", precio_min);
  if (precio_max) agregarFiltro("precio", "<=", precio_max);
  if (categoria) agregarFiltro("categoria", "=", categoria);
  if (metal) agregarFiltro("metal", "=", metal);

  let query = "SELECT * FROM inventario";
  if (filtros.length > 0) {
    filtros = filtros.join(" AND ");
    query += ` WHERE ${filtros}`;
  }
  const { rows } = await pool.query(query, values);
  return rows;
};

export const joyasModel = {
  getJoyasAllModel,
  getJoyasFiltroModel,
};
