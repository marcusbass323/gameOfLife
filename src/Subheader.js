import React, { useState, useEffect, useCallback, useRef } from 'react';
import produce from 'immer';

export default function Subheader() {

    //Defining grid
    const numRows = 5;
    const numCols = 85;

    //Identifying neighbors
    const operations = [
        [0, 1],
        [0, -1],
        [1, -1],
        [-1, 1],
        [1, 1],
        [-1, -1],
        [1, 0],
        [-1, 0]
    ];

    //Initialize grid
    const [grid, setGrid] = useState(() => {
        const rows = [];
        for (let i = 0; i < numRows; i++) {
            rows.push(Array.from(Array(numCols), () => 0));
        }
        return rows;
    });

    const hideGrid = () => {
        document.getElementById('subGrid').style.opacity = "0"
    }

    const runSimulation = useCallback(() => {
        // If game is running, simply return
        if (!runningRef.current) {
            return;
        }
        //Simulate game
        setGrid((g) => {
            return produce(g, gridCopy => {
                for (let i = 0; i < numRows; i++) {
                    for (let k = 0; k < numCols; k++) {
                        //Compute number of neighbors
                        let neighbors = 0;
                        operations.forEach(([x, y]) => {
                            //Make sure mutations don't go out of bounds
                            const newI = i + x;
                            const newK = k + y;
                            if (newI >= 0 && newI < numRows && newK >= 0 && newK < numCols) {
                                neighbors += g[newI][newK]
                            }
                        })
                        //Covers rules 1 and 3 - 2 unnecessary 
                        if (neighbors < 2 || neighbors > 3) {
                            gridCopy[i][k] = 0;
                        } else if (g[i][k] === 0 && neighbors === 3) {
                            gridCopy[i][k] = 1;
                        }
                    }
                }
            });
        });

        setTimeout(runSimulation, 100);
        setTimeout(hideGrid, 10000);
    }, [])

    //State hook for game state - running vs not-running
    const [running, setRunning] = useState(true);

    const runningRef = useRef();
    runningRef.current = running;

    useEffect(() => {
        const rows = []
        for (let i = 0; i < numRows; i++) {
            rows.push(
                Array.from(Array(numCols), () => (Math.random() > 0.5 ? 1 : 0))
            );
        }
        setGrid(rows);
        runSimulation()
    }, []);

    return (
        <div>
            <div className="subGrid" id="subGrid">
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: `repeat(${numCols}, 20px)`
                }}>
                    {grid.map((rows, i) =>
                        rows.map((col, k) => (
                            <div
                                id="gridBlock"
                                key={`${i}-${k}`}
                                onClick={() => {
                                    const newGrid = produce(grid, gridCopy => {
                                        gridCopy[i][k] = grid[i][k] ? 0 : 1;
                                    });
                                    setGrid(newGrid)
                                }}
                                style={{
                                    width: 20,
                                    height: 20,
                                    backgroundColor: grid[i][k] ? 'black' : undefined,
                                    border: "1px solid white"
                                }}
                            />
                        ))
                    )}
                </div>
            </div>
            <div id="titleContainer">
                    <div id="title">Conway's Game of Life</div>
                </div>
        </div>
    )
}
