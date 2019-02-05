class MerkleTree {

    constructor(leaves, concatHashes) {
        // 2 parameters
        //- An array of leaf nodes for the Merkle Tree.
        //-A concat function which can be used to concatenate two hashes together to form a new hash.
        this.leaves = leaves;
        this.concatHashes = concatHashes;
    }

    getRoot() {
        let leaves = this.leaves;
        while (leaves.length > 1) {
            leaves = this.getNextLevel(leaves);
        }
        return leaves[0];
    }

    getNextLevel(leaves) {
        let newLevel = [];
        // Add even length items
        let evenLength = (leaves.length % 2 == 0) ? leaves.length : leaves.length - 1;

        for (let i = 0; i < evenLength; i += 2) {
            newLevel.push(this.concatHashes(leaves[i], leaves[i + 1]));
        }

        return newLevel;
    }

}


module.exports = MerkleTree;

