import { createContext, useContext, useState, ReactNode } from "react";

interface CompanyContextType {
  selectedCompany: string | null;
  setSelectedCompany: (company: string) => void;
}

interface ModelsContextType {
  selectedModelType: string | null;
  setSelectedModelType: (modelType: string) => void;
}

const CompanyContext = createContext<CompanyContextType | undefined>(undefined);
const ModelContext = createContext<ModelsContextType | undefined>(undefined);

export const CompanyProvider = ({ children }: { children: ReactNode }) => {
  const [selectedCompany, setSelectedCompany] = useState<string | null>(null);

  return (
    <CompanyContext.Provider value={{ selectedCompany, setSelectedCompany }}>
      {children}
    </CompanyContext.Provider>
  );
};

export const ModelProvider = ({ children }: { children: ReactNode }) => {
  const [selectedModelType, setSelectedModelType] = useState<string | null>(
    null
  );

  return (
    <ModelContext.Provider value={{ selectedModelType, setSelectedModelType }}>
      {children}
    </ModelContext.Provider>
  );
};

export const useCompany = () => {
  const context = useContext(CompanyContext);
  if (!context) {
    throw new Error("useCompany must be used within a CompanyProvider");
  }
  return context;
};

export const useModel = () => {
  const context = useContext(ModelContext);
  if (!context) {
    throw new Error("useModel must be used within a ModelProvider");
  }
  return context;
};

export { CompanyContext, ModelContext };
