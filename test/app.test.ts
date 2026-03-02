import { Server } from "../src/presentation/server";

jest.mock("../src/presentation/server");

describe("app.ts", () => {
    test("Should call Server with arguments and start", async () => {
        await import("../src/app");

        expect(Server).toHaveBeenCalledTimes(1);
    });
});
