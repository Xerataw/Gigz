import axios, { AxiosError, AxiosResponse, HttpStatusCode } from 'axios';
import IGigzResponse from '../types/IGigzResponse';
import User from '../types/User';

const envVars = import.meta.env;

export default class GigzFetcher {
  private static API_VERSION = envVars.VITE_GIGZ_API_V1;
  private static API_URL_NO_AUTH = envVars.VITE_GIGZ_API_URL_NO_AUTH;
  private static API_URL =
    envVars.VITE_ENV === 'DEV'
      ? envVars.VITE_GIGZ_API_URL_DEV
      : envVars.VITE_GIGZ_API_URL_PROD;
  private static API_IMAGES_URL = this.API_URL + envVars.VITE_URL_PICTURE;
  private static BASE_HEADERS = {};

  /**
   * Perform a GET request to the Gigz backend server
   * @param uri the uri of the route you want to access
   * @param params (optional) the GET parameters to add to the uri
   * @param headers (optional) the additional headers to add to the request
   * @param isAuth if set to True, will try to add the Authorization Bearer header with the stored token.
   * True by default.
   * @returns a IGigzResponse promise
   */
  public static async get<T>(
    uri: string,
    params: object = {},
    headers: object = {},
    isAuth = true
  ): Promise<IGigzResponse<T>> {
    // Build request
    const finalUri = this.buildURL(this.API_URL, uri, params, isAuth);
    const finalHeaders = await this.getFinalHeaders(headers, isAuth);

    try {
      // Make request
      const axiosResponse = await axios.get(finalUri, {
        headers: finalHeaders,
      });

      // Return custom response
      return this.formatResponse(axiosResponse, true);
    } catch (error) {
      // Handle custom error response
      return this.handleError<T>(error as AxiosError);
    }
  }

  /**
   * Build the complete image path to be able to display it
   * @param uri the image uri
   * @returns the complete image path
   */
  public static getImageUri(uri: string): string {
    return `${this.API_IMAGES_URL}${uri}`;
  }

  /**
   * Perform a POST request to the Gigz backend server
   * @param uri the uri of the route you want to access
   * @param params (optional) the parameters to add to the request body
   * @param headers (optional) the additional headers to add to the request
   * @returns a IGigzResponse promise
   */
  public static async post<T>(
    uri: string,
    params: object = {},
    headers: object = {},
    isAuth = true
  ): Promise<IGigzResponse<T>> {
    // Build request
    const finalUri = this.buildURL(this.API_URL, uri, {}, isAuth);
    const finalHeaders = await this.getFinalHeaders(headers, isAuth);

    try {
      // Make request
      const axiosResponse = await axios.post(
        finalUri,
        this.getCleanedBody(params),
        {
          headers: finalHeaders,
        }
      );

      // Return custom response
      return this.formatResponse(axiosResponse);
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
   * @returns a IGigzResponse promise
   */
  public static async patch<T>(
    uri: string,
    params: object = {},
    headers: object = {},
    isAuth = true
  ): Promise<IGigzResponse<T>> {
    // Build request
    const finalUri = this.buildURL(this.API_URL, uri, {}, isAuth);
    const finalHeaders = await this.getFinalHeaders(headers, isAuth);

    try {
      // Make request
      const axiosResponse = await axios.patch(
        finalUri,
        this.getCleanedBody(params),
        {
          headers: finalHeaders,
        }
      );

      // Return custom response
      return this.formatResponse(axiosResponse);
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
   * @returns a IGigzResponse promise
   */
  public static async put<T>(
    uri: string,
    params: object = {},
    headers: object = {},
    isAuth = true
  ): Promise<IGigzResponse<T>> {
    // Build request
    const finalUri = this.buildURL(this.API_URL, uri, {}, isAuth);
    const finalHeaders = await this.getFinalHeaders(headers, isAuth);

    try {
      // Make request
      const axiosResponse = await axios.put(
        finalUri,
        this.getCleanedBody(params),
        {
          headers: finalHeaders,
        }
      );

      // Return custom response
      return this.formatResponse(axiosResponse);
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
   * @returns a IGigzResponse promise
   */
  public static async delete<T>(
    uri: string,
    params: object = {},
    headers: object = {},
    isAuth = true
  ): Promise<IGigzResponse<T>> {
    // Build request
    const finalUri = this.buildURL(this.API_URL, uri, params, isAuth);
    const finalHeaders = await this.getFinalHeaders(headers, isAuth);

    try {
      // Make request
      const axiosResponse = await axios.delete(finalUri, {
        headers: finalHeaders,
      });

      // Return custom response
      return this.formatResponse(axiosResponse);
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
        if (value?.length > 0) {
          strParams[key] = value.toString();
        }
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
  private static async getFinalHeaders(
    headers: object,
    isAuth: boolean
  ): Promise<object> {
    let finalHeaders = { ...this.BASE_HEADERS, ...headers };
    if (isAuth) {
      const user = await User.getInstance();
      finalHeaders = { Authorization: `Bearer ${user.getToken()}`, ...headers };
    }
    return finalHeaders;
  }

  /**
   * Returns server response details if there is one, otherwise axios error message.
   * @param error the axios error after the request has failed
   * @returns IGigzResponse with the associated details
   */
  private static handleError<T>(error: AxiosError): Promise<IGigzResponse<T>> {
    const message = (error.response?.data as any).message;

    if (error.response)
      return Promise.resolve({
        message,
        ok: false,
        code: error.response.status,
      });
    return Promise.resolve({
      message: error.message,
      ok: false,
      code: HttpStatusCode.InternalServerError,
    });
  }

  private static isRequestSucces = (code: number): boolean => {
    return code >= 200 && code < 300;
  };

  /**
   * Offcial documentation https://developer.mozilla.org/en-US/docs/Web/API/Location
   *
   * This is a private static function that builds a URL by concatenating various parameters and
   * returns the final URL.
   * @param {string} origin - The base URL of the API endpoint.
   * @param {string} version - A string representing the version of the API being used.
   * @param {string} pathname - The pathname parameter is a string that represents the path of the URL.
   * It typically starts with a forward slash (/) and can include additional subdirectories or segments
   * separated by forward slashes. For example, "/users/profile" or "/products/123".
   * @param {string} search - The `search` parameter is a string that represents the query parameters
   * of a URL. For example, if the URL is `https://example.com/search?q=hello&limit=10`, then the
   * `search` parameter would be `?q=hello&limit=10`.
   * @param [isAuth=true] - A boolean value that determines whether the API request requires
   * authentication or not. If it is set to true, the API URL will include the version number in the
   * origin. If it is set to false, the API URL will use a different URL that does not require
   * authentication.
   * @returns a URL string built from the input parameters, including the origin, version, pathname,
   * search, and an optional isAuth parameter. The URL string is constructed by concatenating the
   * origin, pathname, and search parameters, and adding a version or API_URL_NO_AUTH string depending
   * on the value of the isAuth parameter.
   */
  private static buildURL(
    origin: string,
    pathname: string,
    search: object,
    isAuth = true,
    version: string = this.API_VERSION
  ) {
    isAuth ? (origin += version) : (origin += this.API_URL_NO_AUTH);
    return origin + pathname + this.buildURLParamsFromObject(search);
  }

  /**
   * The function `formatResponse` formats an Axios response into a standardized `IGigzResponse` object,
   * including the response status, message, code, and data.
   * @param axiosResponse - The `axiosResponse` parameter is the response object returned by an Axios
   * HTTP request. It contains information such as the response status, status text, and response data.
   * @param [noMessage=false] - The `noMessage` parameter is a boolean flag that indicates whether or
   * not to include a message in the response. If `noMessage` is set to `true`, the response object
   * will not include a `message` property. If `noMessage` is set to `false` (or not
   * @returns The function `formatResponse` returns an object of type `IGigzResponse<T>`.
   */
  private static formatResponse<T>(
    axiosResponse: AxiosResponse<any, any>,
    noMessage = false
  ): IGigzResponse<T> {
    if (noMessage) {
      return {
        ok: this.isRequestSucces(axiosResponse.status),
        code: axiosResponse.status,
        data: axiosResponse.data.data,
      };
    }

    return {
      ok: this.isRequestSucces(axiosResponse.status),
      message: axiosResponse.statusText,
      code: axiosResponse.status,
      data: axiosResponse.data.data,
    };
  }

  private static getCleanedBody(body: object | FormData): object {
    if (body instanceof FormData) return body;
    const cleanedBody: any = {};
    for (const [key, value] of Object.entries(body)) {
      if (typeof value === 'string' && value.length === 0) continue;
      cleanedBody[key] = value;
    }
    return cleanedBody;
  }
}
