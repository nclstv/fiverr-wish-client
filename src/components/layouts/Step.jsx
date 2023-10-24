import React from "react";

function Step({ name, descritpion, number }) {
  return (
    <div className="bg-gray-100 p-4 rounded-lg flex items-center gap-4">
      <div className="text-white font-bold min-w-[2.5rem] w-10 h-10 bg-gradient-to-r to-green-500 from-lime-500 flex justify-center items-center rounded-full">
        {number}
      </div>
      <div>
        <h1 className="font-semibold">{name}</h1>
        <p className="text-gray-500 text-sm">{descritpion}</p>
      </div>
    </div>
  );
}

export default Step;
