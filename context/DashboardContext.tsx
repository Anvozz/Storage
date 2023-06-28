"use client";

import { createContext, useContext, useState } from "react";

type DashboardContextProptype = {
  children: React.ReactNode;
};

const initialValue = {
  isSidebarCollapse: false,
  isModalsidebarOpen: false,
};

type DefultContextPropertyType = {
  dashboard: {
    isSidebarCollapse: boolean;
    isModalsidebarOpen: boolean;
  };
  dashboardAction: {
    setSidebarCollapse: (val: boolean) => void;
    setModalToggle: (val: boolean) => void;
  };
};

const defaultContext: DefultContextPropertyType = {
  dashboard: initialValue,
  dashboardAction: {
    setSidebarCollapse: () => null,
    setModalToggle: () => null,
  },
};

const DashboardContext = createContext(defaultContext);

export function useDashboardContext() {
  return useContext(DashboardContext);
}

const DashboardContextProvider = ({ children }: DashboardContextProptype) => {
  const [value, setValue] = useState(initialValue);

  const setSidebarCollapse = (val: boolean) => {
    setValue((prev) => ({ ...prev, isSidebarCollapse: val }));
  };

  const setModalToggle = (val: boolean) => {
    setValue((prev) => ({ ...prev, isModalsidebarOpen: val }));
  };

  const dashboardStore = {
    dashboard: value,
    dashboardAction: {
      setSidebarCollapse,
      setModalToggle,
    },
  };

  return (
    <DashboardContext.Provider value={dashboardStore}>
      {children}
    </DashboardContext.Provider>
  );
};

export default DashboardContextProvider;
