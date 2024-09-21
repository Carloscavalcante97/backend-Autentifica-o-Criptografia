import User from "./User.Models";

describe('user Models', () => {
    test("deve criar um novo usuário", () => {
        
        const props = {
            name: "carlos",
            email: "carlos@gmail.com",
            password: "123456"
        }
        const user = new User(props)
        expect(user.id).toBeDefined();
        expect(user.name).toBe(props.name);
        expect(user.email).toBe(props.email);
        expect(user.password).toBe(props.password);
})
    test("Não deve criar um usuário com email inválido", () => {
        const props = {
            name: "carlos",
            email: "carlosgmail.com",
            password: "123456"
        }
        expect(() => {
            new User(props)}).toThrow(new Error("Email inválido"));
    })
    test("Não deve criar um usuário com password inválido", () => {
        const props = {
            name: "carlos",
            email: "carlos@gmail.com",
            password: "1234"
        }
        expect(() => {
            new User(props)}).toThrow(new Error("password inválida"));
    })
})