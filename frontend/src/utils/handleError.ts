import axios from "axios";
import { ErrorRes } from "@/types/errors";

export const handleError = (error: unknown) => {
    if (axios.isAxiosError(error)) {
        if (error.response) {
            return alert((error.response.data as ErrorRes).detail);
        }
        return alert("An error occurred, please try again later.");
    }
    return {
        status: 500,
        title: "Internal Server Error",
        detail: "An error occurred, please try again later.",
    };
};