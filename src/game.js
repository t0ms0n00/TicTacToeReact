function Field(props){
    return <td><div><button onClick={() => props.updater(props.row, props.col)}>{props.value}</button></div></td>;
}

function EndCommand(props){
    if(props.command != undefined){
        return <p className="result"> {props.command} </p>
    }
    return null;
}

class HistoryPanel extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        boardsArr = this.props.boardsArr;
        boardsButtons = [];
        for(let i=0; i<boardsArr.length; i++){
            boardsButtons.push(<button className="backmove" onClick={() => this.props.degrader(i)}>Ruch {i}</button>)
        }
        return (
            <div className="col-sm-3 history">
                <p> Cofanie do ruchu </p>
                {boardsButtons}
            </div>
        )
    }
}

class Board extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        const boardState = this.props.board;
        const board = [];
        for(let i=0; i<3; i++){
            const row = [];
            for(let j=0; j<3; j++){
                row.push(<Field key={(i*3+j+1)} row={i} col={j} value={boardState[i][j]} updater={this.props.updater}/>)
            }
            board.push(<tr key={i}>{row}</tr>)
        }
        return (
        <div className="col-sm-9">
        <table>
            <thead>
                <tr><th colSpan="100%"> Tic-Tac-Toe </th></tr>
            </thead>
            <tbody>
                {board}
            </tbody>
        </table>
        <EndCommand command={this.props.winner}/>
        </div>
        )
    }
}

class Game extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            board: [[null, null, null],
                    [null, null, null],
                    [null, null, null]],
            sign: 'O',
            active: true,
            winner: undefined,
            history: [
                        [[null, null, null],
                        [null, null, null],
                        [null, null, null]]
                    ]
        };
        this.updateGame = this.updateGame.bind(this);
        this.undoMoves = this.undoMoves.bind(this);
    }

    isWin(){
        let board = this.state.board;
        for(let i=0; i<3; i++){
            if(board[i][0] === board[i][1] && board[i][1] === board[i][2] && board[i][0] != null) return true;
            if(board[0][i] === board[1][i] && board[1][i] === board[2][i] && board[0][i] != null) return true;
        }
        if(board[0][0] === board[1][1] && board[1][1] === board[2][2] && board[0][0] != null) return true;
        if(board[0][2] === board[1][1] && board[1][1] === board[2][0] && board[2][0] != null) return true;
        return false;
    }

    isTie(){
        let board = this.state.board;
        for(let i=0; i<3; i++){
            for(let j=0; j<3; j++){
                if(board[i][j]==null) return false; 
            }
        }
        return true;
    }

    undoMoves(returnTo){
        while(this.state.history.length>returnTo+1){
            this.state.history.pop();
        }
        actBoard = this.state.history[returnTo].map((arr) => {
            return arr.slice();
        })
        nextSign = returnTo%2 === 0 ? 'O' : 'X';
        this.setState({
            board: actBoard,
            sign: nextSign,
            active: true,
            winner: undefined
        })
    }

    updateGame(row, col){
        if(this.state.board[row][col]!=null || !this.state.active) return;
        newBoard = this.state.board;
        newBoard[row][col] = this.state.sign;
        historyElem = this.state.board.map((arr) => {
            return arr.slice();
        });
        this.state.history.push(historyElem);
        oldSign = this.state.sign;
        newSign = this.state.sign === 'O'? 'X' : 'O';
        this.setState({
            board: newBoard,
            sign: newSign
        });
        if(this.isWin()){
            this.setState({
                active: false,
                winner: 'Wygrał ' + oldSign + '!'
            });
        }
        else if(this.isTie()){
            this.setState({
                active: false,
                winner: 'Remis!'
            })
        }
    }

    render(){
        return (
        <div className="row">
            <Board board={this.state.board} sign={this.state.sign} updater={this.updateGame} winner={this.state.winner} />
            <HistoryPanel boardsArr={this.state.history} degrader={this.undoMoves} />
        </div>
        
        );
    }
}

ReactDOM.render(
    <Game />
    ,document.getElementById('root')
)