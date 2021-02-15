import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { YearTimetableEntity } from './yearTimetable.entity';
import { Repository } from 'typeorm';
import { YearTimetableDTO, YearTimetableRO } from './yearTimetable.dto';
import { getConnection, getRepository } from "typeorm";
import * as M from '../_shared/response.messages';
import { SchoolGradeEntity } from '../schoolGrade/schoolGrade.entity';
import { StudentEntity } from '../student/student.entity';

@Injectable()
export class YearTimetableService {
  // <editor-fold desc="Common + Constructor">
  constructor(
    @InjectRepository(YearTimetableEntity)
    private yearTimetableRepository: Repository<YearTimetableEntity>,
  ) {}

  // </editor-fold>

  // <editor-fold desc="showAll database">
  async showAll(): Promise<YearTimetableRO[]> {
    return await this.yearTimetableRepository.find({
      relations: ['yearStudyplan', 'yearStudyplan.schoolCourse', 'schoolGrade'],
    });
  }

  // </editor-fold>

  // <editor-fold desc="showAll database">
  async showGradesHistory(): Promise<YearTimetableRO[]> {
    return await this.yearTimetableRepository.find({
      relations: ['schoolGrade', 'schoolGrade.teacher'],
    });
  }

  // </editor-fold>

  // <editor-fold desc="showById database">
  async showById(id: string): Promise<YearTimetableRO> {
    return await this.yearTimetableRepository.findOne({
      where: { id },
      relations: ['yearStudyplan', 'yearStudyplan.schoolCourse', 'schoolGrade'],
    });
  }

  // </editor-fold>

  // <editor-fold desc="setActiveById database">
  async setActiveById(id: string): Promise<YearTimetableRO[]> {
    const yearTimetables = await this.yearTimetableRepository.find({});
    yearTimetables.forEach((e) => {
      e.isActive = e.id === id;
    });
    return await this.yearTimetableRepository.save(yearTimetables);
  }

  // </editor-fold>

  // <editor-fold desc="showActive database">
  async showActive(): Promise<YearTimetableRO> {
    const activeYear = await this.yearTimetableRepository.findOne({
      where: { isActive: true },
      relations: ['yearStudyplan', 'yearStudyplan.schoolCourse', 'schoolGrade'],
    });
    if (!activeYear) {
      throw new HttpException(
        M.activeYearIsNoteProvided,
        HttpStatus.EXPECTATION_FAILED,
      );
    }
    return activeYear;
  }

  // </editor-fold>

  // <editor-fold desc="createYearTimetable database">
  async createYearTimetable(data: YearTimetableDTO): Promise<YearTimetableRO> {
    const yearSameIsCreated = await this.yearTimetableRepository.findOne({
      where: { yearStart: data.yearStart },
    });
    if (yearSameIsCreated) {
      throw new HttpException(
        M.existYearWithThisGap(data.yearStart),
        HttpStatus.CONFLICT,
      );
    }
    const yearTimetable = await this.yearTimetableRepository.create({
      ...data,
      yearEnd: data.yearStart + 1,
      isActive: true,
    });

    const allTimetables = await this.yearTimetableRepository.find({
      relations: ['schoolGrade', 'schoolGrade.student']
    });
    allTimetables.sort((p: any, n: any) => n.yearEnd - p.yearEnd);
    const prevYear = allTimetables[0];
    allTimetables.forEach((e) => {
      e.isActive = false
    });
    const nextYear = await this.yearTimetableRepository.save(yearTimetable);

    if(allTimetables.length !== 0) {
      let graduationStudentIds = [];
      const grades = prevYear.schoolGrade.reduce((r: any, e: any) => {
       const elem = {
         gradeLvl: e.gradeLvl + 1,
         letter: e.letter,
         student: [ ...e.student.filter((s) => !s.droppedOutDate) ],
         yearTimetable: nextYear.id
       };
       if(elem.gradeLvl === 13) {
         graduationStudentIds = [ ...graduationStudentIds, ...elem.student.map((e) => e.id) ];
       }
       return elem.gradeLvl <= 12? [ ...r, elem ] : r
      }, []);

      await getRepository(SchoolGradeEntity).save(grades);
      await getConnection()
        .createQueryBuilder()
        .update(StudentEntity)
        .set({  graduationYear: data.yearStart  })
        .where("id IN (:...ids)", { ids: graduationStudentIds })
        .execute();

      await this.yearTimetableRepository.save(allTimetables);
    }
    return nextYear;
  }

  // </editor-fold>
}
