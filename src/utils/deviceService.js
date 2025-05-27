import { db } from "../../lib/Firebase.js";
import { collection, addDoc, getDocs } from "firebase/firestore";

export async function getDevices() {
  const querySnapshot = await getDocs(collection(db, "devices"));
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));
}


// Convert file to Base64
const toBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });


  const getDefaultImage = (type) => {
  const images = {
    Phone: "/phone.webp",
    Laptop: "/laptop.webp",
    Tab: "/tab.webp",
    Other: "/others.webp",
  };
  return images[type] || images.Other;
};
export const saveDevice = async (device) => {
  let base64Image = "";

  if (device.image instanceof File) {
    base64Image = await toBase64(device.image);
  }

const deviceData = {
  ...device,
  image: base64Image || getDefaultImage(device.type),
};

  const docRef = await addDoc(collection(db, "devices"), deviceData);
  return docRef.id;
};
