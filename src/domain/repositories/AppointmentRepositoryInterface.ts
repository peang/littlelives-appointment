import { AppointmentEntity } from '../entities/AppointmentEntity';

export interface AppointmentRepositoryInterface {
  list(date: string): Promise<AppointmentEntity[]>;

  create(entity: AppointmentEntity): Promise<void>;
}
