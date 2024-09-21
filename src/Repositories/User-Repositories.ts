import { pool } from "../connection";

type UserProps = {
	id: string
	name: string
	email: string
	password: string
}

type UpdateProps = {
	id: string
	name: string
	email: string
	password: string
}
export default class UserRepository {
    async find(){
        const query = "select * from users";
        const {rows} = await pool.query(query);
        return rows;
    }
    async findByid(id:string){
        const query = "select * from users where id = $1";
        const {rows} = await pool.query(query, [id]);
        return rows[0]
    }
    async findByEmail(email:string){
        const query = "select * from users where email = $1";
        const valor = [email]
        const {rows} = await pool.query(query,valor);
        return rows[0]
    }
    async create(props: UserProps){
        const query = "insert into users (id,name,email,password) values($1,$2,$3,$4)"
        const {rows} = await pool.query(query,[props.id,props.name,props.email, props.password])
        return rows[0]
    }
    async update(props: UpdateProps){
        const query = "update users set name = $1, email = $2, password = $3 where id = $4";
        const {rows} = await pool.query(query,[props.name,props.email,props.password,props.id]);
        return rows[0];
    }
    async delete(id:string){
        const query = "delete from users where id = $1";
        const {rows} =await pool.query(query,[id]);
        return rows[0];
    }
}