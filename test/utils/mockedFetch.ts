import { delay } from "."

const mockedFetch = (payloadToReturn: any) => async (): Promise<any> => {
  await delay(123)
  return payloadToReturn
}

export default mockedFetch
