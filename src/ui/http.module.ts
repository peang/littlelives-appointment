
import { Module } from '@nestjs/common';
import { SlotModule } from './modules/SlotModule';

@Module({
  imports: [
    SlotModule,
  ],
  providers: [

  ],
})

export class HttpModule {
}