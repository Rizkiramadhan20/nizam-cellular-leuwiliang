import { collection, query, where, onSnapshot } from "firebase/firestore";

import { db } from "@/utils/firebase/firebase";

import { ContactType } from "@/hooks/pages/contact/types/Contact";

export function FetchContact(callback: (contact: ContactType[]) => void) {
  const q = query(
    collection(db, process.env.NEXT_PUBLIC_COLLECTIONS_CONTACT as string),
    where("createdAt", "!=", "")
  );

  return onSnapshot(q, (snapshot) => {
    callback(
      snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate?.().toISOString() || "",
        updatedAt: doc.data().updatedAt?.toDate?.().toISOString() || "",
      })) as ContactType[]
    );
  });
}
