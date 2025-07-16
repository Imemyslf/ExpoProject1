import { db } from "./firebaseConfig";
import { collection, addDoc, Timestamp, query, where, getDocs } from "firebase/firestore";

export const storeInvoice = async ({
  customerName,
  customerPhone,
  company,
  carModel,
  workDone,
  prices,
  total,
  paymentMode,
}) => {
  // Get today's date string (YYYY-MM-DD)
  const today = new Date();
  const dateString = today.toISOString().slice(0, 10);

  // Check if an invoice already exists for this customer and date
  const invoicesRef = collection(db, "invoices");
  const q = query(
    invoicesRef,
    where("customerName", "==", customerName),
    where("createdDate", "==", dateString)
  );
  const snapshot = await getDocs(q);

  if (!snapshot.empty) {
    // Invoice already exists for this customer and date
    console.log("Invoice already exists for this customer and date.");
    return null;
  }

  const invoice = {
    customerName,
    customerPhone,
    company,
    carModel,
    workDone,
    prices,
    total,
    paymentMode,
    createdDate: dateString, // store date for easy querying
  };

  try {
    const docRef = await addDoc(invoicesRef, {
      ...invoice,
      createdAt: Timestamp.now(),
    });
    console.log("Invoice saved with ID:", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Error saving invoice:", error);
    throw error;
  }
};
