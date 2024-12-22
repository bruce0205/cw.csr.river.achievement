const CMS_API_URL = import.meta.env.VITE_CMS_API_URL;

export const getAction = async (id) => {
  const url = `${CMS_API_URL}/api/action/${id}`;
  try {
    const response = await fetch(url);
    const data = await response.json();

    if (response.ok) {
      return data;
    }
    throw data;
  } catch (error) {
    throw error;
  }
};
