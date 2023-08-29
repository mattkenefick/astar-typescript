/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "../dist/astar.js":
/*!************************!*\
  !*** ../dist/astar.js ***!
  \************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.Grid = exports.AStarFinder = void 0;\nvar astar_finder_1 = __webpack_require__(/*! ./finders/astar-finder */ \"../dist/finders/astar-finder.js\");\nObject.defineProperty(exports, \"AStarFinder\", ({ enumerable: true, get: function () { return astar_finder_1.AStarFinder; } }));\nvar grid_1 = __webpack_require__(/*! ./core/grid */ \"../dist/core/grid.js\");\nObject.defineProperty(exports, \"Grid\", ({ enumerable: true, get: function () { return grid_1.Grid; } }));\n\n\n//# sourceURL=webpack://astar-typescript-example/../dist/astar.js?");

/***/ }),

/***/ "../dist/core/grid.js":
/*!****************************!*\
  !*** ../dist/core/grid.js ***!
  \****************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.Grid = void 0;\nconst node_1 = __webpack_require__(/*! ./node */ \"../dist/core/node.js\");\nclass Grid {\n    /**\n     * @param IGridConstructor aParams\n     * @constructor\n     */\n    constructor(aParams) {\n        // Set the general properties\n        if (aParams.width && aParams.height) {\n            this.width = aParams.width;\n            this.height = aParams.height;\n            this.numberOfFields = this.width * this.height;\n        }\n        else if (aParams.matrix) {\n            this.width = aParams.matrix[0].length;\n            this.height = aParams.matrix.length;\n            this.numberOfFields = this.width * this.height;\n        }\n        // Create and generate the matrix\n        this.gridNodes = this.buildGridWithNodes(aParams.matrix || undefined, this.width, this.height, aParams.densityOfObstacles || 0);\n    }\n    /**\n     * Build grid, fill it with nodes and return it.\n     * @param matrix [ 0 or 1: 0 = walkable; 1 = not walkable ]\n     * @param width [grid width]\n     * @param height [grid height]\n     * @param densityOfObstacles [density of non walkable fields]\n     */\n    buildGridWithNodes(matrix, width, height, densityOfObstacles) {\n        const newGrid = [];\n        let id = 0;\n        // Generate an empty matrix\n        for (let y = 0; y < height; y++) {\n            newGrid[y] = [];\n            for (let x = 0; x < width; x++) {\n                newGrid[y][x] = new node_1.Node({\n                    id: id,\n                    position: { x: x, y: y }\n                });\n                id++;\n            }\n        }\n        /**\n         * If we have not loaded a predefined matrix,\n         * loop through our grid and set random obstacles.\n         */\n        if (matrix === undefined) {\n            for (let y = 0; y < height; y++) {\n                for (let x = 0; x < width; x++) {\n                    const rndNumber = Math.floor(Math.random() * 10) + 1;\n                    if (rndNumber > 10 - densityOfObstacles) {\n                        newGrid[y][x].setIsWalkable(false);\n                    }\n                    else {\n                        newGrid[y][x].setIsWalkable(true);\n                    }\n                }\n            }\n            return newGrid;\n        }\n        /**\n         * In case we have a matrix loaded.\n         * Load up the informations of the matrix.\n         */\n        for (let y = 0; y < height; y++) {\n            for (let x = 0; x < width; x++) {\n                newGrid[y][x].setIsWalkable(matrix[y][x] ? false : true);\n            }\n        }\n        return newGrid;\n    }\n    /**\n     * Return a specific node.\n     * @param IPoint position\n     * @return Node\n     */\n    getNodeAt(position) {\n        return this.gridNodes[position.y][position.x];\n    }\n    /**\n     * Check if specific node walkable.\n     * @param IPoint position\n     * @return boolean\n     */\n    isWalkableAt(position) {\n        return this.gridNodes[position.y][position.x].getIsWalkable();\n    }\n    /**\n     * Check if specific node is on the grid.\n     * @param IPoint position\n     * @return boolean\n     */\n    isOnTheGrid(position) {\n        return position.x >= 0 && position.x < this.width && position.y >= 0 && position.y < this.height;\n    }\n    /**\n     * Get surrounding nodes.\n     * @param IPoint currentPosition\n     * @param boolean allowHorizontal\n     * @param boolean allowVertical\n     * @param boolean allowDiagonal\n     * @returns Node[]\n     */\n    getSurroundingNodes(currentPosition, allowHorizontal = true, allowVertical = true, allowDiagonal = true) {\n        const surroundingNodes = [];\n        const minX = currentPosition.x - 1;\n        const maxX = currentPosition.x + 1;\n        const minY = currentPosition.y - 1;\n        const maxY = currentPosition.y + 1;\n        // Cycle vertically\n        for (let y = minY; y <= maxY; y++) {\n            // Cycle horizontally\n            for (let x = minX; x <= maxX; x++) {\n                // Evaluate if NOT current position\n                if (x !== currentPosition.x || y !== currentPosition.y) {\n                    // Evaluate if current position is on the grid AND walkable\n                    if (this.isOnTheGrid({ x: x, y: y }) && this.isWalkableAt({ x: x, y: y })) {\n                        // // Add node\n                        // // if diagonal movement is allowed OR\n                        // // if the node lies on the cross through the center node\n                        // if (allowDiagonal || x == currentPosition.x || y == currentPosition.y) {\n                        // \tsurroundingNodes.push(this.getNodeAt({ x: x, y: y }));\n                        // }\n                        if ((allowHorizontal && y == currentPosition.y) ||\n                            (allowVertical && x == currentPosition.x) ||\n                            (allowDiagonal && x !== currentPosition.x && y !== currentPosition.y)) {\n                            surroundingNodes.push(this.getNodeAt({ x: x, y: y }));\n                        }\n                    }\n                }\n            }\n        }\n        return surroundingNodes;\n    }\n    setGrid(newGrid) {\n        this.gridNodes = newGrid;\n    }\n    /**\n     * Reset the grid\n     */\n    resetGrid() {\n        for (let y = 0; y < this.gridNodes.length; y++) {\n            for (let x = 0; x < this.gridNodes[y].length; x++) {\n                this.gridNodes[y][x].setIsOnClosedList(false);\n                this.gridNodes[y][x].setIsOnOpenList(false);\n                this.gridNodes[y][x].setParent(undefined);\n                this.gridNodes[y][x].setFGHValuesToZero();\n            }\n        }\n    }\n    /**\n     * Get all the nodes of the grid.\n     */\n    getGridNodes() {\n        return this.gridNodes;\n    }\n    /**\n     * Get a clone of the grid\n     */\n    clone() {\n        const clonedGrid = [];\n        let nodeId = 0;\n        for (let y = 0; y < this.height; y++) {\n            clonedGrid[y] = [];\n            for (let x = 0; x < this.width; x++) {\n                clonedGrid[y][x] = new node_1.Node({\n                    id: nodeId,\n                    position: { x: x, y: y },\n                    walkable: this.gridNodes[y][x].getIsWalkable()\n                });\n                nodeId++;\n            }\n        }\n        return clonedGrid;\n    }\n}\nexports.Grid = Grid;\n\n\n//# sourceURL=webpack://astar-typescript-example/../dist/core/grid.js?");

/***/ }),

/***/ "../dist/core/heuristic.js":
/*!*********************************!*\
  !*** ../dist/core/heuristic.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\n/**\n * Resources:\n * http://theory.stanford.edu/~amitp/GameProgramming/Heuristics.html\n * https://en.wikipedia.org/wiki/Taxicab_geometry\n * https://en.wikipedia.org/wiki/Euclidean_distance\n * https://en.wikipedia.org/wiki/Chebyshev_distance\n * http://www.gameaipro.com/GameAIPro/GameAIPro_Chapter17_Pathfinding_Architecture_Optimizations.pdf\n * https://github.com/riscy/a_star_on_grids#heuristics\n */\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.calculateHeuristic = void 0;\n/**\n * Calculate for two positions the heuristic function.\n * @param heuristicFunction\n * @param pos0\n * @param pos1\n * @param weight\n */\nfunction calculateHeuristic(heuristicFunction, pos0, pos1, weight) {\n    const dx = Math.abs(pos1.x - pos0.x);\n    const dy = Math.abs(pos1.y - pos0.y);\n    switch (heuristicFunction) {\n        case 'Manhattan':\n            /**\n             * Calculate the Manhattan distance.\n             * Generally: Overestimates distances because diagonal movement not taken into accout.\n             * Good for a 4-connected grid (diagonal movement not allowed)\n             */\n            return (dx + dy) * weight;\n        case 'Euclidean':\n            /**\n             * Calculate the Euclidean distance.\n             * Generally: Underestimates distances, assuming paths can have any angle.\n             * Can be used f.e. when units can move at any angle.\n             */\n            return Math.sqrt(dx * dx + dy * dy) * weight;\n        case 'Chebyshev':\n            /**\n             * Calculate the Chebyshev distance.\n             * Should be used when diagonal movement is allowed.\n             * D * (dx + dy) + (D2 - 2 * D) * Math.min(dx, dy)\n             * D = 1 and D2 = 1\n             * => (dx + dy) - Math.min(dx, dy)\n             * This is equivalent to Math.max(dx, dy)\n             */\n            return Math.max(dx, dy) * weight;\n        case 'Octile':\n            /**\n             * Calculate the Octile distance.\n             * Should be used on an 8-connected grid (diagonal movement allowed).\n             * D * (dx + dy) + (D2 - 2 * D) * Math.min(dx, dy)\n             * D = 1 and D2 = sqrt(2)\n             * => (dx + dy) - 0.58 * Math.min(dx, dy)\n             */\n            return (dx + dy - 0.58 * Math.min(dx, dy)) * weight;\n    }\n}\nexports.calculateHeuristic = calculateHeuristic;\n\n\n//# sourceURL=webpack://astar-typescript-example/../dist/core/heuristic.js?");

/***/ }),

/***/ "../dist/core/node.js":
/*!****************************!*\
  !*** ../dist/core/node.js ***!
  \****************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.Node = void 0;\nclass Node {\n    constructor(aParams) {\n        this.id = aParams.id;\n        this.position = aParams.position;\n        this.hValue = 0;\n        this.gValue = 0;\n        this.fValue = 0;\n        this.parentNode = undefined;\n        this.isOnClosedList = false;\n        this.isOnOpenList = false;\n        this.isWalkable = aParams.walkable || true;\n    }\n    /**\n     * Calculate or Recalculate the F value\n     * This is a private function\n     */\n    calculateFValue() {\n        this.fValue = this.gValue + this.hValue;\n    }\n    /**\n     * Set the g value of the node\n     */\n    setGValue(gValue) {\n        this.gValue = gValue;\n        // The G value has changed, so recalculate the f value\n        this.calculateFValue();\n    }\n    /**\n     * Set the h value of the node\n     */\n    setHValue(hValue) {\n        this.hValue = hValue;\n        // The H value has changed, so recalculate the f value\n        this.calculateFValue();\n    }\n    /**\n     * Reset the FGH values to zero\n     */\n    setFGHValuesToZero() {\n        this.fValue = this.gValue = this.hValue = 0;\n    }\n    /**\n     * Getter functions\n     */\n    getFValue() {\n        return this.fValue;\n    }\n    getGValue() {\n        return this.gValue;\n    }\n    getHValue() {\n        return this.hValue;\n    }\n    getParent() {\n        return this.parentNode;\n    }\n    getIsOnClosedList() {\n        return this.isOnClosedList;\n    }\n    getIsOnOpenList() {\n        return this.isOnOpenList;\n    }\n    getIsWalkable() {\n        return this.isWalkable;\n    }\n    /**\n     * Setter functions\n     */\n    setParent(parent) {\n        this.parentNode = parent;\n    }\n    setIsOnClosedList(isOnClosedList) {\n        this.isOnClosedList = isOnClosedList;\n    }\n    setIsOnOpenList(isOnOpenList) {\n        this.isOnOpenList = isOnOpenList;\n    }\n    setIsWalkable(isWalkable) {\n        this.isWalkable = isWalkable;\n    }\n}\nexports.Node = Node;\n\n\n//# sourceURL=webpack://astar-typescript-example/../dist/core/node.js?");

/***/ }),

/***/ "../dist/core/util.js":
/*!****************************!*\
  !*** ../dist/core/util.js ***!
  \****************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.backtrace = void 0;\n/**\n * Backtrace from end node through parents and return the path.\n * @param node\n * @param includeStartingNode\n */\nfunction backtrace(node, includeStartNode, includeEndNode) {\n    // Init empty path\n    const path = [];\n    // If `includeEndNode` is enabled, attach the end node to be the current node\n    let currentNode = includeEndNode ? node : node.getParent();\n    // Loop as long the current node has a parent\n    while (currentNode.getParent()) {\n        path.push([currentNode.position.x, currentNode.position.y]);\n        currentNode = currentNode.getParent();\n    }\n    // If true we will also include the starting node\n    if (includeStartNode) {\n        path.push([currentNode.position.x, currentNode.position.y]);\n    }\n    return path.reverse();\n}\nexports.backtrace = backtrace;\n\n\n//# sourceURL=webpack://astar-typescript-example/../dist/core/util.js?");

/***/ }),

/***/ "../dist/finders/astar-finder.js":
/*!***************************************!*\
  !*** ../dist/finders/astar-finder.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.AStarFinder = void 0;\nconst grid_1 = __webpack_require__(/*! ../core/grid */ \"../dist/core/grid.js\");\nconst util_1 = __webpack_require__(/*! ../core/util */ \"../dist/core/util.js\");\nconst heuristic_1 = __webpack_require__(/*! ../core/heuristic */ \"../dist/core/heuristic.js\");\nconst lodash_1 = __webpack_require__(/*! lodash */ \"../node_modules/lodash/lodash.js\");\nclass AStarFinder {\n    /**\n     * @param IAstarFinderConstructor aParams\n     */\n    constructor(aParams) {\n        // Create grid\n        this.grid = new grid_1.Grid({\n            densityOfObstacles: aParams.grid.densityOfObstacles || 0,\n            height: aParams.grid.height,\n            matrix: aParams.grid.matrix || undefined,\n            width: aParams.grid.width\n        });\n        // Init lists\n        this.closedList = [];\n        this.openList = [];\n        // Set direction booleans\n        this.allowDiagonal = aParams.allowDiagonal !== undefined ? aParams.allowDiagonal : true;\n        this.allowHorizontal = aParams.allowHorizontal !== undefined ? aParams.allowHorizontal : true;\n        this.allowVertical = aParams.allowVertical !== undefined ? aParams.allowVertical : true;\n        // Set if start node included\n        this.includeStartNode = aParams.includeStartNode !== undefined ? aParams.includeStartNode : true;\n        // Set if end node included\n        this.includeEndNode = aParams.includeEndNode !== undefined ? aParams.includeEndNode : true;\n        // Default path as close as possible not allowed\n        this.allowPathAsCloseAsPossible = aParams.allowPathAsCloseAsPossible || false;\n        // Set heuristic function\n        this.heuristic = aParams.heuristic ? aParams.heuristic : 'Manhattan';\n        // Set weight\n        this.weight = aParams.weight || 1;\n    }\n    /**\n     * @param IPoint startPosition\n     * @param IPoint endPosition\n     * @returns number[][]\n     */\n    findPath(startPosition, endPosition) {\n        // Reset lists\n        this.closedList = [];\n        this.openList = [];\n        // Reset grid\n        this.grid.resetGrid();\n        const startNode = this.grid.getNodeAt(startPosition);\n        const endNode = this.grid.getNodeAt(endPosition);\n        // Break if start and/or end position is/are not walkable\n        if (!this.grid.isWalkableAt(endPosition) || !this.grid.isWalkableAt(startPosition)) {\n            // Path could not be created because the start and/or end position is/are not walkable.\n            return [];\n        }\n        // Push start node into open list\n        startNode.setIsOnOpenList(true);\n        this.openList.push(startNode);\n        // Loop through the grid\n        // Set the FGH values of non walkable nodes to zero and push them on the closed list\n        // Set the H value for walkable nodes\n        for (let y = 0; y < this.grid.height; y++) {\n            for (let x = 0; x < this.grid.width; x++) {\n                let node = this.grid.getNodeAt({ x, y });\n                if (!this.grid.isWalkableAt({ x, y })) {\n                    // OK, this node is not walkable\n                    // Set FGH values to zero\n                    node.setFGHValuesToZero();\n                    // Put on closed list\n                    node.setIsOnClosedList(true);\n                    this.closedList.push(node);\n                }\n                else {\n                    // OK, this node is walkable\n                    // Calculate the H value with the corresponding heuristic function\n                    node.setHValue((0, heuristic_1.calculateHeuristic)(this.heuristic, node.position, endNode.position, this.weight));\n                }\n            }\n        }\n        // As long the open list is not empty, continue searching a path\n        while (this.openList.length !== 0) {\n            // Get node with lowest f value\n            const currentNode = (0, lodash_1.minBy)(this.openList, (o) => {\n                return o.getFValue();\n            });\n            // Move current node from open list to closed list\n            currentNode.setIsOnOpenList(false);\n            (0, lodash_1.remove)(this.openList, currentNode);\n            currentNode.setIsOnClosedList(true);\n            this.closedList.push(currentNode);\n            // End of path is reached\n            if (currentNode === endNode) {\n                return (0, util_1.backtrace)(endNode, this.includeStartNode, this.includeEndNode);\n            }\n            // Get neighbors\n            const neighbors = this.grid.getSurroundingNodes(currentNode.position, this.allowHorizontal, this.allowVertical, this.allowDiagonal);\n            // Loop through all the neighbors\n            for (let i in neighbors) {\n                const neightbor = neighbors[i];\n                // Continue if node on closed list\n                if (neightbor.getIsOnClosedList()) {\n                    continue;\n                }\n                // Calculate the g value of the neightbor\n                const nextGValue = currentNode.getGValue() +\n                    (neightbor.position.x !== currentNode.position.x || neightbor.position.y == currentNode.position.y\n                        ? this.weight\n                        : this.weight * 1.41421);\n                // Is the neighbor not on open list OR\n                // can it be reached with lower g value from current position\n                if (!neightbor.getIsOnOpenList() || nextGValue < neightbor.getGValue()) {\n                    neightbor.setGValue(nextGValue);\n                    neightbor.setParent(currentNode);\n                    if (!neightbor.getIsOnOpenList()) {\n                        neightbor.setIsOnOpenList(true);\n                        this.openList.push(neightbor);\n                    }\n                    else {\n                        // okay this is a better way, so change the parent\n                        neightbor.setParent(currentNode);\n                    }\n                }\n            }\n        }\n        // At this point the path to the end position could NOT be created\n        // Return path as close as possible if enabled\n        if (this.allowPathAsCloseAsPossible) {\n            return (0, util_1.backtrace)(this.closedList[this.closedList.length - 1], this.includeStartNode, false);\n        }\n        // Return empty path, because could NOT be created\n        return [];\n    }\n    /**\n     * Set the heuristic to be used for pathfinding.\n     * @param newHeuristic\n     * @return void\n     */\n    setHeuristic(newHeuristic) {\n        this.heuristic = newHeuristic;\n    }\n    /**\n     * Set the weight for the heuristic function.\n     * @param number newWeight\n     * @return void\n     */\n    setWeight(newWeight) {\n        this.weight = newWeight;\n    }\n    /**\n     * Get a copy/clone of the grid.\n     * @return Node[][]\n     */\n    getGridClone() {\n        return this.grid.clone();\n    }\n    /**\n     * Get the current grid\n     * @return Grid\n     */\n    getGrid() {\n        return this.grid;\n    }\n}\nexports.AStarFinder = AStarFinder;\n\n\n//# sourceURL=webpack://astar-typescript-example/../dist/finders/astar-finder.js?");

/***/ }),

/***/ "./src/game.ts":
/*!*********************!*\
  !*** ./src/game.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\n/**\n * @description Main Game Class\n * @author Digitsensitive <digit.sensitivee@gmail.com>\n * @copyright 2019 - 2023 Digitsensitive\n * @license {@link https://opensource.org/licenses/MIT|MIT License}\n */\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.Game = void 0;\n__webpack_require__(/*! phaser */ \"./node_modules/phaser/dist/phaser.js\");\nconst boot_scene_1 = __webpack_require__(/*! ./scenes/boot-scene */ \"./src/scenes/boot-scene.ts\");\nconst main_scene_1 = __webpack_require__(/*! ./scenes/main-scene */ \"./src/scenes/main-scene.ts\");\n// main game configuration\nconst config = {\n    title: 'astar-typescript-example',\n    version: '1.0.0',\n    scale: {\n        width: '100%',\n        height: '100%',\n        parent: 'game',\n        mode: Phaser.Scale.ENVELOP\n    },\n    type: Phaser.AUTO,\n    scene: [boot_scene_1.BootScene, main_scene_1.MainScene]\n};\n// game class\nclass Game extends Phaser.Game {\n    constructor(config) {\n        super(config);\n    }\n}\nexports.Game = Game;\n// when the page is loaded, create our game instance\nwindow.addEventListener('load', () => {\n    const game = new Game(config);\n});\n\n\n//# sourceURL=webpack://astar-typescript-example/./src/game.ts?");

/***/ }),

/***/ "./src/objects/gameobject.ts":
/*!***********************************!*\
  !*** ./src/objects/gameobject.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\n/**\n * @description Gameobject class\n * @author Digitsensitive <digit.sensitivee@gmail.com>\n * @copyright 2019 - 2023 Digitsensitive\n * @license {@link https://opensource.org/licenses/MIT|MIT License}\n */\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.GameObject = void 0;\nclass GameObject extends Phaser.GameObjects.Image {\n    constructor(params) {\n        super(params.scene, params.x, params.y, params.key);\n        this.initImage(params.realSize, params.tint, params.alpha);\n        this.scene.add.existing(this);\n    }\n    initImage(realSize, tint, alpha) {\n        this.setOrigin(0, 0);\n        this.setDisplaySize(realSize, realSize);\n        this.setTint(tint);\n        this.setAlpha(alpha);\n    }\n}\nexports.GameObject = GameObject;\n\n\n//# sourceURL=webpack://astar-typescript-example/./src/objects/gameobject.ts?");

/***/ }),

/***/ "./src/scenes/boot-scene.ts":
/*!**********************************!*\
  !*** ./src/scenes/boot-scene.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\n/**\n * @description Boot Scene\n * @author Digitsensitive <digit.sensitivee@gmail.com>\n * @copyright 2019 - 2023 Digitsensitive\n * @license {@link https://opensource.org/licenses/MIT|MIT License}\n */\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.BootScene = void 0;\nclass BootScene extends Phaser.Scene {\n    constructor() {\n        super({\n            key: 'BootScene'\n        });\n    }\n    preload() {\n        // set the background, create the loading and progress bar\n        this.cameras.main.setBackgroundColor(0x000000);\n        this.createLoadingGraphics();\n        // pass value to change the loading bar fill\n        this.load.on('progress', (value) => {\n            this.progressBar.clear();\n            this.progressBar.fillStyle(0x88e453, 1);\n            this.progressBar.fillRect(this.cameras.main.width / 4, this.cameras.main.height / 2 - 16, (this.cameras.main.width / 2) * value, 16);\n        }, this);\n        // delete bar graphics, when loading complete\n        this.load.on('complete', () => {\n            this.progressBar.destroy();\n            this.loadingBar.destroy();\n        }, this);\n        // load our package\n        this.load.pack('preload', './assets/pack.json', 'preload');\n    }\n    update() {\n        this.scene.start('MainScene');\n    }\n    createLoadingGraphics() {\n        this.loadingBar = this.add.graphics();\n        this.loadingBar.fillStyle(0xffffff, 1);\n        this.loadingBar.fillRect(this.cameras.main.width / 4 - 2, this.cameras.main.height / 2 - 18, this.cameras.main.width / 2 + 4, 20);\n        this.progressBar = this.add.graphics();\n    }\n}\nexports.BootScene = BootScene;\n\n\n//# sourceURL=webpack://astar-typescript-example/./src/scenes/boot-scene.ts?");

/***/ }),

/***/ "./src/scenes/main-scene.ts":
/*!**********************************!*\
  !*** ./src/scenes/main-scene.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\n/**\n * @description Main Scene\n * @author Digitsensitive <digit.sensitivee@gmail.com>\n * @copyright 2019 - 2023 Digitsensitive\n * @license {@link https://opensource.org/licenses/MIT|MIT License}\n */\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.MainScene = void 0;\nconst astar_1 = __webpack_require__(/*! ../../../dist/astar */ \"../dist/astar.js\");\nconst dat_gui_service_1 = __webpack_require__(/*! ../services/dat-gui.service */ \"./src/services/dat-gui.service.ts\");\nconst gameobject_1 = __webpack_require__(/*! ../objects/gameobject */ \"./src/objects/gameobject.ts\");\nclass MainScene extends Phaser.Scene {\n    constructor() {\n        super({\n            key: 'MainScene'\n        });\n    }\n    init() {\n        // init variables\n        this.currentPathObject = 0;\n        this.tileSize = 60;\n        this.gridHeight = Math.floor(this.sys.canvas.height / this.tileSize);\n        this.gridWidth = Math.floor(this.sys.canvas.width / this.tileSize);\n        this.startPosition = new Phaser.Math.Vector2(Phaser.Math.RND.between(0, this.gridWidth - 1), Phaser.Math.RND.between(0, this.gridHeight - 1));\n        this.goalPosition = new Phaser.Math.Vector2(Phaser.Math.RND.between(0, this.gridWidth - 1), Phaser.Math.RND.between(0, this.gridHeight - 1));\n        // init astar variables\n        this.aMatrix = [];\n        for (let i = 0; i < this.gridHeight; i++) {\n            this.aMatrix[i] = Array(this.gridWidth).fill(0);\n        }\n        this.diagonalMovement = false;\n        this.heuristic = 'Manhattan';\n        this.weight = 1;\n        this.aStarInstance = new astar_1.AStarFinder({\n            grid: {\n                matrix: this.aMatrix\n            },\n            heuristic: this.heuristic,\n            weight: this.weight,\n            allowDiagonal: this.diagonalMovement,\n            includeEndNode: false,\n            includeStartNode: false\n        });\n        this.aStarPathway = this.aStarInstance.findPath(this.startPosition, this.goalPosition);\n        this.initDatGui();\n        this.initInput();\n    }\n    initDatGui() {\n        // dat gui service\n        this.datGuiServiceInstance = new dat_gui_service_1.DatGuiService();\n        this.datGuiServiceInstance.addFolder('Start Position');\n        this.datGuiServiceInstance.addNumberController('X', this.startPosition, 'x', true, { min: 0, max: this.gridWidth - 1, step: 1 }, (value) => {\n            this.startPosition.x = value;\n            this.startObject.x = value * this.tileSize + 1;\n            this.destroyPathAndSurroundingNodes();\n            this.resetAStarInstance();\n        });\n        this.datGuiServiceInstance.addNumberController('Y', this.startPosition, 'y', true, { min: 0, max: this.gridHeight - 1, step: 1 }, (value) => {\n            this.startPosition.y = value;\n            this.startObject.y = value * this.tileSize + 1;\n            this.destroyPathAndSurroundingNodes();\n            this.resetAStarInstance();\n        });\n        this.datGuiServiceInstance.addFolder('End Position');\n        this.datGuiServiceInstance.addNumberController('X', this.goalPosition, 'x', true, { min: 0, max: this.gridWidth - 1, step: 1 }, (value) => {\n            this.goalPosition.x = value;\n            this.endObject.x = value * this.tileSize + 1;\n            this.destroyPathAndSurroundingNodes();\n            this.resetAStarInstance();\n        });\n        this.datGuiServiceInstance.addNumberController('Y', this.goalPosition, 'y', true, { min: 0, max: this.gridHeight - 1, step: 1 }, (value) => {\n            this.goalPosition.y = value;\n            this.endObject.y = value * this.tileSize + 1;\n            this.destroyPathAndSurroundingNodes();\n            this.resetAStarInstance();\n        });\n        this.datGuiServiceInstance.addFolder('A* Properties');\n        this.datGuiServiceInstance.addController('Heuristic', this, 'heuristic', true, (value) => {\n            this.heuristic = value;\n            this.aStarInstance.setHeuristic(this.heuristic);\n            this.destroyPathAndSurroundingNodes();\n            this.resetAStarInstance();\n        }, ['Manhattan', 'Euclidean', 'Chebyshev', 'Octile']);\n        this.datGuiServiceInstance.addNumberController('Weight', this, 'weight', true, { min: 0, max: 1, step: 0.01 }, (value) => {\n            this.weight = value;\n            this.aStarInstance.setWeight(this.weight);\n            this.destroyPathAndSurroundingNodes();\n            this.resetAStarInstance();\n        });\n    }\n    initInput() {\n        this.input.on('pointerdown', (pointer) => {\n            let x = Math.floor(pointer.x / this.tileSize);\n            let y = Math.floor(pointer.y / this.tileSize);\n            if (this.aMatrix[y][x] === 1) {\n                this.aMatrix[y][x] = 0;\n            }\n            else {\n                this.aMatrix[y][x] = 1;\n                this.wallObjects.push(new gameobject_1.GameObject({\n                    scene: this,\n                    x: x * this.tileSize + 1,\n                    y: y * this.tileSize + 1,\n                    key: 'node',\n                    realSize: this.tileSize - 2,\n                    tint: 0x156c9e\n                }).setInteractive());\n            }\n            this.destroyPathAndSurroundingNodes();\n            this.resetAStarInstance();\n        }, this);\n        this.input.on('gameobjectdown', (pointer, gameObject) => {\n            let x = Math.floor(pointer.x / this.tileSize);\n            let y = Math.floor(pointer.y / this.tileSize);\n            this.aMatrix[y][x] = 0;\n            gameObject.destroy();\n            this.destroyPathAndSurroundingNodes();\n            this.resetAStarInstance();\n        });\n    }\n    /**\n     * This function will create all our game objects.\n     */\n    create() {\n        // Create our game grid\n        this.gameGrid = this.add\n            .grid(0, 0, this.sys.canvas.width, this.sys.canvas.height, this.tileSize, this.tileSize, 0xdff0f5, 1, 0xebf8fc, 1)\n            .setOrigin(0, 0);\n        // Create start and end object\n        this.startObject = new gameobject_1.GameObject({\n            scene: this,\n            x: this.startPosition.x * this.tileSize + 1,\n            y: this.startPosition.y * this.tileSize + 1,\n            key: 'node',\n            realSize: this.tileSize - 2,\n            tint: 0x9e156e\n        });\n        this.endObject = new gameobject_1.GameObject({\n            scene: this,\n            x: this.goalPosition.x * this.tileSize + 1,\n            y: this.goalPosition.y * this.tileSize + 1,\n            key: 'node',\n            realSize: this.tileSize - 2,\n            tint: 0x159e70\n        });\n        this.surroundingNodes = [];\n        // Create the astar path\n        this.aStarPathwayObjects = [];\n        this.time.addEvent({\n            delay: 0,\n            callback: this.drawNextObjectOfPath,\n            callbackScope: this,\n            loop: true\n        });\n        this.wallObjects = [];\n    }\n    destroyPathAndSurroundingNodes() {\n        // Destroy path objects\n        for (let i = 0; i < this.aStarPathwayObjects.length; i++) {\n            this.aStarPathwayObjects[i].destroy();\n        }\n        this.aStarPathwayObjects = [];\n        // Destroy surrounding nodes\n        for (let i = 0; i < this.surroundingNodes.length; i++) {\n            this.surroundingNodes[i].destroy();\n        }\n        this.surroundingNodes = [];\n    }\n    resetAStarInstance() {\n        this.aStarInstance = new astar_1.AStarFinder({\n            grid: {\n                matrix: this.aMatrix\n            },\n            heuristic: this.heuristic,\n            allowDiagonal: this.diagonalMovement,\n            includeEndNode: false,\n            includeStartNode: false\n        });\n        this.aStarPathway = this.aStarInstance.findPath(this.startPosition, this.goalPosition);\n        this.currentPathObject = 0;\n    }\n    drawNextObjectOfPath() {\n        if (this.currentPathObject < this.aStarPathway.length) {\n            // get surround nodes\n            let getNodes = this.aStarInstance.getGrid().getSurroundingNodes({\n                x: this.aStarPathway[this.currentPathObject][0],\n                y: this.aStarPathway[this.currentPathObject][1]\n            }, false);\n            for (let node of getNodes) {\n                this.surroundingNodes.push(new gameobject_1.GameObject({\n                    scene: this,\n                    x: node.position.x * this.tileSize + 1,\n                    y: node.position.y * this.tileSize + 1,\n                    key: 'node',\n                    realSize: this.tileSize - 2,\n                    tint: 0x24e1e3,\n                    alpha: node.getGValue() / 100\n                }));\n            }\n            this.aStarPathwayObjects.push(new gameobject_1.GameObject({\n                scene: this,\n                x: this.aStarPathway[this.currentPathObject][0] * this.tileSize + 1,\n                y: this.aStarPathway[this.currentPathObject][1] * this.tileSize + 1,\n                key: 'node',\n                realSize: this.tileSize - 2,\n                tint: 0xffffff\n            }));\n        }\n        this.currentPathObject++;\n    }\n}\nexports.MainScene = MainScene;\n\n\n//# sourceURL=webpack://astar-typescript-example/./src/scenes/main-scene.ts?");

/***/ }),

/***/ "./src/services/dat-gui.service.ts":
/*!*****************************************!*\
  !*** ./src/services/dat-gui.service.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\n/**\n * @author       Digitsensitive <digit.sensitivee@gmail.com>\n * @copyright    2019 - 2023 digitsensitive\n * @description  Dat.Gui Service\n *               dat.gui is a lightweight controller library for JavaScript.\n *               https://github.com/dataarts/dat.gui\n * @version      1.0.0\n * @license      {@link https://github.com/digitsensitive/phaser3-typescript/blob/master/LICENSE.md | MIT License}\n */\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.DatGuiService = void 0;\nconst dat = __webpack_require__(/*! dat.gui */ \"./node_modules/dat.gui/build/dat.gui.module.js\");\nclass DatGuiService {\n    constructor() {\n        this.gui = new dat.GUI();\n        this.controllers = [];\n    }\n    addFolder(folderName) {\n        this.gui.addFolder(folderName);\n    }\n    addController(controllerName, target, propName, hasController, controllerFunction, items) {\n        this.controllers.push(this.gui.add(target, propName, items).name(controllerName));\n        if (hasController) {\n            this.addOnChangeToController(this.controllers[this.controllers.length - 1], controllerFunction);\n        }\n    }\n    addNumberController(controllerName, target, propName, hasController, configNumber, controllerFunction) {\n        this.controllers.push(this.gui\n            .add(target, propName, configNumber.min, configNumber.max, configNumber.step)\n            .name(controllerName));\n        if (hasController) {\n            this.addOnChangeToController(this.controllers[this.controllers.length - 1], controllerFunction);\n        }\n    }\n    addOnChangeToController(controller, onChangeFunction) {\n        controller.onChange(onChangeFunction);\n    }\n}\nexports.DatGuiService = DatGuiService;\n\n\n//# sourceURL=webpack://astar-typescript-example/./src/services/dat-gui.service.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/node module decorator */
/******/ 	(() => {
/******/ 		__webpack_require__.nmd = (module) => {
/******/ 			module.paths = [];
/******/ 			if (!module.children) module.children = [];
/******/ 			return module;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"main": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkastar_typescript_example"] = self["webpackChunkastar_typescript_example"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendors-node_modules_dat_gui_build_dat_gui_module_js-node_modules_phaser_dist_phaser_js-node_-f6e6be"], () => (__webpack_require__("./src/game.ts")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;