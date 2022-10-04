import axios from "axios";

const API_URL = "/api";

const register = async (userData) => {
    const res = await axios.post(`${API_URL}/register`, userData);

    if (res.data) {
        localStorage.setItem("user", JSON.stringify(res.data));
    }

    return res.data;
};

const logout = async () => {
    await axios.post(API_URL + "/logout");
    localStorage.removeItem("user");
};

const login = async (userData) => {
    await axios.get(`/sanctum/csrf-cookie`);
    const res = await axios.post("/login", userData);

    if (res.data) {
        localStorage.setItem("user", JSON.stringify(res.data));
    }

    return res.data;
};

const forgotPass = async (email) => {
    const res = await axios.post("/forgot-password", email);

    return res.data;
};

const resetPass = async (data) => {
    const res = await axios.post(API_URL + "/reset-password", data);

    return res.data;
};

const changePass = async (data) => {
    const res = await axios.put(API_URL + "/change-password", data);

    return res.data;
};

const authService = {
    register,
    logout,
    login,
    forgotPass,
    resetPass,
    changePass,
};

export default authService;
