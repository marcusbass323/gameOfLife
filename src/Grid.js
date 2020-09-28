import React, { useState, useCallback, useRef } from 'react'
import produce from 'immer'
import Rules from './Rules'

export default function Grid() {
    const numRows = 25;
    const numCols = 35;

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

    const generateEmptyGrid = () => {
        const rows = [];
        for (let i = 0; i < numRows; i++) {
            rows.push(Array.from(Array(numCols), () => 0));
        }
        return rows;
    }

    const [grid, setGrid] = useState(() => {
        const rows = [];
        for (let i = 0; i < numRows; i++) {
            rows.push(Array.from(Array(numCols), () => 0));
        }
        return rows;
    });

    const [running, setRunning] = useState(false);

    const runningRef = useRef();
    runningRef.current = running;

    const runSimulation = useCallback(() => {
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
                            //Make sure we don't go out of bounds
                            const newI = i + x;
                            const newK = k + y;
                            if (newI >= 0 && newI < numRows && newK >= 0 && newK < numCols) {
                                neighbors += g[newI][newK]
                            }
                        })
                        if (neighbors < 2 || neighbors > 3) { //Rules 1 and 3
                            gridCopy[i][k] = 0;
                        } else if (g[i][k] === 0 && neighbors === 3) {
                            gridCopy[i][k] = 1;
                        }
                    }
                }
            });
        });

        setTimeout(runSimulation, 100);
    }, [])

    return (
        <div id="main">
            <div id="Grid">
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: `repeat(${numCols}, 20px)`
                }}>
                    {grid.map((rows, i) =>
                        rows.map((col, k) => (
                            <div
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
                                    backgroundColor: grid[i][k] ? 'pink' : undefined,
                                    border: "1px solid black"
                                }}
                            />
                        ))
                    )}
                </div>
                <div id="controlButtons">
                    <button
                        onClick={() => {
                            setRunning(!running); //Only run simulation if not running
                            runningRef.current = true; //Prevents race condition
                            runSimulation()
                        }}
                    >{running ? 'stop' : 'start'}
                    </button>
                    <button
                        onClick={() => {
                            const rows = []
                            for (let i = 0; i < numRows; i++) {
                                rows.push(
                                    Array.from(Array(numCols), () => (Math.random() > 0.5 ? 1 : 0))
                                );
                            }
                            setGrid(rows);
                        }}
                    >
                        Random
        </button>
                    <button
                        onClick={() => {
                            setGrid(generateEmptyGrid());
                        }}>
                        Clear
        </button>
                </div>
            </div>
            <Rules />
        </div>
    )
}