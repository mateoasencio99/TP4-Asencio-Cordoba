import React, { createContext, useContext, useState } from "react";

const SalesContext = createContext();

export const Provider = ({ children }) => {
    const [currentEventId, setCurrentEventId] = useState(0);
    const [currentTickets, setCurrentTickets] = useState([{ nombre: "", apellido: "", dni: "" }]);
    return (
      <SalesContext.Provider value={{ currentEventId, setCurrentEventId, currentTickets, setCurrentTickets }}>
        {children}
      </SalesContext.Provider>
    );
  };
  
  export const useSalesContext = () => {
    return useContext(SalesContext);
  };