// Defines the class for Tree object
export default class Tree {
    constructor(currSize) {
        this.treeStages = ["Seedling", "Sprout", "Sapling", "Young", "Half-Life", "Adult", "Mature"];
        this.currentStage = 0;
        this.currentSize = currSize;
        this.currentStageName = this.treeStages[this.currentStage];
        // Will be calculated based on stage and tree rarity
        this.threshXP = 100;
        this.currentXP = 0;
        // Will be replaced with test DNA
        this.treeDNA = "TEST_DNA";
    }
}