import React, { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { FaChartPie } from "react-icons/fa";

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#845EC2",
  "#D65DB1",
  "#FF6F91",
];

const Estadisticas = () => {
  const [estadisticas, setEstadisticas] = useState(null);

  useEffect(() => {
    const fetchEstadisticas = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/api/reclamos/estadisticas?fechaInicio=2002-04-01-00%3A00%3A00&fechaFin=2029-08-30-23%3A59%3A59"
        );
        const data = await response.json();
        setEstadisticas(data);
      } catch (error) {
        console.error("Error al obtener estadísticas:", error);
      }
    };

    fetchEstadisticas();
  }, []);

  if (!estadisticas) {
    return (
      <p className="text-center text-gray-500 mt-6">Cargando estadísticas...</p>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold text-center mb-6 flex items-center justify-center gap-2 text-indigo-600">
        <FaChartPie /> Estadísticas de Reclamos
      </h2>

      <div className="w-full h-96">
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={estadisticas.detalles}
              dataKey="porcentaje"
              nameKey="tipo"
              cx="50%"
              cy="50%"
              outerRadius={120}
              fill="#8884d8"
              label={({ name, percent }) =>
                `${name} (${(percent * 100).toFixed(0)}%)`
              }
            >
              {estadisticas.detalles.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip formatter={(value) => `${value.toFixed(2)}%`} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-8">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">
          Detalle de Reclamos
        </h3>
        <ul className="space-y-3">
          {estadisticas.detalles.map((detalle, index) => (
            <li
              key={index}
              className="bg-white shadow-md rounded-lg p-4 flex justify-between items-center border-l-4"
              style={{ borderColor: COLORS[index % COLORS.length] }}
            >
              <span className="font-medium text-gray-800">{detalle.tipo}</span>
              <span className="text-sm text-gray-500">
                {detalle.cantidad} reclamos • {detalle.porcentaje.toFixed(2)}%
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Estadisticas;
