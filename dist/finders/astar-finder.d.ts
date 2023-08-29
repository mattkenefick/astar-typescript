import { Grid } from '../core/grid';
import { Heuristic } from '../types/astar.types';
import { IAStarFinderConstructor, IPoint } from '../interfaces/astar.interfaces';
import { Node } from '../core/node';
export declare class AStarFinder {
    private grid;
    private closedList;
    private openList;
    private allowPathAsCloseAsPossible;
    private heuristic;
    private weight;
    readonly allowDiagonal: boolean;
    readonly allowHorizontal: boolean;
    readonly allowVertical: boolean;
    readonly includeEndNode: boolean;
    readonly includeStartNode: boolean;
    /**
     * @param IAstarFinderConstructor aParams
     */
    constructor(aParams: IAStarFinderConstructor);
    /**
     * @param IPoint startPosition
     * @param IPoint endPosition
     * @returns number[][]
     */
    findPath(startPosition: IPoint, endPosition: IPoint): number[][];
    /**
     * Set the heuristic to be used for pathfinding.
     * @param newHeuristic
     * @return void
     */
    setHeuristic(newHeuristic: Heuristic): void;
    /**
     * Set the weight for the heuristic function.
     * @param number newWeight
     * @return void
     */
    setWeight(newWeight: number): void;
    /**
     * Get a copy/clone of the grid.
     * @return Node[][]
     */
    getGridClone(): Node[][];
    /**
     * Get the current grid
     * @return Grid
     */
    getGrid(): Grid;
}
