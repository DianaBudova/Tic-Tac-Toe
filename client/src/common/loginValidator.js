export default class LoginValidator {
    validate(value) {
        if (value.length > 0) {
            return ({message: undefined, isValid: true});
        }
        return ({message: "Login must be at least 1 character ⚠️", isValid: false});
    }
}