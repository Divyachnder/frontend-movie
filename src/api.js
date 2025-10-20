const API_URL = "http://localhost:5000/api/auth";

export const registerUser = async (userData) => {
  try {
    const res = await fetch(`${API_URL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });

    if (!res.ok) {
      throw new Error(`Server responded with ${res.status}`);
    }

    return await res.json();
  } catch (err) {
    console.error("❌ Register fetch error:", err);
    throw err;
  }
};

export const loginUser = async (userData) => {
  try {
    const res = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });

    if (!res.ok) {
      throw new Error(`Server responded with ${res.status}`);
    }

    return await res.json();
  } catch (err) {
    console.error("❌ Login fetch error:", err);
    throw err;
  }
};
