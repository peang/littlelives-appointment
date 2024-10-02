
import { Module } from '@nestjs/common';
import { AppointmentService } from '../../application/services/AppointmentService';
import { BookSlotsUseCase } from '../../application/use-cases/slot/BookSlots.uc';
import { CancelSlotsUseCase } from '../../application/use-cases/slot/CancelSlots.uc';
import { GetAvailableSlotUseCase } from '../../application/use-cases/slot/GetSlotsAvailable.uc';
import { InfraModule } from '../../infra/infra.module';
import { AppointmentRepository } from '../../infra/repositories/AppointmentRepository';
import { HolidayRepository } from '../../infra/repositories/HolidayRepository';
import { SlotController } from '../controllers/v1/SlotController';

const providers = [
  AppointmentService,

  GetAvailableSlotUseCase,
  BookSlotsUseCase,
  CancelSlotsUseCase,
  {
    provide: 'AppointmentRepositoryInterface',
    useClass: AppointmentRepository,
  },
  {
    provide: 'HolidayRepositoryInterface',
    useClass: HolidayRepository,
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