import axios, { AxiosResponse } from 'axios'
import { toast } from 'react-toastify'

const { REACT_APP_BASE_URL } = process.env

export const request = axios.create({
  baseURL: REACT_APP_BASE_URL,
  timeout: 30000
})

request.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    toast.error(error.response.data.errorMessage, {
      autoClose: 5000,
      theme: 'colored'
    })
    return error
  }
)

export const requestInvite = (data: InviteForm.InviteApiParams): Promise<ApiResponse<string>> => {
  return request
    .post('/prod/fake-auth', data)
    .then(({ status, data }: AxiosResponse<string>) => ({
      status: status,
      data: data
    }))
}
