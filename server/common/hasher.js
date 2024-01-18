import crypto from "crypto";

export default class Hasher {
    static MD5(string) {
        return crypto.createHash('md5').update(string).digest('hex');
    }
}
