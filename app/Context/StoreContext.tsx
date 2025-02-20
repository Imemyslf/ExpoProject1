import { createContext, useContext, useState, ReactNode } from "react";

interface CompanyContextType {
  selectedCompany: string | null;
  setSelectedCompany: (company: string) => void;
}

const CompnayContext = createContext<CompanyContextType | undefined>(undefined);

export const CompanyProvider = ({ children }: { children: ReactNode }) => {
  const [selectedCompany, setSelectedCompany] = useState<string | null>(null);

  return (
    <CompnayContext.Provider value={{ selectedCompany, setSelectedCompany }}>
      {children}
    </CompnayContext.Provider>
  );
};

export const useCompany = () => {
  const context = useContext(CompnayContext);
  if (!context) {
    throw new Error("useCompany must be used within a CompanyProvider");
  }
  return context;
};
