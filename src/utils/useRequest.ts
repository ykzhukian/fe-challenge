
import { useState } from 'react'

// T: params type
// P: response data type
const useRequest = <T, P>({
  request // async function
}: {
  request: (params: T) => Promise<ApiResponse<P>>
}) => {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<P>()

  const sendRequest = async (params: T) => {
    setLoading(true)
    try {
      const { data } = await request(params)
      setResult(data)
    } finally {
      setLoading(false)
    }
  }

  return {
    loading,
    result,
    sendRequest
  }
}

export default useRequest
