import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import {
  MOVE_TO_PAYOUT_STAGE_JOB,
  EXECUTE_TRADE_STAGE_JOB,
  SELL_QUEUE,
  EXECUTE_PAYOUT_STAGE_JOB,
  EXECUTE_PAYOUT_CHECK_STAGE_JOB,
} from './sell.constants';
import { SellFacade } from './sell.facade';
import {
  MoveToPayoutStageJob,
  ExecuteTradeStageJob,
  ExecutePayoutStageJob,
  ExecutePayoutCheckStageJob,
} from './sell.interfaces';

@Processor(SELL_QUEUE)
export class SellConsumer {
  constructor(private sellFacade: SellFacade) {}

  @Process(EXECUTE_TRADE_STAGE_JOB)
  public async executeTradeStage(job: Job<ExecuteTradeStageJob>) {
    const { sellId } = job.data;

    await this.sellFacade.executeTradeStage(sellId);
  }

  @Process(MOVE_TO_PAYOUT_STAGE_JOB)
  public async moveToPayoutStage(job: Job<MoveToPayoutStageJob>) {
    const { sellId } = job.data;

    await this.sellFacade.moveToPayoutStage(sellId);
  }

  @Process(EXECUTE_PAYOUT_STAGE_JOB)
  public async executePayoutStageJob(job: Job<ExecutePayoutStageJob>) {
    const { sellId } = job.data;

    await this.sellFacade.executePayoutStage(sellId);
  }

  @Process(EXECUTE_PAYOUT_CHECK_STAGE_JOB)
  public async executePayoutCheckStageJob(job: Job<ExecutePayoutCheckStageJob>) {
    const { sellId } = job.data;

    await this.sellFacade.executePayoutCheckStage(sellId);
  }
}
