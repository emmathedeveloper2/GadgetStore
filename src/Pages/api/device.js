import { list, del } from '@vercel/blob';

const DEVICES_FOLDER = 'devices';

export async function getAllDevices() {
  const blobs = await list({ prefix: `${DEVICES_FOLDER}/` });
  const deviceData = await Promise.all(
    blobs.blobs.map(async (blob) => {
      const res = await fetch(blob.url);
      return await res.json();
    })
  );
  return deviceData;
}

export async function deleteDeviceById(deviceId) {
  await del(`${DEVICES_FOLDER}/${deviceId}.json`);
}
