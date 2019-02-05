const crypto = require("crypto");

function concatHash(left, right) { 
    if (!left) throw new Error("The concat function expects two hash arguments, the first was not receieved.");
    if (!right) throw new Error("The concat function expects two hash arguments, the second was not receieved.");
    return sha256(Buffer.concat([left, right]));
}


// use the crypto module to create a sha256 hash from the data passed in
function sha256(data) {
    // 1 parameter:
    //(string or Buffer) => Buffer
    return crypto.createHash('sha256').update(data).digest();
    
}

