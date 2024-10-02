
import { Module } from '@nestjs/common';
import { AppointmentService } from '../../application/services/AppointmentService';
import { BookAvailableSlotsUseCase } from '../../application/use-cases/slot/BookAvailableSlots.uc';
import { GetAvailableSlotUseCase } from '../../application/use-cases/slot/GetSlotsAvailable.uc';
import { InfraModule } from '../../infra/infra.module';
import { AppointmentRepository } from '../../infra/repositories/AppointmentRepository';
import { SlotController } from '../controllers/v1/SlotController';

const providers = [
  AppointmentService,

  GetAvailableSlotUseCase,
  BookAvailableSlotsUseCase,
  {
    provide: 'AppointmentRepositoryInterface',
    useClass: AppointmentRepository,
  }

];
@Module({
  controllers: [
    SlotController,
  ],
  imports: [
    InfraModule
  ],
  providers: [
    ...providers,
  ],
  exports: providers
})
export class SlotModule { }