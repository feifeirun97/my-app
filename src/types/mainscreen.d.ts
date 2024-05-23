declare namespace Services.MainScreen {
  declare namespace Req {
    interface CreateMinerParams {
      name: string;
      planet: string;
      carryCapacity: number;
      travelSpeed: number;
      miningSpeed: number;
    }
  }
  declare namespace Res {
    interface MinerItem {
      _id: string;
      name: string;
      planet: string;
      x: number;
      y: number;
      angle: number;
      carryCapacity: number;
      planet: PlanetItem;
      travelSpeed: number;
      miningSpeed: number;
      status: 0 | 1 | 2 | 3;
      minerals: number;
      __v: number;
      target: string;
      targetType: string;
    }

    interface PlanetItem {
      position: Position;
      _id: string;
      name: string;
      minerals: number;
      miners: number;
      __v: number;
    }

    interface AsteroidItem {
      position: Position;
      _id: string;
      name: string;
      minerals: number;
      status: number;
      currentMiner: string | null;
      __v: number;
    }
    interface TickData {
      miners?: MinerItem[];
      planets?: PlanetItem[];
      asteroids?: AsteroidItem[];
      currentTick?: number;
    }

    export interface Capacity {
      current: number;
      max: number;
    }

    export interface Speed {
      travel: number;
      mining: number;
    }

    export interface Position {
      x: number;
      y: number;
    }

    export interface MinerHistoryItem {
      capacity: Capacity;
      speed: Speed;
      position: Position;
      _id: string;
      year: number;
      planet: string;
      status: number;
      miner: string;
      createdAt: string;
      updatedAt: string;
      __v: number;
    }
  }
}
