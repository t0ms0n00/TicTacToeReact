var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function Field(props) {
    return React.createElement(
        "td",
        null,
        React.createElement(
            "div",
            null,
            React.createElement(
                "button",
                { onClick: function onClick() {
                        return props.updater(props.row, props.col);
                    } },
                props.value
            )
        )
    );
}

function EndCommand(props) {
    if (props.command != undefined) {
        return React.createElement(
            "p",
            { className: "result" },
            " ",
            props.command,
            " "
        );
    }
    return null;
}

var HistoryPanel = function (_React$Component) {
    _inherits(HistoryPanel, _React$Component);

    function HistoryPanel(props) {
        _classCallCheck(this, HistoryPanel);

        return _possibleConstructorReturn(this, (HistoryPanel.__proto__ || Object.getPrototypeOf(HistoryPanel)).call(this, props));
    }

    _createClass(HistoryPanel, [{
        key: "render",
        value: function render() {
            var _this2 = this;

            boardsArr = this.props.boardsArr;
            boardsButtons = [];

            var _loop = function _loop(i) {
                boardsButtons.push(React.createElement(
                    "button",
                    { className: "backmove", onClick: function onClick() {
                            return _this2.props.degrader(i);
                        } },
                    "Ruch ",
                    i
                ));
            };

            for (var i = 0; i < boardsArr.length; i++) {
                _loop(i);
            }
            return React.createElement(
                "div",
                { className: "col-sm-3 history" },
                React.createElement(
                    "p",
                    null,
                    " Cofanie do ruchu "
                ),
                boardsButtons
            );
        }
    }]);

    return HistoryPanel;
}(React.Component);

var Board = function (_React$Component2) {
    _inherits(Board, _React$Component2);

    function Board(props) {
        _classCallCheck(this, Board);

        return _possibleConstructorReturn(this, (Board.__proto__ || Object.getPrototypeOf(Board)).call(this, props));
    }

    _createClass(Board, [{
        key: "render",
        value: function render() {
            var boardState = this.props.board;
            var board = [];
            for (var i = 0; i < 3; i++) {
                var row = [];
                for (var j = 0; j < 3; j++) {
                    row.push(React.createElement(Field, { key: i * 3 + j + 1, row: i, col: j, value: boardState[i][j], updater: this.props.updater }));
                }
                board.push(React.createElement(
                    "tr",
                    { key: i },
                    row
                ));
            }
            return React.createElement(
                "div",
                { className: "col-sm-9" },
                React.createElement(
                    "table",
                    null,
                    React.createElement(
                        "thead",
                        null,
                        React.createElement(
                            "tr",
                            null,
                            React.createElement(
                                "th",
                                { colSpan: "100%" },
                                " Tic-Tac-Toe "
                            )
                        )
                    ),
                    React.createElement(
                        "tbody",
                        null,
                        board
                    )
                ),
                React.createElement(EndCommand, { command: this.props.winner })
            );
        }
    }]);

    return Board;
}(React.Component);

var Game = function (_React$Component3) {
    _inherits(Game, _React$Component3);

    function Game(props) {
        _classCallCheck(this, Game);

        var _this4 = _possibleConstructorReturn(this, (Game.__proto__ || Object.getPrototypeOf(Game)).call(this, props));

        _this4.state = {
            board: [[null, null, null], [null, null, null], [null, null, null]],
            sign: 'O',
            active: true,
            winner: undefined,
            history: [[[null, null, null], [null, null, null], [null, null, null]]]
        };
        _this4.updateGame = _this4.updateGame.bind(_this4);
        _this4.undoMoves = _this4.undoMoves.bind(_this4);
        return _this4;
    }

    _createClass(Game, [{
        key: "isWin",
        value: function isWin() {
            var board = this.state.board;
            for (var i = 0; i < 3; i++) {
                if (board[i][0] === board[i][1] && board[i][1] === board[i][2] && board[i][0] != null) return true;
                if (board[0][i] === board[1][i] && board[1][i] === board[2][i] && board[0][i] != null) return true;
            }
            if (board[0][0] === board[1][1] && board[1][1] === board[2][2] && board[0][0] != null) return true;
            if (board[0][2] === board[1][1] && board[1][1] === board[2][0] && board[2][0] != null) return true;
            return false;
        }
    }, {
        key: "isTie",
        value: function isTie() {
            var board = this.state.board;
            for (var i = 0; i < 3; i++) {
                for (var j = 0; j < 3; j++) {
                    if (board[i][j] == null) return false;
                }
            }
            return true;
        }
    }, {
        key: "undoMoves",
        value: function undoMoves(returnTo) {
            while (this.state.history.length > returnTo + 1) {
                this.state.history.pop();
            }
            actBoard = this.state.history[returnTo].map(function (arr) {
                return arr.slice();
            });
            nextSign = returnTo % 2 === 0 ? 'O' : 'X';
            this.setState({
                board: actBoard,
                sign: nextSign,
                active: true,
                winner: undefined
            });
        }
    }, {
        key: "updateGame",
        value: function updateGame(row, col) {
            if (this.state.board[row][col] != null || !this.state.active) return;
            newBoard = this.state.board;
            newBoard[row][col] = this.state.sign;
            historyElem = this.state.board.map(function (arr) {
                return arr.slice();
            });
            this.state.history.push(historyElem);
            oldSign = this.state.sign;
            newSign = this.state.sign === 'O' ? 'X' : 'O';
            this.setState({
                board: newBoard,
                sign: newSign
            });
            if (this.isWin()) {
                this.setState({
                    active: false,
                    winner: 'Wygra?? ' + oldSign + '!'
                });
            } else if (this.isTie()) {
                this.setState({
                    active: false,
                    winner: 'Remis!'
                });
            }
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { className: "row" },
                React.createElement(Board, { board: this.state.board, sign: this.state.sign, updater: this.updateGame, winner: this.state.winner }),
                React.createElement(HistoryPanel, { boardsArr: this.state.history, degrader: this.undoMoves })
            );
        }
    }]);

    return Game;
}(React.Component);

ReactDOM.render(React.createElement(Game, null), document.getElementById('root'));