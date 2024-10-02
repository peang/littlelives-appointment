import { AppointmentEntity } from '../entities/AppointmentEntity';

export interface AppointmentRepositoryInterface {
  list(date: string): Promise<AppointmentEntity[]>;

  detail(date: string, time: string): Promise<AppointmentEntity | null>;

  create(entity: AppointmentEntity): Promise<AppointmentEntity>;

  delete(entity: AppointmentEntity): Promise<void>;
}
