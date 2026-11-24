import { createServer } from 'node:http'
import { pathToFileURL } from 'node:url'

export function createMetricsFixture({ token } = {}) {
  const state = {
    status: 200,
    volumes: [
      { id: 'media', label: 'Media disk', freeBytes: 2 ** 31, availableBytes: 3 * 2 ** 30 },
      { id: 'archive', label: 'Archive disk', freeBytes: 4 * 2 ** 30, availableBytes: 5 * 2 ** 30 },
    ],
  }
  const server = createServer((request, response) => {
    if (request.method !== 'GET' || request.url !== '/metrics') return response.writeHead(404).end()
    if (token && request.headers.authorization !== 'Bearer ' + token) return response.writeHead(401).end()
    if (state.status !== 200) return response.writeHead(state.status, { Location: '/redirected' }).end()
    response.writeHead(200, { 'content-type': 'application/json' }).end(JSON.stringify({ volumes: state.volumes }))
  })
  return { server, state }
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const host = process.env.HAKU_METRICS_HOST ?? '127.0.0.1'
  const port = Number(process.env.HAKU_METRICS_PORT ?? 8780)
  const { server } = createMetricsFixture({ token: process.env.HAKU_METRICS_TOKEN })
  server.listen(port, host, () => console.log('Metrics fixture listening on port ' + server.address().port))
}
