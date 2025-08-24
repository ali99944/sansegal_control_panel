/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosError } from "axios";

interface ErrorResponse {
    error?: {
      message?: string;
      code?: string;
      details?: any[];
    };
    message?: string;
}

/**
 * Helper function to extract error message from API response
 * @param error - The error object from API response
 * @param defaultMessage - Optional default message if error message not found
 * @returns The error details including message, code and status
 */
export const getApiError = (error: AxiosError, defaultMessage = "An unexpected error occurred") => {
  if (!error) {
    return {
      message: defaultMessage,
      code: "INTERNAL_SERVER_ERROR",
      status: 500
    };
  }

  // Handle non-Axios errors
  if (!error.isAxiosError) {
    return {
      message: error.message || defaultMessage,
      code: "INTERNAL_SERVER_ERROR",
      status: 500
    };
  }

  // Handle different types of Axios errors
  if (error.response) {
    // Server responded with error status
    const data = error.response.data;
    
    if (typeof data === 'string') {
      return {
        message: data,
        code: "INTERNAL_SERVER_ERROR",
        status: error.response.status
      };
    }
    

    if (typeof data === 'object') {
      const errorData = data as ErrorResponse;
      return {
        message: errorData?.error?.message || errorData?.message || defaultMessage,
        code: errorData?.error?.code || "INTERNAL_SERVER_ERROR",
        status: error.response.status,
        details: errorData?.error?.details || []
      };
    }
  } else if (error.request) {
    // Request was made but no response received
    return {
      message: "No response received from server",
      code: "INTERNAL_SERVER_ERROR",
      status: 500
    };
  }

  // Something else went wrong
  return {
    message: error.message || defaultMessage,
    code: "INTERNAL_SERVER_ERROR",
    status: 500
  };
};
