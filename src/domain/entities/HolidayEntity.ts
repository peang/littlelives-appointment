export class HolidayEntity {
  private id: number;
  private date: string;
  private remarks: string;
  private createdAt: Date;
  private updatedAt: Date;

  private constructor(
    id: number,
    date: string,
    remarks: string,
    createdAt: Date,
    updatedAt: Date,
  ) {
    this.id = id;
    this.date = date;
    this.remarks = remarks;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  static create(date: string, remarks: string): HolidayEntity {
    return new HolidayEntity(null, date, remarks, null, null);
  }

  static load(
    id: number,
    date: string,
    remarks: string,
    createdAt?: Date,
    updatedAt?: Date,
  ): HolidayEntity {
    return new HolidayEntity(id, date, remarks, createdAt, updatedAt);
  }

  getId(): number {
    return this.id;
  }

  getDate(): string {
    return this.date;
  }

  getRemarks(): string {
    return this.remarks;
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }

  getUpdatedAt(): Date {
    return this.updatedAt;
  }
}
