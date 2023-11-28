import Role from "./models/Role.js";

export const createRoles = async () => {
    try {
        const count = await Role.estimatedDocumentCount(); //estima el numero de documentos de una colecion de mongo

        if (count > 0) {
            return;
        } else {
            const values = await Promise.all([
                new Role({ name: "admin" }).save(),
                new Role({ name: "user" }).save(),
            ]);
            console.log(values);
        }
    } catch (error) {
        console.error(error);
    }
};