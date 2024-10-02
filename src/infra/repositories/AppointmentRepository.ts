import { Injectable } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { AppointmentEntity } from '../../domain/entities/AppointmentEntity';
import { AppointmentRepositoryInterface } from '../../domain/repositories/AppointmentRepositoryInterface';
import { AppointmentModel } from '../models/AppointmentModel';

@Injectable()
export class AppointmentRepository implements AppointmentRepositoryInterface {
  constructor(private readonly sequelize: Sequelize) { }
  async create(entity: AppointmentEntity): Promise<void> {
    const t = await this.sequelize.transaction();

    t.LOCK;
    try {
      const appointmentModel = await AppointmentModel.create(
        AppointmentModel.toModel(entity),
        {
          transaction: t,
        },
      );

      entity.setId(appointmentModel.id);
      t.commit();
    } catch (err) {
      t.rollback();
      throw err;
    }
  }

  async list(date: string): Promise<AppointmentEntity[]> {
    const where = {
      date,
    };

    const appointments = await AppointmentModel.findAll({
      attributes: ['date', 'time', 'duration', 'slot'],
      where,
    });

    return appointments.map((model) => AppointmentModel.toEntity(model));
  }
}
