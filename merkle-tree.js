class MerkleTree {
    constructor(leaves, concatHashes){
        this.leaves = leaves;
        this.concatHashes = concatHashes;
    }
  
    getRoot(){
        return this.concatHashes(this.leaves[0], this.leaves[1]);
    }
  
  }
  
  module.exports = MerkleTree;