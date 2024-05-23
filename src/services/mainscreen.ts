import request from '../utils/request';

export async function fetchGetMiners(): Promise<
  Services.MainScreen.Res.MinerItem[]
> {
  return request.get(`/miners`);
}

export async function fetchGetMinerByPlanet(
  pid: string
): Promise<Services.MainScreen.Res.MinerItem[]> {
  return request.get(`/miners?planetId=${pid}`);
}

export async function fetchGetMinerHistory(
  mid: string
): Promise<Services.MainScreen.Res.MinerHistoryItem[]> {
  return request.get(`/history?minerId=${mid}`);
}

export async function fetchCreateMiner(
  data: Services.MainScreen.Req.CreateMinerParams
): Promise<any> {
  return request.post(`/miners`, data);
}
