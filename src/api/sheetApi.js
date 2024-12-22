const API_KEY = import.meta.env.VITE_GOOGLE_SHEETS_API_KEY;
const SHEET_ID = import.meta.env.VITE_SHEET_ID;

export const getSheetData = async (range) => {
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${range}?key=${API_KEY}`;
  try {
    const response = await fetch(url);
    const data = await response.json();

    if (response.ok) {
      return data.values;
    }
    throw data;
  } catch (error) {
    throw error;
  }
};

export const fetchGallery = async () => {
  const range = "gallery!A3:C10";
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${range}?key=${API_KEY}`;
  try {
    const response = await fetch(url);
    const data = await response.json();

    if (response.ok) {
      return data.values.map((item) => {
        return {
          no: item[0],
          imageUrl: item[1],
          description: item[2],
        };
      });
    }
    throw data;
  } catch (error) {
    throw error;
  }
};

export const fetchIntroduction = async () => {
  const range = "introduction!A3:D5";
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${range}?key=${API_KEY}`;
  try {
    const response = await fetch(url);
    const data = await response.json();

    if (response.ok) {
      return data.values.map((item) => {
        return {
          no: item[0],
          title: item[1],
          iconUrl: item[2],
          description: item[3],
        };
      });
    }
    throw data;
  } catch (error) {
    throw error;
  }
};

export const fetchEducation = async () => {
  const range = "education!A3:E12";
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${range}?key=${API_KEY}`;
  try {
    const response = await fetch(url);
    const data = await response.json();

    if (response.ok) {
      return data.values.map((item) => {
        return {
          no: item[0],
          name: item[1],
          iconUrl: item[2],
          title: item[3],
          description: item[4],
        };
      });
    }
    throw data;
  } catch (error) {
    throw error;
  }
};

export const fetchAchievement = async () => {
  const range = "achievement!A3:D12";
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${range}?key=${API_KEY}`;
  try {
    const response = await fetch(url);
    const data = await response.json();

    if (response.ok) {
      return data.values.map((item) => {
        return {
          no: item[0],
          year: item[1],
          title: item[2],
          description: item[3],
        };
      });
    }
    throw data;
  } catch (error) {
    throw error;
  }
};

export const fetchHeading = async () => {
  const range = "heading!A3:D6";
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${range}?key=${API_KEY}`;
  try {
    const response = await fetch(url);
    const data = await response.json();

    if (response.ok) {
      return data.values.map((item) => {
        return {
          no: item[0],
          section: item[1],
          title: item[2],
          subtitle: item[3],
        };
      });
    }
    throw data;
  } catch (error) {
    throw error;
  }
};

export const fetchMapProject = async () => {
  const range = "map-project!A3:F10";
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${range}?key=${API_KEY}`;
  try {
    const response = await fetch(url);
    const data = await response.json();

    if (response.ok) {
      return data.values.map((item) => {
        return {
          projectNo: item[0],
          projectName: item[1],
          iconUrl: item[2],
          description: item[3],
          mapUrl: item[4],
          actions: item[5],
        };
      });
    }
    throw data;
  } catch (error) {
    throw error;
  }
};

export const fetchMapDistrict = async () => {
  const range = "map-district!A3:C52";
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${range}?key=${API_KEY}`;
  try {
    const response = await fetch(url);
    const data = await response.json();

    if (response.ok) {
      return data.values.map((item) => {
        return {
          projectNo: item[0],
          districtNo: item[1],
          description: item[2],
        };
      });
    }
    throw data;
  } catch (error) {
    throw error;
  }
};

export const fetchLandmark = async () => {
  const range = "map-landmark!B3:E102";
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${range}?key=${API_KEY}`;
  try {
    const response = await fetch(url);
    const data = await response.json();

    if (response.ok) {
      return data.values.map((item) => {
        return {
          projectNo: item[0],
          districtNo: item[1],
          landmarkName: item[2],
          landmarkUrl: item[3],
        };
      });
    }
    throw data;
  } catch (error) {
    throw error;
  }
};
