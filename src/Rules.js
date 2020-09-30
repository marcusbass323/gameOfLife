import React from 'react';
import About from './About';

export default function Rules() {
    return (
        <div id="infoContainer">
            <About />
            <h1>Rules:</h1>
        <div id="Rules">
                <div className="rule"><h1 className="ruleNumber">1</h1><div>Any live cell with fewer than two live neighbors dies, as if by underpopulation.</div></div>
                <div className="rule"><div><h1 className="ruleNumber">2</h1>Any live cell with two or three live neighbors lives on to the next generation.</div></div>
                <div className="rule"><div><h1 className="ruleNumber">3</h1>Any live cell with more than three live neighbors dies, as if by overpopulation.</div></div>
                <div className="rule"><div><h1 className="ruleNumber">4</h1>Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.</div></div>
        </div>
        </div>

    )
}
