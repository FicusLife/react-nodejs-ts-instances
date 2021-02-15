import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { YearTimetableActiveDTO, YearTimetableDTO, YearTimetableRO } from './yearTimetable.dto';
import { YearTimetableService } from './yearTimetable.service';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../_shared/auth.guard';
import { ROLES } from '../_shared/const.enum';

@Resolver(() => YearTimetableRO)
export class YearTimetableResolver {
  // <editor-fold desc="common + constructor">
  constructor(private yearTimetableService: YearTimetableService) {}

  // </editor-fold>

  // <editor-fold desc="yearTimetables [School] graphql">
  @Query(() => [YearTimetableRO])
  @UseGuards(new AuthGuard([ROLES.SCHOOL]))
  async yearTimetables(): Promise<YearTimetableRO[]> {
    return await this.yearTimetableService.showAll();
  }

  // </editor-fold>

  // <editor-fold desc="yearTimetables [School] graphql">
  @Query(() => [YearTimetableRO])
  @UseGuards(new AuthGuard([ROLES.SCHOOL]))
  async showGradesHistory(): Promise<YearTimetableRO[]> {
    return await this.yearTimetableService.showGradesHistory();
  }

  // </editor-fold>

  // <editor-fold desc="activeYearTimetable [All] graphql">
  @Query(() => YearTimetableRO)
  @UseGuards(new AuthGuard())
  async activeYearTimetable(): Promise<YearTimetableRO> {
    return await this.yearTimetableService.showActive();
  }

  // </editor-fold>

  // <editor-fold desc="createYearTimetable() [School] graphql">
  @Mutation(() => YearTimetableRO)
  @UseGuards(new AuthGuard([ROLES.SCHOOL]))
  async createYearTimetable(
    @Args('data') data: YearTimetableDTO,
  ): Promise<YearTimetableRO> {
    return await this.yearTimetableService.createYearTimetable(data);
  }

  // </editor-fold>

  // <editor-fold desc="setActiveById [School] graphql">
  @Mutation(() => [YearTimetableRO])
  @UseGuards(new AuthGuard([ROLES.SCHOOL]))
  async setActiveById(
    @Args('data') data: YearTimetableActiveDTO,
  ): Promise<YearTimetableRO[]> {
    return await this.yearTimetableService.setActiveById(data.id);
  }

  // </editor-fold>
}
