"use client";

import Image from "next/image";
import { useState } from "react";

interface InputData {
  original: string;
  ultimaLectura: number;
  consumo: number;
  fechaUltimaLectura: string;
  fechaInstalacion: string;
}

export default function Home() {
  const getYesterday = () => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    return yesterday.toISOString().split("T")[0];
  };

  const [inputData, setInputData] = useState<InputData>({
    original: "",
    ultimaLectura: 0,
    consumo: 0,
    fechaUltimaLectura: "",
    fechaInstalacion: getYesterday(),
  });

  const [totalConsumo, setTotalConsumo] = useState(0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const [ultimaLectura, consumo, fechaUltimaLectura] = value.split("\t");
    setInputData({
      ...inputData,
      original: value,
      ultimaLectura: +ultimaLectura,
      consumo: +consumo,
      fechaUltimaLectura,
    });
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setInputData({
      ...inputData,
      fechaInstalacion: value,
    });
  };

  const getDays = (startDate: string, endDate: string) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const days = (end.getTime() - start.getTime()) / (1000 * 3600 * 24) - 1;
    return days;
  };

  const imprimir = () => {
    console.log(inputData);
    // const days = getDays("2024-05-08", "2024-06-10");
    // console.log(days);
  };

  const calcularLectura = () => {
    const days = getDays(
      inputData.fechaUltimaLectura,
      inputData.fechaInstalacion
    );
    const consumoDiario = inputData.consumo / 30;
    const consumoTotal = consumoDiario * days + inputData.ultimaLectura;
    setTotalConsumo(Math.ceil(consumoTotal));
  };

  const clean = () => {
    setInputData({
      ...inputData,
      original: "",
      ultimaLectura: 0,
      consumo: 0,
      fechaUltimaLectura: "",
    });
  };
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-6xl font-bold">Calculadora!</h1>
      <form action="">
        <div className="flex flex-col gap-4">
          <div>
            <input
              type="text"
              className="w-96 h-16 p-4 border-2 border-gray-300 rounded-lg text-blue-500 font-b"
              placeholder="Digite um número"
              onChange={handleInputChange}
              value={inputData.original}
            />
          </div>

          <div>
            <input
              type="date"
              className="w-96 h-16 p-4 border-2 border-gray-300 rounded-lg text-blue-500 font-b"
              value={inputData.fechaInstalacion as string}
              onChange={handleDateChange}
            />
          </div>

          <div>
            <input
              type="text"
              placeholder="Total de consumo"
              className="w-96 h-16 p-4 border-2 border-gray-300 rounded-lg text-blue-500 font-b"
              value={totalConsumo}
            />
          </div>
        </div>

        <div className="flex justify-between mt-4">
          <button
            type="button"
            className="w-36 h-16 bg-blue-500 text-white font-bold rounded-lg"
            onClick={calcularLectura}
          >
            Calcular
          </button>
          <button
            className="w-36 h-16 bg-red-500 text-white font-bold rounded-lg"
            type="button"
            onClick={clean}
          >
            Limpar
          </button>
        </div>
      </form>
    </main>
  );
}
