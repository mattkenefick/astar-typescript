import { Heuristic } from '../types/astar.types';

export interface IAStarFinderConstructor {
	allowDiagonal?: boolean;
	allowHorizontal?: boolean;
	allowPathAsCloseAsPossible?: boolean;
	allowVertical?: boolean;
	grid: IGridConstructor;
	heuristic?: Heuristic;
	includeEndNode?: boolean;
	includeStartNode?: boolean;
	weight?: number;
}

export interface IGridConstructor {
	densityOfObstacles?: number;
	height?: number;
	matrix?: number[][];
	width?: number;
}

export interface INodeConstructor {
	id: number;
	position: IPoint;
	walkable?: boolean;
}

export interface IPoint {
	x: number;
	y: number;
}
