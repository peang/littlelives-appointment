import {
  BeforeCreate,
  BeforeUpdate,
  Column,
  Model,
  Table,
} from 'sequelize-typescript';
import { AppointmentEntity } from '../../domain/entities/AppointmentEntity';

@Table({
  tableName: 'appointments',
  timestamps: false,
  underscored: true,
})
export class AppointmentModel extends Model {
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @Column({ allowNull: false })
  date: string;

  @Column({ allowNull: false })
  time: string;

  @Column({ allowNull: false })
  slot: number;

  @Column({ allowNull: false })
  duration: number;

  @Column
  created_at: Date;

  @Column
  updated_at: Date;

  @BeforeCreate
  static bfrCreate(model: AppointmentModel): void {
    model.created_at = new Date();
  }

  @BeforeUpdate
  static bfrUpdate(model: AppointmentModel): void {
    model.updated_at = new Date();
  }

  public static toModel(entity: AppointmentEntity) {
    return {
      date: entity.getDate(),
      time: entity.getTime(),
      slot: entity.getSlot(),
      duration: entity.getDuration(),
      created_at: entity.getCreatedAt(),
      updated_at: entity.getUpdatedAt(),
    };
  }

  public static toEntity(model: AppointmentModel): AppointmentEntity {
    return AppointmentEntity.load(
      model.id,
      model.date,
      model.time,
      model.slot,
      model.duration,
      model.created_at,
      model.updated_at,
    );
  }
}
