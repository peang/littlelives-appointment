import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { BookSlotsDTO } from "../../../application/dtos/slots/BookSlots.dto";
import { CancelSlotsDTO } from "../../../application/dtos/slots/CancelSlots.dto";
import { GetAvailableSlotsDTO } from "../../../application/dtos/slots/GetAvailableSlots.dto";
import { IApiResponse } from "../../../application/types/app";
import { BookSlotsUseCase } from "../../../application/use-cases/slot/BookSlots.uc";
import { CancelSlotsUseCase } from "../../../application/use-cases/slot/CancelSlots.uc";
import { GetAvailableSlotUseCase } from "../../../application/use-cases/slot/GetSlotsAvailable.uc";

@Controller({
  version: '1',
  path: '/slots'
})
export class SlotController {
  constructor(
    private readonly getAvailableSlotUseCase: GetAvailableSlotUseCase,
    private readonly bookAvailableSlotsUseCase: BookSlotsUseCase,
    private readonly cancelSlotsUseCase: CancelSlotsUseCase,
  ) { }

  @Get('/')
  public async getSlots(@Query() query: GetAvailableSlotsDTO): Promise<IApiResponse> {
    // Im usually using Hapi/Joi for validation hence its more object friendly
    const availableSlots = await this.getAvailableSlotUseCase.execute(query);

    return {
      message: "Available Slots",
      data: availableSlots,
    }
  }

  @Post('/book')
  public async bookSlots(@Body() body: BookSlotsDTO): Promise<IApiResponse> {
    // Im usually using Hapi/Joi for validation hence its more object friendly

    return {
      message: "Appointment Booked",
      data: await this.bookAvailableSlotsUseCase.execute(body),
    }
  }

  @Post('/cancel')
  public async cancelSlots(@Body() body: CancelSlotsDTO): Promise<IApiResponse> {
    return {
      message: "Appointment Cancelled",
      data: await this.cancelSlotsUseCase.execute(body),
    }
  }
}