// Defines the class for Tree object
export default class Tree {
    constructor() {
      this.treeStages = ["seed", "sprout", "sapling", "young", "mature"];
      this.currentStage = 0;
      this.currentStageName = this.treeStages[this.currentStage];
      // Will be caculated based on stage and tree rarity
      this.threshXP = 100;
      this.currentXP = 0;
      // Will be replaced with test DNA
      this.treeDNA = "TEST_DNA";
    }
}