import { db } from "../firebaseConfig";
import {
  collection,
  addDoc,
  Timestamp,
  query,
  where,
  getDocs,
  updateDoc,
  doc,
} from "firebase/firestore";

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
  const today = new Date();
  const dateString = today.toISOString().slice(0, 10);

  const invoicesRef = collection(db, "invoices");

  const q = query(
    invoicesRef,
    where("createdDate", "==", dateString)
  );

  const snapshot = await getDocs(q);

  let matchedDoc = null;

  if (!snapshot.empty) {
    for (const docSnap of snapshot.docs) {
      const data = docSnap.data();

      // ✅ Check if workDone arrays match (exact order & length)
      const isSameWorkDone =
        Array.isArray(data.workDone) &&
        workDone.length === data.workDone.length &&
        workDone.every((item, index) => item === data.workDone[index]);

      if (isSameWorkDone) {
        matchedDoc = { id: docSnap.id, data };
        break;
      }
    }
  }

  if (matchedDoc) {
    // ✅ Update only the changed fields
    const updatePayload = {};

    if (matchedDoc.data.customerName !== customerName)
      updatePayload.customerName = customerName;

    if (matchedDoc.data.customerPhone !== customerPhone)
      updatePayload.customerPhone = customerPhone;

    if (matchedDoc.data.company !== company)
      updatePayload.company = company;

    if (matchedDoc.data.carModel !== carModel)
      updatePayload.carModel = carModel;

    if (matchedDoc.data.paymentMode !== paymentMode)
      updatePayload.paymentMode = paymentMode;

    if (matchedDoc.data.total !== total)
      updatePayload.total = total;

    if (
      JSON.stringify(matchedDoc.data.prices) !== JSON.stringify(prices)
    ) {
      updatePayload.prices = prices;
    }

    if (Object.keys(updatePayload).length === 0) {
      console.log("🟡 No changes found. Invoice already up-to-date.");
      return matchedDoc.id;
    }

    try {
      const docRef = doc(db, "invoices", matchedDoc.id);
      await updateDoc(docRef, updatePayload);
      console.log("✅ Existing invoice updated:", matchedDoc.id);
      return matchedDoc.id;
    } catch (err) {
      console.error("❌ Failed to update invoice:", err);
      throw err;
    }
  } else {
    // ❌ No match — create new invoice
    const newInvoice = {
      customerName,
      customerPhone,
      company,
      carModel,
      workDone,
      prices,
      total,
      paymentMode,
      createdDate: dateString,
      createdAt: Timestamp.now(),
    };

    try {
      const newDocRef = await addDoc(invoicesRef, newInvoice);
      console.log("🆕 New invoice created with ID:", newDocRef.id);
      return newDocRef.id;
    } catch (err) {
      console.error("❌ Failed to create new invoice:", err);
      throw err;
    }
  }
};
