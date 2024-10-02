import { IsInt, IsPositive, IsString, Matches } from 'class-validator';

export class BookAvailableSlotsDTO {
  @IsString()
  @Matches(/^\d{4}-\d{2}-\d{2}$/, {
    message: 'date must be in yyyy-mm-dd format',
  })
  date: string;

  @IsString()
  @Matches(/^\d{2}:\d{2}$/, {
    message: 'time must be in HH:mm format',
  })
  time: string;

  @IsInt()
  @IsPositive()
  slot: number;
}
