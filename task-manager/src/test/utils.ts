import { DataSource } from "typeorm";


export type MockType<T> = {
    [P in keyof T]?: jest.Mock<{}>;
};

export const dataSourceMockFactory: () => MockType<DataSource> = 
    jest.fn(() => ({
        createEntityManager: jest.fn().mockResolvedValue({}),
    }));