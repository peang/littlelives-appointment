import { Inject, Injectable } from '@nestjs/common';
import { AppointmentRepositoryInterface } from '../../../domain/repositories/AppointmentRepositoryInterface';
import { GetAvailableSlotsDTO } from '../../dtos/slots/GetAvailableSlots.dto';
import { AppointmentService } from '../../services/AppointmentService';

@Injectable()
export class GetAvailableSlotUseCase {
  constructor(
    private readonly appointmentService: AppointmentService,
    @Inject("AppointmentRepositoryInterface") private readonly AppointmentRepository: AppointmentRepositoryInterface,
  ) { }

  public async execute(dto: GetAvailableSlotsDTO): Promise<any> {
    const appointments = await this.AppointmentRepository.list(dto.date);

    return this.appointmentService.getSlots(appointments, dto.date);
  }
}