import axios from "axios";

interface IAxiosCreate {
    baseURL: string;
    withCredentials: boolean;
    crossdomain: boolean;
    headers: {
        "Content-Type"?: string;
        Accept: string;
    };
}

export const apiClient = axios.create({
    baseURL: "https://jsonmock.hackerrank.com/",
    withCredentials: false,
    crossdomain: true,
    headers: {
        "Content-Type": "application/json",
        Accept: "*",
    },
} as IAxiosCreate);
