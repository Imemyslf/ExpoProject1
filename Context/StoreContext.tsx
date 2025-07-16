import { createContext, useContext, useState, ReactNode } from "react";

interface CompanyContextType {
  selectedCompany: string | null;
  setSelectedCompany: (company: string) => void;
}

interface ModelsContextType {
  selectedModelType: string | null;
  setSelectedModelType: (modelType: string) => void;
}

interface WorkContextType {
  selectedWorkType: string[] | null;
  setSelectedWorkType: (workType: string[]) => void;
}

interface InvoiceData {
  customerName: string;
  customerPhone: string;
  workDone: string[];
  prices: Record<number, number>;
  total: number;
  paymentMode: "UPI" | "Cash" | "None"; // <-- added
}

interface InvoiceContextType {
  invoiceData: InvoiceData | null;
  setInvoiceData: (data: InvoiceData) => void;
}

interface TabContextType {
  activeTab: "main"  | "invoice";
  setActiveTab: (tab: "main" | "invoice") => void;
}

const CompanyContext = createContext<CompanyContextType | undefined>(undefined);
const ModelContext = createContext<ModelsContextType | undefined>(undefined);
const WorkContext = createContext<WorkContextType | undefined>(undefined);
const InvoiceContext = createContext<InvoiceContextType | undefined>(undefined);
const TabContext = createContext<TabContextType | undefined>(undefined);

export const CompanyProvider = ({ children }: { children: ReactNode }) => {
  const [selectedCompany, setSelectedCompany] = useState<string | null>(null);

  return (
    <CompanyContext.Provider value={{ selectedCompany, setSelectedCompany }}>
      {children}
    </CompanyContext.Provider>
  );
};

export const ModelProvider = ({ children }: { children: ReactNode }) => {
  const [selectedModelType, setSelectedModelType] = useState<string | null>(null);

  return (
    <ModelContext.Provider value={{ selectedModelType, setSelectedModelType }}>
      {children}
    </ModelContext.Provider>
  );
};

export const WorkProvider = ({ children }: { children: ReactNode }) => {
  const [selectedWorkType, setSelectedWorkType] = useState<string[]>([]);

  return (
    <WorkContext.Provider value={{ selectedWorkType, setSelectedWorkType }}>
      {children}
    </WorkContext.Provider>
  );
};

export const InvoiceProvider = ({ children }: { children: ReactNode }) => {
  const [invoiceData, setInvoiceData] = useState<InvoiceData | null>(null);

  return (
    <InvoiceContext.Provider value={{ invoiceData, setInvoiceData }}>
      {children}
    </InvoiceContext.Provider>
  );
};

export const TabProvider = ({ children }: { children: ReactNode }) => {
  const [activeTab, setActiveTab] = useState<"main" | "invoice">("main");

  return (
    <TabContext.Provider value={{ activeTab, setActiveTab }}>
      {children}
    </TabContext.Provider>
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

export const useWork = () => {
  const context = useContext(WorkContext);
  if (!context) {
    throw new Error("useWork must be used within a WorkProvider");
  }
  return context;
};

export const useInvoice = () => {
  const context = useContext(InvoiceContext);
  if (!context) {
    throw new Error("useInvoice must be used within an InvoiceProvider");
  }
  return context;
};

export const useTab = () => {
  const context = useContext(TabContext);
  if (!context) {
    throw new Error("useTab must be used within a TabProvider");
  }
  return context;
};

export { CompanyContext, ModelContext, WorkContext, InvoiceContext, TabContext };
