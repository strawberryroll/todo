import axios from "axios";

const tenantId = process.env.NEXT_PUBLIC_TENANT_ID;

const instance = axios.create({
    baseURL: `https://assignment-todolist-api.vercel.app/api/${tenantId}`,
});

export default instance;
