export interface CommontableProps {
  type: 'miners' | 'planets' | 'asteroids' | 'minerModal';
  minerModalData?: any[];
  minerModalLoading?: boolean;
}
export interface MinerModalProps {
  open: boolean;
  onModalChange: (v: boolean) => void;
  minerItem?: Services.MainScreen.Res.MinerItem;
}

export interface ContextData {
  dataStore: Services.MainScreen.Res.TickData;
  loading: boolean;
}
