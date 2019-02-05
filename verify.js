




function verifyProof(proof, node, root, concat) {
    // 4 parameters:
    //(Object[],string, Buffer, Fn) => Boolean
    //1 proof - The proof we created in the previous stage. It's an array of objects containing the data and whether or not the node is in the left position.
    //2 node - The node we're trying to prove is within the merkle tree. If, along with the proof data, it can be concatenated to form the merkle root then the proof is valid!
    //3 root - A buffer that is the resulting merkle root from the concatenation of all the leaf nodes in the merkle tree.
    //4 concat - The method used to concatenate the leaf nodes. The returned value is a buffer.
    let currentHash = node;

    for (let i = 0; i < proof.length; i++) {
        let p = proof[i];

        if (p.left) {
            currentHash = concat(p.data, currentHash);
        } else {
            currentHash = concat(currentHash, p.data);
        }
    }

    return currentHash.equals(root);
}





module.exports = verifyProof;