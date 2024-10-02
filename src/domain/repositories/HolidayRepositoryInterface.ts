import { HolidayEntity } from '../entities/HolidayEntity';

export interface HolidayRepositoryInterface {
  detail(date: string): Promise<HolidayEntity | null>;
}
