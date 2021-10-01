import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { User } from "../../infra/typeorm/entities/User";
import { IUsersRepository } from "../IUsersRepository";

class UsersRepositoryInMemory implements IUsersRepository {
    users: User[] = [];

    async create({ driver_license, email, name, password}: ICreateUserDTO): Promise<void> {
        const users = new User();

        Object.assign(users, {
            driver_license,
            email,
            name,
            password
        });

        this.users.push(users);
    }

    async findByEmail(email: string): Promise<User> {
        return this.users.find(user => user.email === email);
    }

    async findById(id: string): Promise<User> {
        return this.users.find(user => user.id === id);
    }

}

export { UsersRepositoryInMemory };