import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { BookAvailableSlotsDTO } from "../../../application/dtos/slots/BookAvailableSlots.dto";
import { GetAvailableSlotsDTO } from "../../../application/dtos/slots/GetAvailableSlots.dto";
import { IApiResponse } from "../../../application/types/app";
import { BookAvailableSlotsUseCase } from "../../../application/use-cases/slot/BookAvailableSlots.uc";
import { GetAvailableSlotUseCase } from "../../../application/use-cases/slot/GetSlotsAvailable.uc";

@Controller({
  version: '1',
  path: '/slots'
})
export class SlotController {
  constructor(
    private readonly getAvailableSlotUseCase: GetAvailableSlotUseCase,
    private readonly bookAvailableSlotsUseCase: BookAvailableSlotsUseCase,
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
  public async bookSlots(@Body() body: BookAvailableSlotsDTO): Promise<IApiResponse> {
    // Im usually using Hapi/Joi for validation hence its more object friendly

    return {
      message: "Appointment Booked",
      data: await this.bookAvailableSlotsUseCase.execute(body),
    }
  }

  @Post('/cancel')
  public async cancelSlots(@Body() body: BookAvailableSlotsDTO): Promise<IApiResponse> {
    return {
      message: "Appointment Cancelled",
      data: await this.bookAvailableSlotsUseCase.execute(body),
    }
  }
}