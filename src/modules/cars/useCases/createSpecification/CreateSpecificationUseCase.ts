import { AppError } from "@shared/errors/AppError";
import { ISpecificationsRepository } from "@modules/cars/repositories/ISpecificationsRepository";
import { inject, injectable } from "tsyringe";

interface IRequest {
    name: string;
    description: string;
}

@injectable()
class CreateSpecificationUseCase {

    constructor(
        @inject("SpecificationsRepository")
        private specificationRepository: ISpecificationsRepository
    ) {}

    async execute({ name, description }: IRequest): Promise<void> {
        const specificationAlreayExists = await this.specificationRepository.findByName(name);

        if(specificationAlreayExists) {
            throw new AppError("Specification already exists!");
        }

        await this.specificationRepository.create({
            name,
            description
        });
    }
}

export { CreateSpecificationUseCase };
