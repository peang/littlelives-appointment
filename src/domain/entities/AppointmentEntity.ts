export class AppointmentEntity {
  private id: number;
  private date: string;
  private time: string;
  private slot: number;
  private duration: number;
  private createdAt: Date;
  private updatedAt: Date;

  private constructor(
    id: number,
    date: string,
    time: string,
    slot: number,
    duration: number,
    createdAt: Date,
    updatedAt: Date,
  ) {
    this.id = id;
    this.date = date;
    this.time = time;
    this.slot = slot;
    this.duration = duration;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  static create(date: string, time: string, slot: number): AppointmentEntity {
    return new AppointmentEntity(
      null,
      date,
      time,
      slot,
      slot * Number(process.env.SLOT_DURATION),
      null,
      null,
    );
  }

  static load(
    id: number,
    date: string,
    time: string,
    slot: number,
    duration: number,
    createdAt?: Date,
    updatedAt?: Date,
  ): AppointmentEntity {
    return new AppointmentEntity(
      id,
      date,
      time,
      slot,
      duration,
      createdAt,
      updatedAt,
    );
  }

  getId(): number {
    return this.id;
  }

  setId(id: number): void {
    this.id = id;
  }

  getDate(): string {
    return this.date;
  }

  isDateEqual(date: string): boolean {
    return this.date === date;
  }

  getTime(): string {
    return this.time;
  }

  isTimeEqual(time: string): boolean {
    return this.time === time;
  }

  getSlot(): number {
    return this.slot;
  }

  getDuration(): number {
    return this.duration;
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }

  getUpdatedAt(): Date {
    return this.updatedAt;
  }
}
