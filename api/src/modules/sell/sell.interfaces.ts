export interface ExecuteTradeStageJob {
  sellId: number;
}

export interface MoveToPayoutStageJob {
  sellId: number;
}

export interface ExecutePayoutStageJob {
  sellId: number;
}

export interface ExecutePayoutCheckStageJob {
  sellId: number;
}

export enum TradeOfferState {
  'Invalid' = 1,
  'Active' = 2,
  'Accepted' = 3,
  'Countered' = 4,
  'Expired' = 5,
  'Canceled' = 6,
  'Declined' = 7,
  'InvalidItems' = 8,
  'CreatedNeedsConfirmation' = 9,
  'CanceledBySecondFactor' = 10,
  'InEscrow' = 11,
}
