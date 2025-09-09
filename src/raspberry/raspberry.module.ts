import { Module } from '@nestjs/common';
import { RaspberryController } from './raspberry.controller';
import { RaspberryService } from './raspberry.service';

@Module({
  controllers: [RaspberryController],
  providers: [RaspberryService]
})
export class RaspberryModule {}
