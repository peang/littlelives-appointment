import { Injectable } from '@nestjs/common';
import { HolidayEntity } from '../../domain/entities/HolidayEntity';
import { HolidayRepositoryInterface } from '../../domain/repositories/HolidayRepositoryInterface';
import { HolidayModel } from '../models/HolidayModel';

@Injectable()
export class HolidayRepository implements HolidayRepositoryInterface {
  async detail(date: string): Promise<HolidayEntity | null> {
    const where = {
      date,
    };

    const holiday = await HolidayModel.findOne({
      attributes: ['date', 'remarks'],
      where,
    });

    if (!holiday) {
      return null;
    }

    return HolidayModel.toEntity(holiday);
  }
}
