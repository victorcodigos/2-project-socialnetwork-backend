const request = require("supertest");
const app = require("../index.js");

describe("testing/users", () => {
    const user = {
      name: "Username",
      lastName: "Lastname",
      birthdate: "1990-05-22",
      DNI: "0000000A",
      email: "test@example.com",
      password: "123456",
      role: "user",
      confirmed: false,
    };

   
    test("Create a user", async () => {
      const res = await request(app)
        .post("/users")
        .send(user)
        .expect(201)
           const sendUser = {
            ...user,
            id: res.body.user.id,
              password: res.body.user.password,
            createdAt: res.body.user.createdAt,
            updatedAt: res.body.user.updatedAt,
          };
          const newUser = res.body.user;
          expect(newUser).toEqual(sendUser);
    });
  });
  