import {Person} from '@/models/persons/persons-model';
import {faker} from '@faker-js/faker';

const newPerson = (): Person => {
  return {
    userId: faker.string.uuid(),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    age: faker.number.int(40),
    visits: faker.number.int(1000),
    progress: faker.number.int(100),
  }
};

export const PERSONS: Person[] = faker.helpers.multiple(newPerson, {
  count: 1000,
});
