import React from "react";

export const UserWatchlist: React.FC = () => {
    return (
        <table className="table-auto text-sm w-full text-black">
            <thead>
                <tr className="border-t border-b border-gray-200">
                    <th className="sticky-top" style={{ padding: '11px 10px' }} >.</th>
                    <th className="sticky-top" style={{padding: '11px 10px',textAlign: 'start'}}>#</th>
                    <th className="sticky-top" style={{padding: '11px 10px',textAlign: 'start'}}>Name</th>
                    <th className="sticky-top" style={{padding: '11px 10px',textAlign: 'end'}}>Price</th>
                    <th className="sticky-top" style={{padding: '11px 10px',textAlign: 'end'}}>24H %</th>
                    <th className="sticky-top" style={{padding: '11px 10px',textAlign: 'end'}}>7D %</th>
                    <th className="sticky-top" style={{padding: '11px 10px',textAlign: 'end'}}>Market Cap</th>
                    <th className="sticky-top" style={{padding: '11px 10px',textAlign: 'end'}}>Volume(24H)</th>
                </tr>
            </thead>
            <tbody>
            <tr className="border-b border-gray-200">
                    <td style={{padding: '11px 10px',}}>X</td>
                    <td style={{padding: '11px 10px',textAlign: 'start'}}>1</td>
                    <td style={{padding: '11px 10px',textAlign: 'start'}}>APPLE AAPL</td>
                    <td style={{padding: '11px 10px',textAlign: 'end'}}>NIL</td>
                    <td style={{padding: '11px 10px',textAlign: 'end'}}>NIL</td>
                    <td style={{padding: '11px 10px',textAlign: 'end'}}>NIL</td>
                    <td style={{padding: '11px 10px',textAlign: 'end'}}>NIL</td>
                    <td style={{padding: '11px 10px',textAlign: 'end'}}>NIL</td>
                </tr>
                <tr className="border-b border-gray-200">
                    <td style={{padding: '11px 10px',}}>X</td>
                    <td style={{padding: '11px 10px',textAlign: 'start'}}>2</td>
                    <td style={{padding: '11px 10px',textAlign: 'start'}}>GOOGLE GOOGL</td>
                    <td style={{padding: '11px 10px',textAlign: 'end'}}>NIL</td>
                    <td style={{padding: '11px 10px',textAlign: 'end'}}>NIL</td>
                    <td style={{padding: '11px 10px',textAlign: 'end'}}>NIL</td>
                    <td style={{padding: '11px 10px',textAlign: 'end'}}>NIL</td>
                    <td style={{padding: '11px 10px',textAlign: 'end'}}>NIL</td>
                </tr>
            </tbody>
        </table>
      
    );
};

