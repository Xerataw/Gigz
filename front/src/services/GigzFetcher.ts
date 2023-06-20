import axios, { HttpStatusCode, AxiosError } from 'axios';

export type GigzResponse<T> = {
  code: HttpStatusCode;
  message: string;
  data?: T;
};

export default class GigzFetcher {
  private static API_URL = import.meta.env.VITE_GIGZ_API_URL;
  private static BASE_HEADERS = {};

  /**
   * Perform a GET request to the Gigz backend server
   * @param uri the uri of the route you want to access
   * @param params (optional) the GET parameters to add to the uri
   * @param headers (optional) the additional headers to add to the request
   * @param isAuth if set to True, will try to add the Authorization Bearer header with the stored token.
   * True by default.
   * @returns a GigzResponse promise
   */
  public static async get<T>(
    uri: string,
    params: object = {},
    headers: object = {},
    isAuth = true
  ): Promise<GigzResponse<T>> {
    // Build request
    const finalUri =
      GigzFetcher.API_URL + uri + this.buildURLParamsFromObject(params);
    const finalHeaders = this.getFinalHeaders(headers, isAuth);

    try {
      // Make request
      const axiosResponse = await axios.get(finalUri, {
        headers: finalHeaders,
      });
      return {
        message: axiosResponse.statusText,
        code: axiosResponse.status,
        data: axiosResponse.data,
      };
    } catch (error) {
      // Handle custom error response
      return this.handleError<T>(error as AxiosError);
    }
  }

  /**
   * Perform a POST request to the Gigz backend server
   * @param uri the uri of the route you want to access
   * @param params (optional) the parameters to add to the request body
   * @param headers (optional) the additional headers to add to the request
   * @returns a GigzResponse promise
   */
  public static async post<T>(
    uri: string,
    params: object = {},
    headers: object = {},
    isAuth = true
  ): Promise<GigzResponse<T>> {
    // Build request
    const finalUri = GigzFetcher.API_URL + uri;
    const finalHeaders = this.getFinalHeaders(headers, isAuth);

    try {
      // Make request
      const axiosResponse = await axios.post(finalUri, params, {
        headers: finalHeaders,
      });

      // Return custom response
      return {
        message: axiosResponse.statusText,
        code: axiosResponse.status,
        data: axiosResponse.data,
      };
    } catch (error) {
      // Handle custom error response
      return this.handleError<T>(error as AxiosError);
    }
  }

  /**
   * Perform a PATCH request to the Gigz backend server
   * @param uri the uri of the route you want to access
   * @param params (optional) the parameters to add to the request body
   * @param headers (optional) the additional headers to add to the request
   * @returns a GigzResponse promise
   */
  public static async patch<T>(
    uri: string,
    params: object = {},
    headers: object = {},
    isAuth = true
  ): Promise<GigzResponse<T>> {
    // Build request
    const finalUri = GigzFetcher.API_URL + uri;
    const finalHeaders = this.getFinalHeaders(headers, isAuth);

    try {
      // Make request
      const axiosResponse = await axios.patch(finalUri, params, {
        headers: finalHeaders,
      });

      // Return custom response
      return {
        message: axiosResponse.statusText,
        code: axiosResponse.status,
        data: axiosResponse.data,
      };
    } catch (error) {
      // Handle custom error response
      return this.handleError<T>(error as AxiosError);
    }
  }

  /**
   * Perform a PUT request to the Gigz backend server
   * @param uri the uri of the route you want to access
   * @param params (optional) the parameters to add to the request body
   * @param headers (optional) the additional headers to add to the request
   * @returns a GigzResponse promise
   */
  public static async put<T>(
    uri: string,
    params: object = {},
    headers: object = {},
    isAuth = true
  ): Promise<GigzResponse<T>> {
    // Build request
    const finalUri = GigzFetcher.API_URL + uri;
    const finalHeaders = this.getFinalHeaders(headers, isAuth);

    try {
      // Make request
      const axiosResponse = await axios.put(finalUri, params, {
        headers: finalHeaders,
      });

      // Return custom response
      return {
        message: axiosResponse.statusText,
        code: axiosResponse.status,
        data: axiosResponse.data,
      };
    } catch (error) {
      // Handle custom error response
      return this.handleError<T>(error as AxiosError);
    }
  }

  /**
   * Perform a DELETE request to the Gigz backend server
   * @param uri the uri of the route you want to access
   * @param params (optional) the parameters to add to the uri
   * @param headers (optional) the additional headers to add to the request
   * @returns a GigzResponse promise
   */
  public static async delete<T>(
    uri: string,
    params: object = {},
    headers: object = {},
    isAuth = true
  ): Promise<GigzResponse<T>> {
    // Build request
    const finalUri =
      GigzFetcher.API_URL + uri + this.buildURLParamsFromObject(params);
    const finalHeaders = this.getFinalHeaders(headers, isAuth);

    try {
      // Make request
      const axiosResponse = await axios.delete(finalUri, {
        headers: finalHeaders,
      });

      // Return custom response
      return {
        message: axiosResponse.statusText,
        code: axiosResponse.status,
        data: axiosResponse.data,
      };
    } catch (error) {
      // Handle custom error response
      return this.handleError<T>(error as AxiosError);
    }
  }

  /**
   * Build url params string.
   * @param params the parameters given as object
   * @returns the build params string (empty string if no params)
   */
  private static buildURLParamsFromObject(params: object): string {
    if (Object.keys(params).length > 0) {
      const strParams: Record<string, string> = {};
      for (const [key, value] of Object.entries(params)) {
        strParams[key] = value.toString();
      }
      return '?' + new URLSearchParams(strParams).toString();
    }
    return '';
  }

  /**
   * Build the headers object of the request depending on the args given.
   * @param headers If not empty, will add those headers to the object
   * @param isAuth if true, will add the Authorization header with the stored token
   * @returns the headers object
   */
  private static getFinalHeaders(headers: object, isAuth: boolean): object {
    let finalHeaders = { ...GigzFetcher.BASE_HEADERS, ...headers };
    if (isAuth)
      finalHeaders = { Authorization: `Bearer dummyToken`, ...headers };
    return finalHeaders;
  }

  /**
   * Returns server response details if there is one, otherwise axios error message.
   * @param error the axios error after the request has failed
   * @returns GigzResponse with the associated details
   */
  private static handleError<T>(error: AxiosError): Promise<GigzResponse<T>> {
    if (error.response)
      return Promise.reject({
        message: error.response.statusText,
        code: error.response.status,
      });
    return Promise.reject({
      message: error.message,
      code: HttpStatusCode.InternalServerError,
    });
  }
}
