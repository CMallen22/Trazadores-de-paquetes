import React from "react";

type Props = {
  Fuente: string 
  Destino: string
  Protocolo: string 
  Fecha: string 
  Riesgo: number 

};

const LogsCard = ({ Fuente, Destino,Protocolo, Fecha, Riesgo }: Props) => {
  return (
    <div className="flex flex-row space-x-4">
  <span className="mb-3 text-2xl font-semibold text-black">{Fuente}</span>
  <span className="mb-3 text-2xl font-semibold text-black">{Destino}</span>
  <span className="mb-3 text-2xl font-semibold text-black">{Protocolo}</span>
  <span className="mb-3 text-2xl font-semibold text-black">{Fecha}</span>
  <span className="mb-3 text-2xl font-semibold text-black">{Riesgo}</span>
</div>
    //<div>
    //  <h3 className="mb-3 text-2xl font-semibold text-black">
    //    {Fuente}
        
    //  </h3>

    //  <h3 className="mb-3 text-2xl font-semibold text-black">
    //    {Destino}
        
    //  </h3>
    //  <h3 className="mb-3 text-2xl font-semibold text-black">
    //    {Protocolo}
    //  </h3>
    //  <h3 className="mb-3 text-2xl font-semibold text-black">
    //    {Fecha}
    //  </h3>
    //  <h3 className="mb-3 text-2xl font-semibold text-black">
    //    {Riesgo}
    //  </h3>
      
    
    //</div>
  );
};

export default LogsCard;
