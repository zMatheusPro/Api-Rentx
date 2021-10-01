import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarRepositoryInMemory";
import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase"

let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("List Cars", () => {
    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        listAvailableCarsUseCase = new ListAvailableCarsUseCase(carsRepositoryInMemory);
    });

    it("should be able to list all available cars", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Car1",
            description: "Description Car",
            daily_rate: 100,
            license_plate: "ACC-1234",
            fine_amount: 60,
            brand: "Car_brand1",
            category_id: "category"
        });

        const cars = await listAvailableCarsUseCase.execute({});

        expect(cars).toEqual([car]);
    });

    it("should be able to list all available cars by brand", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Car2",
            description: "Description Car",
            daily_rate: 100,
            license_plate: "ACC-1234",
            fine_amount: 60,
            brand: "Car_brand2",
            category_id: "category"
        });

        const cars = await listAvailableCarsUseCase.execute({
            brand: "Car_brand2"
        });

        expect(cars).toEqual([car]);
    });

    it("should be able to list all available cars by name", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Car3",
            description: "Description Car",
            daily_rate: 100,
            license_plate: "CCC-1234",
            fine_amount: 60,
            brand: "Car_brand3",
            category_id: "category"
        });

        const cars = await listAvailableCarsUseCase.execute({
            name: "Car3"
        });

        expect(cars).toEqual([car]);
    });

    it("should be able to list all available cars by category", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Car3",
            description: "Description Car",
            daily_rate: 100,
            license_plate: "CCC-1234",
            fine_amount: 60,
            brand: "Car_brand3",
            category_id: "12345"
        });

        const cars = await listAvailableCarsUseCase.execute({
            category_id: "12345"
        });

        expect(cars).toEqual([car]);
    });
});