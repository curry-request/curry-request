export const delay = (t: number): Promise<undefined> =>
  new Promise((suc) => {
    setTimeout(suc, t)
  })

export const mockedFetch = (payload: unknown) => async (): Promise<
  typeof payload
> => {
  await delay(123)
  return payload
}

export const withJson = (p: unknown): { json: () => typeof p } => ({
  json: () => p,
})

export const echoReq = (payload: unknown) =>
  mockedFetch(withJson(payload)) as typeof fetch
