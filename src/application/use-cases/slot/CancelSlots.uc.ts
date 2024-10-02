import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { AppointmentRepositoryInterface } from '../../../domain/repositories/AppointmentRepositoryInterface';
import { CancelSlotsDTO } from '../../dtos/slots/CancelSlots.dto';

@Injectable()
export class CancelSlotsUseCase {
  constructor(
    @Inject('AppointmentRepositoryInterface')
    private readonly AppointmentRepository: AppointmentRepositoryInterface,
  ) { }

  public async execute(dto: CancelSlotsDTO): Promise<any> {
    const appointment = await this.AppointmentRepository.detail(
      dto.date,
      dto.time,
    );

    if (!appointment) {
      throw new NotFoundException('Appointments not found');
    }

    await this.AppointmentRepository.delete(appointment);
  }
}
