import { db } from "./firebaseConfig"; // your existing file
import { collection, addDoc, Timestamp } from "firebase/firestore";

export const storeInvoice = async ({
  customerName,
  customerPhone,
  company,
  carModel,
  workDone,
  prices,
  total,
}) => {
  const invoice = {
    customerName,
    customerPhone,
    company,
    carModel,
    workDone,
    prices,
    total,
  };
  try {
    const docRef = await addDoc(collection(db, "invoices"), {
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
