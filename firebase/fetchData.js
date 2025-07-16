import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import { db } from "./firebaseConfig";

// Fetch four wheeler companies
export async function fetchFourWheelers() {
  try {
    const companyDocs = await getDocs(collection(db, "four_wheeler_companies"));
    return companyDocs.docs.map((doc) => doc.data());
  } catch (err) {
    console.error("Error fetching four wheeler companies:", err);
    return [];
  }
}

// Fetch services data
export async function fetchServices() {
  try {
    const servicesDocs = await getDocs(collection(db, "services"));
    return servicesDocs.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (err) {
    console.error("Error fetching services:", err);
    return [];
  }
}

export async function fetchLastInvoice() {
  try {
    const invoicesRef = collection(db, "invoices");
    const q = query(invoicesRef, orderBy("createdAt", "desc"), limit(1));
    const snapshot = await getDocs(q);
    if (!snapshot.empty) {
      const doc = snapshot.docs[0];
      return { id: doc.id, ...doc.data() };
    }
    return null;
  } catch (err) {
    console.error("Error fetching last invoice:", err);
    return null;
  }
}