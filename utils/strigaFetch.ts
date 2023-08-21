import crypto from 'crypto'

const STRIGA_BASE_URL = 'https://www.sandbox.striga.com/api/v1'

const generateHMAC = (
  body: string,
  method: string = 'GET',
  endpoint: string,
) => {
  const hmac = crypto.createHmac('sha256', process.env.STRIGA_API_SECRET!)
  const time = Date.now().toString()

  hmac.update(time)
  hmac.update(method)
  hmac.update(endpoint)

  const contentHash = crypto.createHash('md5')
  contentHash.update(body || JSON.stringify({}))

  hmac.update(contentHash.digest('hex'))

  const auth = `HMAC ${time}:${hmac.digest('hex')}`

  return auth
}

export const strigaFetch = (url: RequestInfo | URL, options: RequestInit) => {
  // Finally, create the Authorization header as the identifier HMAC <timestamp>:<HMAC Digest>
  const authorizationHeader = generateHMAC(
    options?.body as string,
    options?.method,
    url as string,
  )

  const headers = new Headers()

  headers.append('Content-Type', 'application/json')
  headers.append('Authorization', authorizationHeader)
  headers.append('api-key', process.env.STRIGA_API_KEY!)

  options.headers = headers

  return fetch(`${STRIGA_BASE_URL}${url}`, options).then((res) => res.json())
}
