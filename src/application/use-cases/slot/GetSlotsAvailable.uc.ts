import { Inject, Injectable } from '@nestjs/common';
import Bluebird from 'bluebird';
import { AppointmentRepositoryInterface } from '../../../domain/repositories/AppointmentRepositoryInterface';
import { HolidayRepositoryInterface } from '../../../domain/repositories/HolidayRepositoryInterface';
import { GetAvailableSlotsDTO } from '../../dtos/slots/GetAvailableSlots.dto';
import { AppointmentService } from '../../services/AppointmentService';

@Injectable()
export class GetAvailableSlotUseCase {
  constructor(
    private readonly appointmentService: AppointmentService,
    @Inject("AppointmentRepositoryInterface") private readonly AppointmentRepository: AppointmentRepositoryInterface,
    @Inject("HolidayRepositoryInterface") private readonly HolidayRepository: HolidayRepositoryInterface,
  ) { }

  public async execute(dto: GetAvailableSlotsDTO): Promise<any[]> {
    const [holiday, appointments] = await Bluebird.all([
      this.HolidayRepository.detail(dto.date),
      this.AppointmentRepository.list(dto.date),
    ])
    if (holiday) {
      return [];
    }

    return this.appointmentService.getSlots(appointments, dto.date);
  }
}