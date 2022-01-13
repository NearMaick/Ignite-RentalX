import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";

interface IRequest {
  category_id?: string;
  brand?: string;
  name?: string;
}

export class ListCarsUseCase {
  constructor(private carsRepository: ICarsRepository) {}

  async execute({ name, brand, category_id }: IRequest): Promise<Car[]> {
    const cars = await this.carsRepository.findAvailable(
      name,
      brand,
      category_id
    );
    return cars;
  }
}

let listCarsUseCase: ListCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("List Cars", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listCarsUseCase = new ListCarsUseCase(carsRepositoryInMemory);
  });

  it("should be able list all available cars", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car1",
      description: "Car description",
      daily_rate: 110.0,
      license_plate: "DEF-4567",
      fine_amount: 40,
      brand: "Car_Brand",
      category_id: "category_id",
    });

    const cars = await listCarsUseCase.execute({});

    expect(cars).toEqual([car]);
  });

  it("should be able list all available cars by name", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car2",
      description: "Car description",
      daily_rate: 110.0,
      license_plate: "DEF-4567",
      fine_amount: 40,
      brand: "Car_Brand_test",
      category_id: "category_id",
    });

    const cars = await listCarsUseCase.execute({
      brand: "Car_brand",
    });

    expect(cars).toEqual([car]);
  });
});
