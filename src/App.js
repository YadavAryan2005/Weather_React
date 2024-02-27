import React, { useState } from "react";
import "./App.css";
import cloud from "./cloud.74ca3faf.gif";
import cloud1 from "./sun.a9f38bbe.gif";
export default function App() {
  const [city, setCity] = useState();
  let [data, setData] = useState("");
  const [date, setDate] = useState();
  const [wphoto, setWphoto] = useState();
  let dis = async () => {
    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=metric&include=current&key=WN9GQE95HAJ9NGDU8U4FDFQ6E&contentType=json`;
    let d = new Date();
    let date1 = d.toDateString();
    setDate(date1);
    try {
      let result = await fetch(url);
      result = await result.json();
      console.log(result);
      if (result.currentConditions.conditions === "Clear") {
        setWphoto(1);
      } else {
        setWphoto(0);
      }
      setData(result);
    } catch (error) {
      alert("No such city found");
    }
  };
  return (
    <div
      className={`w-full h-[100vh] p-10 ${
        wphoto === 0 ? "bg-slate-400" : wphoto === 1 ? "demo" : ""
      }`}
    >
      {wphoto === undefined ? (
        " "
      ) : (
        <div className="w-full flex justify-center">
          <div className="m-2 w-36">
            {wphoto === 1 ? (
              <img src={cloud1} alt="" />
            ) : (
              <img src={cloud} alt="" />
            )}
          </div>
        </div>
      )}
      <div className=" flex justify-center w-full h-full">
        <div className="w-72 h-80 border rounded-2xl shadow-2xl p-7 shadow-blue-300">
          <div className="bg-white w-full p-1 rounded-lg border-2 border-blue-700">
            <input
              className="rounded-lg w-40 outline-none px-3 font-serif"
              type="text"
              onChange={(e) => {
                setCity(e.target.value);
              }}
              placeholder="Enter city"
            />
            <button
              className="bg-blue-700 rounded-md px-2 font-serif text-white float-right font-bold"
              onClick={dis}
            >
              Go
            </button>
          </div>
          {data === "" ? (
            <div className="p-10">
              <div className="text-blue-700 font-serif text-xl justify center font-bold text-center">
                Search weather of any city
              </div>
            </div>
          ) : (
            <div className="text-blue-700 font-serif text-xl justify center font-bold text-center h-full py-9 flex flex-col space-y-2">
              <h1>{date}</h1>
              <h2>{data.resolvedAddress}</h2>
              <h3>{data.currentConditions.temp}°c</h3>
              <h4>{data.currentConditions.conditions}</h4>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
