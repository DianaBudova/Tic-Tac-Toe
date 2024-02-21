export default class PasswordValidator {
    validate(value) {
        if (value.length > 0) {
            return ({message: undefined, isValid: true});
        }
        return ({message: "Password must be at least 1 character ⚠️", isValid: false});
    }
}