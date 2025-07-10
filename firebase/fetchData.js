import { collection, getDocs } from "firebase/firestore";
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