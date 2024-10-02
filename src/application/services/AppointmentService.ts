import { BadRequestException, Injectable } from '@nestjs/common';
import * as Bluebird from 'bluebird';
import moment from 'moment';
import { AppointmentEntity } from '../../domain/entities/AppointmentEntity';

@Injectable()
export class AppointmentService {
  async getSlots(
    appointmentEntities: AppointmentEntity[],
    date: string,
  ): Promise<{ date: string; time: string; available_slots: number }[]> {
    const baseSlots = await this.generateBaseSlots(date);

    // Populate Appointments
    await Bluebird.map(baseSlots, async (slot) => {
      const getAppointments = await this.findAppointments(
        appointmentEntities,
        slot.date,
        slot.time,
      );

      if (getAppointments.length > 0) {
        // We need to calculate for total booked slots
        // Incase there are multiple appointments
        const totalBookedSlots = getAppointments.reduce(
          (total, appointment) => total + appointment.getSlot(),
          0,
        );

        slot.available_slots -= totalBookedSlots;
      }
    });

    // Populate Active Hours
    return baseSlots;
  }

  async getSlot(
    appointmentEntities: AppointmentEntity[],
    date: string,
    time: string,
    slot: number,
  ): Promise<{ date: string; time: string; available_slots: number }> {
    const baseSlots = await this.generateBaseSlots(date);

    const foundSlot = await this.findSpecificSlot(baseSlots, date, time);
    if (!foundSlot) {
      throw new BadRequestException('Slot not available');
    }

    const getAppointments = await this.findAppointments(
      appointmentEntities,
      foundSlot.date,
      foundSlot.time,
    );

    if (getAppointments.length > 0) {
      // We need to calculate for total booked slots
      // Incase there are multiple appointments
      const totalBookedSlots = getAppointments.reduce(
        (total, appointment) => total + appointment.getSlot(),
        0,
      );

      foundSlot.available_slots -= totalBookedSlots;
    }

    if (foundSlot.available_slots < slot) {
      throw new BadRequestException('Slot not available');
    }

    // store to cache, manual invalidation when
    // 1. New Appointment Made
    // 2. Configuration Changed
    // 3. New Holiday Added
    return foundSlot;
  }

  private async generateBaseSlots(date: string): Promise<
    {
      date: string;
      time: string;
      available_slots: number;
    }[]
  > {
    const activeDays = process.env.SLOT_ACTIVE_DAYS.split(',').map((day) =>
      day.trim(),
    );

    const startDateTime = moment(
      `${date} ${process.env.SLOT_ACTIVE_START_TIME}`,
      'YYYY-MM-DD HH:mm',
    );
    const endDateTime = moment(
      `${date} ${process.env.SLOT_ACTIVE_END_TIME}`,
      'YYYY-MM-DD HH:mm',
    );

    const availableSlots = [];
    const currentSlot = startDateTime.clone();

    while (currentSlot.isBefore(endDateTime)) {
      const requestDay = moment(date).format('dddd');

      const payload = {
        date: currentSlot.format('YYYY-MM-DD'),
        time: currentSlot.format('HH:mm'),
        available_slots: 0,
      };

      // Populate Active Days
      if (activeDays.includes(requestDay.toLowerCase())) {
        payload.available_slots = Number(process.env.SLOT_ALLOWED);
        availableSlots.push(payload);
      }

      currentSlot.add(process.env.SLOT_DURATION, 'minutes');
    }

    return availableSlots;
  }

  private async findSpecificSlot(
    baseSlots: { date: string; time: string; available_slots: number }[],
    date: string,
    time: string,
  ): Promise<{ date: string; time: string; available_slots: number }> {
    return baseSlots.find((slot) => slot.date === date && slot.time === time);
  }

  private async findAppointments(
    appointmentEntities: AppointmentEntity[],
    date: string,
    time: string,
  ): Promise<AppointmentEntity[]> {
    return appointmentEntities.filter(
      (appointment) =>
        appointment.isDateEqual(date) && appointment.isTimeEqual(time),
    );
  }
}
