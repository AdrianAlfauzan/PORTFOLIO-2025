// constants/testapp-data.ts

export const testAppAndroidData = {
  packageName: "com.ptsp.mobile",
  versionCode: 1,
  minSDK: 24,
  targetSDK: 36,
  permissions: {
    total: 40,
    categories: {
      camera: 1,
      microphone: 1,
      location: 1,
      storage: 7,
      notifications: 2,
      network: 2,
      systemSettings: 5,
      wifi: 1,
      audio: 1,
      displayOverApps: 1,
      appManagement: 1,
      other: 17,
    },
  },
};

// Perbaiki stats agar rapi
export const testAppStats = [
  {
    label: "Package Name",
    value: testAppAndroidData.packageName,
    isLongText: true,
  },
  {
    label: "Min SDK",
    value: `API ${testAppAndroidData.minSDK} (Android 7.0)`,
  },
  {
    label: "Target SDK",
    value: `API ${testAppAndroidData.targetSDK} (Android 13+)`,
  },
];

export const testAppTechStats = [
  { label: "Total Permissions", value: `${testAppAndroidData.permissions.total}` },
  { label: "Platform", value: "Android Only" },
];
