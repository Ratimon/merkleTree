class MerkleTree {

    constructor(leaves, concatHashes) {
        // 2 parameters:
        //(string[],Fn)
        //- An array of leaf nodes for the Merkle Tree.
        //-A concat function which can be used to concatenate two hashes together to form a new hash.

        this.leaves = leaves;
        this.concatHashes = concatHashes;
    }

    getRoot() {
        // (number)=>string
        // 1 parameters:
        //- an index which we want to proof
        // return:
        let leaves = this.leaves;
        while (leaves.length > 1) {
            leaves = this.getNextLevel(leaves);
        }
        return leaves[0];
    }

    getProof(index) {
        // 1 parameters:
        // (number)=>Object[]
        //- an index which we want to proof
        // return:
        //ex[
        //      { data: 'D', left: false },
        //      { data: 'AB', left: true },
        //      { data: 'E', left: false }
        // ]
        let leaves = this.leaves;
        let hashList = [];
        let newIndex = index;

        while (leaves.length > 1) {
            if ((newIndex == leaves.length - 1) && (this.isOdd(leaves.length))) {
                // if it is not final level and its length is odd , wait for next level
            } else {
                if (this.isEven(newIndex)) {
                    // if the leaf is on the left side
                    hashList.push({
                        data: leaves[newIndex + 1],
                        left: false,
                    });
                    // store another corresponding node which needs to be concatenated with the leafe and lebel it with right(left: false)
                } else {
                    hashList.push({
                        data: leaves[newIndex - 1],
                        left: true,
                    });
                }
            }
            newIndex = Math.floor(newIndex / 2);

            leaves = this.getNextLevel(leaves)
        }

        return hashList;
    }

    isEven(n) {
        // 1 parameters:
        // (number)=>boolean
        //- check if it is even
        return (n % 2) == 0;
    }

    isOdd(n) {
        // 1 parameters:
        // (number)=>boolean
        //- check if it is odd
        return !this.isEven(n);
    }

    getNextLevel(leaves) {
        let newLevel = [];
        // Add even length items
        let evenLength = (leaves.length % 2 == 0) ? leaves.length : leaves.length - 1;

        for (let i = 0; i < evenLength; i += 2) {
            newLevel.push(this.concatHashes(leaves[i], leaves[i + 1]));
        }

        // If the original length is not even, add the last item
        if (evenLength !== leaves.length) {
            newLevel.push(leaves[leaves.length - 1]);
        }

        return newLevel;
    }

}


module.exports = MerkleTree;
