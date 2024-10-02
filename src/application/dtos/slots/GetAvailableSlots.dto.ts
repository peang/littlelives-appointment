import { IsString, Matches } from "class-validator";

export class GetAvailableSlotsDTO {
  @IsString()
  @Matches(/^\d{4}-\d{2}-\d{2}$/, {
    message: 'date must be in yyyy-mm-dd format',
  })
  date: string;
}
