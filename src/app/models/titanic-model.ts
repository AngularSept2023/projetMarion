export class Passenger {
  PassengerId = '';
  Survived = '';
  Pclass = '';
  Name = '';
  Sex = '';
  Age = '';
  SibSp = '';
  Parch = '';
  Ticket = '';
  Fare = '';
  Cabin = '';
  Embarked = '';

  constructor(params?: Partial<Passenger>) {
    Object?.assign(this, params);
  }
}

export interface Statistiques {
  Sex: Sex;
  SexAge: SexAge;
  SexAgePclass: SexAgePclass;
  No: No;
}

export interface Sex {
  Survived: number;
  Died: number;
}

export interface SexAge {
  Survived: number;
  Died: number;
}

export interface SexAgePclass {
  Survived: number;
  Died: number;
}

export interface No {
  Survived: number;
  Died: number;
}
