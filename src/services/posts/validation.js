import {checkSchema, validationResult} from "express-validator";

const schema = {
    name: {
        in: ["body"],
        isString: {errorMessage = "Name validation failed"}
    },
    surname: {
        in: ["body"],
        isString: {errorMessage = "Surname validation failed"}
    },
    email: {
        in: ["body"],
        isString: {errorMessage = "Title validation failed"}
    },
    dateOfBirth: {
        in: ["body"],
        isString: {errorMessage = "dateOfBirth validation failed"}
    },
    avatar: {
        in: ["body"],
        isString: {errorMessage = "Avatar validation failed"}
    }
}