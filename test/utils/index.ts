export const delay = (t: number): Promise<undefined> =>
  new Promise((suc) => {
    setTimeout(suc, t)
  })
