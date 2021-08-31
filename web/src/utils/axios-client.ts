import axios, { AxiosInstance } from 'axios'

const client: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_DOMAIN,
  timeout: 1000,
  withCredentials: true,
})

/*
const onResponse = <T = any>(
  response: AxiosResponse<T>
): AxiosResponse<T>['data'] => {
  // Any status code that lies within the range of 2xx cause this function to trigger
  // Do something with response data
  if (response.status >= 200 && response.status < 300) return response.data
}

// Add a response interceptor
client.interceptors.response.use(onResponse, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  return Promise.reject(error)
})
*/

export { client as axiosClient }
