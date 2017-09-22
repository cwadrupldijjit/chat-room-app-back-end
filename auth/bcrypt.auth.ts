import * as bcrypt from 'bcrypt';

function hash(password: string, salt = bcrypt.genSaltSync(1)) {
    console.log(salt);
    return bcrypt.hashSync(password, salt);
}

function isValid(password, pHash) {
    return bcrypt.compareSync(password, pHash);
}

export {
    hash,
    isValid,
};