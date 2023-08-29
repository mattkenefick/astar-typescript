import { IGridConstructor, IPoint } from '../interfaces/astar.interfaces';
import { Node } from './node';
export declare class Grid {
    /**
     * @type number
     */
    readonly width: number;
    /**
     * @type number
     */
    readonly height: number;
    /**
     * @type number
     */
    readonly numberOfFields: number;
    /**
     * @type Node[][]
     */
    private gridNodes;
    /**
     * @param IGridConstructor aParams
     * @constructor
     */
    constructor(aParams: IGridConstructor);
    /**
     * Build grid, fill it with nodes and return it.
     * @param matrix [ 0 or 1: 0 = walkable; 1 = not walkable ]
     * @param width [grid width]
     * @param height [grid height]
     * @param densityOfObstacles [density of non walkable fields]
     */
    private buildGridWithNodes;
    /**
     * Return a specific node.
     * @param IPoint position
     * @return Node
     */
    getNodeAt(position: IPoint): Node;
    /**
     * Check if specific node walkable.
     * @param IPoint position
     * @return boolean
     */
    isWalkableAt(position: IPoint): boolean;
    /**
     * Check if specific node is on the grid.
     * @param IPoint position
     * @return boolean
     */
    private isOnTheGrid;
    /**
     * Get surrounding nodes.
     * @param IPoint currentPosition
     * @param boolean allowHorizontal
     * @param boolean allowVertical
     * @param boolean allowDiagonal
     * @returns Node[]
     */
    getSurroundingNodes(currentPosition: IPoint, allowHorizontal?: boolean, allowVertical?: boolean, allowDiagonal?: boolean): Node[];
    setGrid(newGrid: Node[][]): void;
    /**
     * Reset the grid
     */
    resetGrid(): void;
    /**
     * Get all the nodes of the grid.
     */
    getGridNodes(): Node[][];
    /**
     * Get a clone of the grid
     */
    clone(): Node[][];
}
