import { Inject, Injectable } from '@nestjs/common';
import { AppointmentEntity } from '../../../domain/entities/AppointmentEntity';
import { AppointmentRepositoryInterface } from '../../../domain/repositories/AppointmentRepositoryInterface';
import { BookSlotsDTO } from '../../dtos/slots/BookSlots.dto';
import { AppointmentService } from '../../services/AppointmentService';

@Injectable()
export class BookSlotsUseCase {
  constructor(
    private readonly appointmentService: AppointmentService,
    @Inject('AppointmentRepositoryInterface')
    private readonly AppointmentRepository: AppointmentRepositoryInterface,
  ) { }

  public async execute(dto: BookSlotsDTO): Promise<any> {
    const appointments = await this.AppointmentRepository.list(dto.date);

    const slot = await this.appointmentService.getSlot(
      appointments,
      dto.date,
      dto.time,
      dto.slot,
    );

    if (slot) {
      const appointmentEntity = AppointmentEntity.create(
        dto.date,
        dto.time,
        dto.slot,
      );
      await this.AppointmentRepository.create(appointmentEntity);
    }

    return slot;
  }
}
