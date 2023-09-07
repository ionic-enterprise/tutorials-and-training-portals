import axios from "axios";

export type Session = {
  access_token: string;
  sub: string;
  name: string;
  refresh_token: string;
  exp: number;
};

const url = "https://88tkyz16e2.execute-api.us-east-2.amazonaws.com/v1";
const headers = { "x-api-key": "kRJoNgYv0z4jK8YyhhzJU94HEJCWPUeG1UzTRkAF" };

export const httpClient = axios.create({ baseURL: url, headers });

export const refreshSession = async (
  accessToken: string,
  refreshToken: string
): Promise<Session> => {
  const url = "/auth/refresh";
  const { data } = await httpClient.post(url, { accessToken, refreshToken });
  return data;
};
