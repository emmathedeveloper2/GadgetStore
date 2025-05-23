import { put, del, list } from '@vercel/blob';
const BUCKET_NAME = 'school-device'; // Use your actual bucket name

export async function uploadDevice(deviceData, filename) {
  const blob = new Blob([JSON.stringify(deviceData)], { type: 'application/json' });

  const { url } = await put(`${filename}.json`, blob, {
    access: 'public',
    token: import.meta.env.VITE_BLOB_READ_WRITE_TOKEN,
  });

  return url;
}

export async function fetchDevices() {
  const res = await list({ token: import.meta.env.VITE_BLOB_READ_WRITE_TOKEN });
  const jsonFiles = res.blobs.filter((blob) => blob.pathname.endsWith('.json'));

  const devices = await Promise.all(
    jsonFiles.map(async (file) => {
      const res = await fetch(file.url);
      const data = await res.json();
      return { ...data, _blobPath: file.pathname };
    })
  );

  return devices;
}

export async function deleteDevice(blobPath) {
  await del(blobPath, { token: import.meta.env.VITE_BLOB_READ_WRITE_TOKEN });
}
