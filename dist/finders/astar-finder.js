"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AStarFinder = void 0;
const grid_1 = require("../core/grid");
const util_1 = require("../core/util");
const heuristic_1 = require("../core/heuristic");
const lodash_1 = require("lodash");
class AStarFinder {
    /**
     * @param IAstarFinderConstructor aParams
     */
    constructor(aParams) {
        // Create grid
        this.grid = new grid_1.Grid({
            densityOfObstacles: aParams.grid.densityOfObstacles || 0,
            height: aParams.grid.height,
            matrix: aParams.grid.matrix || undefined,
            width: aParams.grid.width
        });
        // Init lists
        this.closedList = [];
        this.openList = [];
        // Set direction booleans
        this.allowDiagonal = aParams.allowDiagonal !== undefined ? aParams.allowDiagonal : true;
        this.allowHorizontal = aParams.allowHorizontal !== undefined ? aParams.allowHorizontal : true;
        this.allowVertical = aParams.allowVertical !== undefined ? aParams.allowVertical : true;
        // Set if start node included
        this.includeStartNode = aParams.includeStartNode !== undefined ? aParams.includeStartNode : true;
        // Set if end node included
        this.includeEndNode = aParams.includeEndNode !== undefined ? aParams.includeEndNode : true;
        // Default path as close as possible not allowed
        this.allowPathAsCloseAsPossible = aParams.allowPathAsCloseAsPossible || false;
        // Set heuristic function
        this.heuristic = aParams.heuristic ? aParams.heuristic : 'Manhattan';
        // Set weight
        this.weight = aParams.weight || 1;
    }
    /**
     * @param IPoint startPosition
     * @param IPoint endPosition
     * @returns number[][]
     */
    findPath(startPosition, endPosition) {
        // Reset lists
        this.closedList = [];
        this.openList = [];
        // Reset grid
        this.grid.resetGrid();
        const startNode = this.grid.getNodeAt(startPosition);
        const endNode = this.grid.getNodeAt(endPosition);
        // Break if start and/or end position is/are not walkable
        if (!this.grid.isWalkableAt(endPosition) || !this.grid.isWalkableAt(startPosition)) {
            // Path could not be created because the start and/or end position is/are not walkable.
            return [];
        }
        // Push start node into open list
        startNode.setIsOnOpenList(true);
        this.openList.push(startNode);
        // Loop through the grid
        // Set the FGH values of non walkable nodes to zero and push them on the closed list
        // Set the H value for walkable nodes
        for (let y = 0; y < this.grid.height; y++) {
            for (let x = 0; x < this.grid.width; x++) {
                let node = this.grid.getNodeAt({ x, y });
                if (!this.grid.isWalkableAt({ x, y })) {
                    // OK, this node is not walkable
                    // Set FGH values to zero
                    node.setFGHValuesToZero();
                    // Put on closed list
                    node.setIsOnClosedList(true);
                    this.closedList.push(node);
                }
                else {
                    // OK, this node is walkable
                    // Calculate the H value with the corresponding heuristic function
                    node.setHValue((0, heuristic_1.calculateHeuristic)(this.heuristic, node.position, endNode.position, this.weight));
                }
            }
        }
        // As long the open list is not empty, continue searching a path
        while (this.openList.length !== 0) {
            // Get node with lowest f value
            const currentNode = (0, lodash_1.minBy)(this.openList, (o) => {
                return o.getFValue();
            });
            // Move current node from open list to closed list
            currentNode.setIsOnOpenList(false);
            (0, lodash_1.remove)(this.openList, currentNode);
            currentNode.setIsOnClosedList(true);
            this.closedList.push(currentNode);
            // End of path is reached
            if (currentNode === endNode) {
                return (0, util_1.backtrace)(endNode, this.includeStartNode, this.includeEndNode);
            }
            // Get neighbors
            const neighbors = this.grid.getSurroundingNodes(currentNode.position, this.allowHorizontal, this.allowVertical, this.allowDiagonal);
            // Loop through all the neighbors
            for (let i in neighbors) {
                const neightbor = neighbors[i];
                // Continue if node on closed list
                if (neightbor.getIsOnClosedList()) {
                    continue;
                }
                // Calculate the g value of the neightbor
                const nextGValue = currentNode.getGValue() +
                    (neightbor.position.x !== currentNode.position.x || neightbor.position.y == currentNode.position.y
                        ? this.weight
                        : this.weight * 1.41421);
                // Is the neighbor not on open list OR
                // can it be reached with lower g value from current position
                if (!neightbor.getIsOnOpenList() || nextGValue < neightbor.getGValue()) {
                    neightbor.setGValue(nextGValue);
                    neightbor.setParent(currentNode);
                    if (!neightbor.getIsOnOpenList()) {
                        neightbor.setIsOnOpenList(true);
                        this.openList.push(neightbor);
                    }
                    else {
                        // okay this is a better way, so change the parent
                        neightbor.setParent(currentNode);
                    }
                }
            }
        }
        // At this point the path to the end position could NOT be created
        // Return path as close as possible if enabled
        if (this.allowPathAsCloseAsPossible) {
            return (0, util_1.backtrace)(this.closedList[this.closedList.length - 1], this.includeStartNode, false);
        }
        // Return empty path, because could NOT be created
        return [];
    }
    /**
     * Set the heuristic to be used for pathfinding.
     * @param newHeuristic
     * @return void
     */
    setHeuristic(newHeuristic) {
        this.heuristic = newHeuristic;
    }
    /**
     * Set the weight for the heuristic function.
     * @param number newWeight
     * @return void
     */
    setWeight(newWeight) {
        this.weight = newWeight;
    }
    /**
     * Get a copy/clone of the grid.
     * @return Node[][]
     */
    getGridClone() {
        return this.grid.clone();
    }
    /**
     * Get the current grid
     * @return Grid
     */
    getGrid() {
        return this.grid;
    }
}
exports.AStarFinder = AStarFinder;
