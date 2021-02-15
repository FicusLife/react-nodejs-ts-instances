import { YearTimetableEntity } from './yearTimetable.entity';
import { createConnection, getRepository } from 'typeorm';

import { ConfDB } from '../app.module';

let startYear = 2019;
let endYear = 2020;

function generateYearTimetable(i, isActiveYear) {
  const yearTimetable = new YearTimetableEntity();
  if (!isActiveYear) {
    yearTimetable.isActive = i === 1;
  } else {
    yearTimetable.isActive = false;
  }
  yearTimetable.yearStart = startYear;
  yearTimetable.yearEnd = endYear;
  yearTimetable.saturdaysOn = false;
  yearTimetable.betweenClasses = [5, 10, 10, 15, 10, 20];

  yearTimetable.firstTable = [1, 7, 10, 16, 20, 25, 26, 30];
  yearTimetable.secondTable = [1, 7, 10, 16, 20, 25, 26, 30];
  yearTimetable.thirdTable = [1, 7, 10, 16, 20, 25, 26, 30];
  yearTimetable.fourthTable = [1, 7, 9, 16, 20, 25, 26, 33];
  yearTimetable.fifthTable = [1, 7, 9, 16, 20, 25, 26, 33];
  yearTimetable.sixthTable = [1, 7, 9, 16, 20, 25, 26, 33];
  yearTimetable.seventhTable = [1, 7, 9, 16, 20, 25, 26, 33];
  yearTimetable.eighthTable = [1, 7, 9, 16, 20, 25, 26, 33];
  yearTimetable.ninthTable = [1, 7, 9, 16, 20, 25, 26, 33];
  yearTimetable.tenthTable = [1, 7, 9, 16, 20, 25, 26, 33];
  yearTimetable.eleventhTable = [1, 7, 9, 16, 20, 25, 26, 33];
  yearTimetable.twelfthTable = [1, 7, 9, 16, 20, 25, 26, 33];

  return yearTimetable;
}

module.exports = options => ({
  priority: 90,
  call: async () => {
    console.log('!Start seeding year timetables');
    const connection = await createConnection(ConfDB);
    const yearTimetableRepository = getRepository(YearTimetableEntity);

    if (options.drop.includes('all')) {
      await yearTimetableRepository.query(
        'DELETE FROM "yearTimetable" CASCADE',
      );
      console.log('---- Drop year timetables');
    }
    const years = await yearTimetableRepository.find({});
    const isActiveYear = years.find((y: any) => y.isActive);
    years.sort((p: any, n: any) => p.yearStart - n.yearStart);
    if (years.length !== 0) {
      startYear = years[0].yearStart - 1;
      endYear = years[0].yearEnd - 1;
    }
    for (let i = 1; i <= options.years; i++, endYear--, startYear--) {
      const yearTimetable = generateYearTimetable(i, isActiveYear);
      await yearTimetableRepository.save(yearTimetable);
      console.log(
        '---- Add new ' + startYear + '-' + endYear + ' year timetable',
      );
    }
    if (options.years === 0) {
      console.log('---- Ignore adding year timetables');
    }
    console.log('___________________');
    return await connection.close();
  },
});
