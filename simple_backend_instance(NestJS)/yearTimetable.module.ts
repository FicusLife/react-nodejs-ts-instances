import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { YearTimetableEntity } from './yearTimetable.entity';
import { YearTimetableService } from './yearTimetable.service';
import { YearTimetableResolver } from './yearTimetable.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([YearTimetableEntity])],
  providers: [YearTimetableService, YearTimetableResolver],
})
export class YearTimetableModule {}