import {
  BeforeCreate,
  BeforeUpdate,
  Column,
  Model,
  Table,
} from 'sequelize-typescript';
import { HolidayEntity } from '../../domain/entities/HolidayEntity';

@Table({
  tableName: 'holidays',
  timestamps: false,
  underscored: true,
})
export class HolidayModel extends Model {
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @Column({ allowNull: false })
  date: string;

  @Column({ allowNull: false })
  remarks: string;

  @Column
  created_at: Date;

  @Column
  updated_at: Date;

  @BeforeCreate
  static bfrCreate(model: HolidayModel): void {
    model.created_at = new Date();
  }

  @BeforeUpdate
  static bfrUpdate(model: HolidayModel): void {
    model.updated_at = new Date();
  }

  public static toModel(entity: HolidayEntity) {
    return {
      date: entity.getDate(),
      remarks: entity.getRemarks(),
      created_at: entity.getCreatedAt(),
      updated_at: entity.getUpdatedAt(),
    };
  }

  public static toEntity(model: HolidayModel): HolidayEntity {
    return HolidayEntity.load(
      model.id,
      model.date,
      model.remarks,
      model.created_at,
      model.updated_at,
    );
  }
}
