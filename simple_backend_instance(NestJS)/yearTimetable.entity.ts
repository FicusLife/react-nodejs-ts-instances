import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { YearStudyplanEntity } from '../yearStudyplan/yearStudyplan.entity';
import { SchoolGradeEntity } from '../schoolGrade/schoolGrade.entity';
import { WorkloadEntity } from '../workload/workload.entity';
import { ScheduleEntity } from '../schedule/schedule.entity';
import { TeacherWishlistEntity } from '../teacherWishlist/teacherWishlist.entity';

@Entity('yearTimetable')
export class YearTimetableEntity {
  // <editor-fold desc="Fields">
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;

  @Column('int')
  yearStart: number;

  @Column('int')
  yearEnd: number;

  @Column('boolean', {
    default: false,
  })
  isActive: boolean;

  @Column('boolean')
  saturdaysOn: boolean;

  @Column('simple-array')
  betweenClasses: number[];

  @Column('simple-array')
  firstTable: number[];

  @Column('simple-array')
  secondTable: number[];

  @Column('simple-array')
  thirdTable: number[];

  @Column('simple-array')
  fourthTable: number[];

  @Column('simple-array')
  fifthTable: number[];

  @Column('simple-array')
  sixthTable: number[];

  @Column('simple-array')
  seventhTable: number[];

  @Column('simple-array')
  eighthTable: number[];

  @Column('simple-array')
  ninthTable: number[];

  @Column('simple-array')
  tenthTable: number[];

  @Column('simple-array')
  eleventhTable: number[];

  @Column('simple-array')
  twelfthTable: number[];

  // </editor-fold>

  // <editor-fold desc="Relations fields">
  @OneToMany(
    () => YearStudyplanEntity,
    yearStudyplan => yearStudyplan.yearTimetable,
  )
  yearStudyplan: YearStudyplanEntity[];

  @OneToMany(
    () => TeacherWishlistEntity,
    teacherWishlist => teacherWishlist.yearTimetable,
  )
  teacherWishlist: TeacherWishlistEntity[];

  @OneToMany(
    () => SchoolGradeEntity,
    schoolGrade => schoolGrade.yearTimetable,
  )
  schoolGrade: SchoolGradeEntity[];

  @OneToMany(
    () => ScheduleEntity,
    schedule => schedule.yearTimetable,
  )
  schedule: ScheduleEntity[];

  @OneToMany(
    () => WorkloadEntity,
    workload => workload.yearTimetable,
  )
  workload: WorkloadEntity[];
  // </editor-fold>
}
