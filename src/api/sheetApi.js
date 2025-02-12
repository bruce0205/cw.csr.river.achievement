import newTaipeiDistricts from "@/consts/new_taipei_districts.json";
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
  const range = "gallery!B3:D10";
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${range}?key=${API_KEY}`;
  try {
    const response = await fetch(url);
    const data = await response.json();

    if (response.ok) {
      return data.values.map((item) => {
        return {
          imageUrl: item[0],
          description: item[1],
          clickUrl: item[2],
        };
      });
    }
    throw data;
  } catch (error) {
    throw error;
  }
};

export const fetchGalleryMessage = async () => {
  const range = "gallery-message!B3:C11";
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${range}?key=${API_KEY}`;
  try {
    const response = await fetch(url);
    const data = await response.json();

    if (response.ok) {
      return data.values.map((item) => {
        return {
          position: item[0],
          message: item[1],
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
  const range = "education!B3:F17";
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${range}?key=${API_KEY}`;
  try {
    const response = await fetch(url);
    const data = await response.json();

    if (response.ok) {
      return data.values.map((item) => {
        return {
          name: item[0],
          iconUrl: item[1],
          title: item[2],
          description: item[3],
          clickUrl: item[4],
        };
      });
    }
    throw data;
  } catch (error) {
    throw error;
  }
};

export const fetchAchievement = async () => {
  const range = "achievement!B3:D22";
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${range}?key=${API_KEY}`;
  try {
    const response = await fetch(url);
    const data = await response.json();

    if (response.ok) {
      return data.values.map((item) => {
        return {
          year: item[0],
          title: item[1],
          description: item[2],
        };
      });
    }
    throw data;
  } catch (error) {
    throw error;
  }
};

export const fetchSection = async () => {
  const range = "section!A3:D8";
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
  const range = "map-project!B3:G8";
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
  const range = "map-district!B3:D52";
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${range}?key=${API_KEY}`;
  try {
    const response = await fetch(url);
    const data = await response.json();

    if (response.ok) {
      return data.values.map((item) => {
        const districtInfo = newTaipeiDistricts.find(
          (newTaipeiDistrict) => newTaipeiDistrict.name === item[1]
        );
        return {
          projectNo: item[0],
          districtNo: districtInfo?.zip,
          districtName: item[1],
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
        const districtInfo = newTaipeiDistricts.find(
          (newTaipeiDistrict) => newTaipeiDistrict.name === item[1]
        );

        return {
          projectNo: item[0],
          districtNo: districtInfo?.zip,
          districtName: item[1],
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
