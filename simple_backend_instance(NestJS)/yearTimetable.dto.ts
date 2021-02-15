import { Field, InputType, Int, ObjectType } from 'type-graphql';
import { IsEnum, Max, Min, Validate } from 'class-validator';
import { BETWEEN_CLASSES } from '../_shared/const.enum';
import {
  BetweenClassesValidate,
  TimetableValidate,
} from '../_shared/custom.decorators';
import { YearStudyplanRO } from '../yearStudyplan/yearStudyplan.dto';
import { SchoolGradeRO } from '../schoolGrade/schoolGrade.dto';

// <editor-fold desc="YearTimetableRO">
@ObjectType()
export class YearTimetableRO {
  @Field()
  id: string;

  @Field(() => Date)
  created: Date;

  @Field(() => Date)
  updated: Date;

  @Field(() => Int)
  yearStart: number;

  @Field(() => Int)
  yearEnd: number;

  @Field(() => Boolean)
  isActive: boolean;

  @Field(() => Boolean)
  saturdaysOn: boolean;

  @Field(() => [Int])
  betweenClasses: number[];

  @Field(() => [Int])
  firstTable: number[];

  @Field(() => [Int])
  secondTable: number[];

  @Field(() => [Int])
  thirdTable: number[];

  @Field(() => [Int])
  fourthTable: number[];

  @Field(() => [Int])
  fifthTable: number[];

  @Field(() => [Int])
  sixthTable: number[];

  @Field(() => [Int])
  seventhTable: number[];

  @Field(() => [Int])
  eighthTable: number[];

  @Field(() => [Int])
  ninthTable: number[];

  @Field(() => [Int])
  tenthTable: number[];

  @Field(() => [Int])
  eleventhTable: number[];

  @Field(() => [Int])
  twelfthTable: number[];

  @Field(() => [YearStudyplanRO])
  yearStudyplan: YearStudyplanRO[];

  @Field(() => [SchoolGradeRO])
  schoolGrade: SchoolGradeRO[];
}

// </editor-fold>

// <editor-fold desc="YearTimetableDTO">
@InputType()
export class YearTimetableDTO {
  @Field(() => Int)
  @Min(2010)
  @Max(2050)
  readonly yearStart: number;

  @Field(() => Boolean)
  readonly saturdaysOn: boolean;

  @Field(() => [Int])
  @IsEnum(BETWEEN_CLASSES, { each: true })
  @Validate(BetweenClassesValidate)
  readonly betweenClasses: number[];

  @Field(() => [Int])
  @Validate(TimetableValidate)
  readonly firstTable: number[];

  @Field(() => [Int])
  @Validate(TimetableValidate)
  readonly secondTable: number[];

  @Field(() => [Int])
  @Validate(TimetableValidate)
  readonly thirdTable: number[];

  @Field(() => [Int])
  @Validate(TimetableValidate)
  readonly fourthTable: number[];

  @Field(() => [Int])
  @Validate(TimetableValidate)
  readonly fifthTable: number[];

  @Field(() => [Int])
  @Validate(TimetableValidate)
  readonly sixthTable: number[];

  @Field(() => [Int])
  @Validate(TimetableValidate)
  readonly seventhTable: number[];

  @Field(() => [Int])
  @Validate(TimetableValidate)
  readonly eighthTable: number[];

  @Field(() => [Int])
  @Validate(TimetableValidate)
  readonly ninthTable: number[];

  @Field(() => [Int])
  @Validate(TimetableValidate)
  readonly tenthTable: number[];

  @Field(() => [Int])
  @Validate(TimetableValidate)
  readonly eleventhTable: number[];

  @Field(() => [Int])
  @Validate(TimetableValidate)
  readonly twelfthTable: number[];
}

// </editor-fold>

// <editor-fold desc="YearTimetableActiveDTO">
@InputType()
export class YearTimetableActiveDTO {
  @Field()
  id: string;
}

// </editor-fold>
