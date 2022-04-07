const player1Scored = 'player1Scored';
const player2Scored = 'player2Scored';
const commands = {
    player1Scored: player1Scored,
    player2Scored: player2Scored
}

test('when score 0-0 then "love-love"', () => {
    expect(toConsole(startNewGame())).toEqual('love-love')
})

const loveLove = {score: 'love-love', player1: 0, player2: 0, isAdvantage: false};
const fifteenLove = {score: '15-love', player1: 1, player2: 0, isAdvantage: false};
const loveFifteen = {score: 'love-15', player1: 0, player2: 1, isAdvantage: false};
const love15 = loveFifteen
const thirtyLove = {score: '30-love', player1: 2, player2: 0, isAdvantage: false};
const loveThirty = {score: 'love-30', player1: 0, player2: 2, isAdvantage: false}
const fifteenAll = {score: '15-15', player1: 1, player2: 1, isAdvantage: false};
const fifteenThirty = {score: '15-30', player1: 1, player2: 2, isAdvantage: false};
const fortyLove = {score: '40-love', player1: 3, player2: 0, isAdvantage: false};
const loveForty = {score: 'love-40', player1: 0, player2: 3, isAdvantage: false};
const thirty15 = {score: '30-15', player1: 2, player2: 1, isAdvantage: false};
const fortyThirty = {score: '40-30', player1: 3, player2: 2, isAdvantage: false}

const gamePlayer1 = {score: 'game player 1', gameOver:true};
const gamePlayer2 = {score: 'game player 2', gameOver:true};
const forty15 = {score: '40-15', player1: 3, player2: 1, isAdvantage: false};
const deuce = {score: 'deuce', player1: 3, player2: 3, isAdvantage: true}
const advPlayer1 = {score: 'adv player 1', player1: 3, player2: 3, isAdvantage: true}
const advPlayer2 = {score: 'adv player 2', player1: 3, player2: 3, isAdvantage: true}

function startNewGame() {

    return loveLove
}

function score(command, gameState) {
    if(gameState.gameOver){
        throw 'Game is Over'
    }
    if (gameState.isAdvantage) {
        const scoreGraph = {
            'deuce': {
                player1Scored: advPlayer1,
                player2Scored: advPlayer2
            },
            'adv player 1': {
                player1Scored: gamePlayer1,
                player2Scored: deuce
            },
            'adv player 2': {
                player1Scored: deuce,
                player2Scored: gamePlayer2
            }
        }
        if (!(gameState.score in scoreGraph)) {
            throw `No commands for score: ${gameState.score}`

        }
        const scoreGraphElement = scoreGraph[gameState.score];
        if (!(command in scoreGraphElement)) {
            throw `invalid command: ${command}, ${gameState.score}`
        }

        return scoreGraphElement[command]

    } else {
        const calculateScore = (player1, player2) => {
            const numberToScore = (num) => {
                if (num === 0) return 'love'
                if (num === 1) return '15'
                if (num === 2) return '30'
                if (num === 3) return '40'
            }
            const lhs = numberToScore(player1)
            const rhs = numberToScore(player2)

            return lhs + "-" + rhs
        }

        const buildPlayerScores = (command, state) => {
            if (command === player1Scored) {
                if (gameState.player1 === 3) {
                    return gamePlayer1
                }
                return {
                    player1: gameState.player1 + 1,
                    player2: gameState.player2
                }
            } else {
                if (gameState.player2 === 3) {
                    return gamePlayer2
                }

                return {
                    player1: gameState.player1,
                    player2: gameState.player2 + 1
                }
            }
        }

        const newState = buildPlayerScores(command, gameState)

        if(!newState.gameOver){
            newState.isAdvantage = newState.player1 >= 3 && newState.player2 >= 3
            if (newState.isAdvantage) {
                newState.score = 'deuce'
            } else {
                newState.score = calculateScore(newState.player1, newState.player2)
            }
        }

        return newState
    }

}

function toConsole(gameResult) {
    return gameResult.score
}

describe('given a new game', () => {

    const newGame = startNewGame()

    test('when player 1 scores then score is 15 love', () => {
        const gameResult = score(commands.player1Scored, newGame)
        expect(toConsole(gameResult)).toEqual('15-love')
    })

    test('when player 2 scores then score is  love 15', () => {
        const gameResult = score(commands.player2Scored, newGame)
        expect(toConsole(gameResult)).toEqual('love-15')
    })

    describe('given 15-love when ', () => {
        test('player 1 scores then 30-love', () => {
            const gameResult = score(commands.player1Scored, fifteenLove)
            // expect(gameResult).toEqual({})
            expect(toConsole(gameResult)).toEqual('30-love')
        })
        test('player 2 scores then 15-15', () => {
            const gameResult = score(commands.player2Scored, fifteenLove)
            expect(toConsole(gameResult)).toEqual('15-15')
        })
    })
    describe('given love-15 when ', () => {
        test('player 1 scores then 15-15', () => {
            const gameResult = score(commands.player1Scored, loveFifteen)
            expect(toConsole(gameResult)).toEqual('15-15')
        })
        test('player 2 scores then love-30', () => {
            const gameResult = score(commands.player2Scored, loveFifteen)
            expect(toConsole(gameResult)).toEqual('love-30')
        })
    })

    describe('given 30-love when ', () => {
        test('player 1 scores then 40-love', () => {
            const gameResult = score(commands.player1Scored, thirtyLove)
            expect(toConsole(gameResult)).toEqual('40-love')
        })
        test('player 2 scores then 30-15', () => {
            const gameResult = score(commands.player2Scored, thirtyLove)
            expect(toConsole(gameResult)).toEqual('30-15')
        })
    })

    describe('given love-30 when ', () => {
        test('player 1 scores then 15-30', () => {
            const gameResult = score(commands.player1Scored, loveThirty)
            expect(toConsole(gameResult)).toEqual('15-30')
        })
        test('player 2 scores then love-40', () => {
            const gameResult = score(commands.player2Scored, loveThirty)
            expect(toConsole(gameResult)).toEqual('love-40')
        })
    })

    describe('given 40love when ', () => {
        test('player 1 scores then "game player 1"', () => {
            const gameResult = score(commands.player1Scored, fortyLove)
            expect(toConsole(gameResult)).toEqual('game player 1')
        })
        test('player 2 scores then 40-15', () => {
            const gameResult = score(commands.player2Scored, fortyLove)
            expect(toConsole(gameResult)).toEqual('40-15')
        })
    })

    describe('given 40-30 when ', () => {
        test('player 1 scores then "game player 1"', () => {
            const gameResult = score(commands.player1Scored, fortyThirty)
            expect(toConsole(gameResult)).toEqual('game player 1')
        })
        test('player 2 scores then deuce', () => {
            const gameResult = score(commands.player2Scored, fortyThirty)
            expect(toConsole(gameResult)).toEqual('deuce')
        })
    })

    describe('given deuce when ', () => {
        test('player 1 scores then "adv player 1"', () => {
            const gameResult = score(commands.player1Scored, deuce)
            expect(toConsole(gameResult)).toEqual('adv player 1')
        })
        test('player 2 scores then "adv player 2"', () => {
            const gameResult = score(commands.player2Scored, deuce)
            expect(toConsole(gameResult)).toEqual('adv player 2')
        })
    })

    describe('given adv player 1when ', () => {
        test('player 1 scores then "game player 1"', () => {
            const gameResult = score(commands.player1Scored, advPlayer1)
            expect(toConsole(gameResult)).toEqual('game player 1')
        })
        test('player 2 scores then deuce', () => {
            const gameResult = score(commands.player2Scored, advPlayer1)
            expect(toConsole(gameResult)).toEqual('deuce')
        })
    })

    describe('given adv player 2 when ', () => {
        test('player 1 scores then deuce', () => {
            const gameResult = score(commands.player1Scored, advPlayer2)
            expect(toConsole(gameResult)).toEqual('deuce')
        })
        test('player 2 scores then game player 2', () => {
            const gameResult = score(commands.player2Scored, advPlayer2)
            expect(toConsole(gameResult)).toEqual('game player 2')
        })
    })


    describe('given game player 1 when ', () => {
        test('player 1 scores then invalid command exception', () => {
            expect(() => score(commands.player1Scored, gamePlayer1)).toThrow('Game is Over')
        })
        test('player 2 scores then invalid command exception', () => {
            expect(() => score(commands.player2Scored, gamePlayer1)).toThrow('Game is Over')
        })
    })
})

