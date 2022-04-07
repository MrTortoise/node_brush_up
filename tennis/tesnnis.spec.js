const loveLove = 'love-love';
const player1Scored = 'player1Scored';
const player2Scored = 'player2Scored';
const commands = {
    player1Scored: player1Scored,
    player2Scored: player2Scored
}

test('when score 0-0 then "love-love"', () => {
    expect(toConsole(startNewGame())).toEqual('love-love')
})

function startNewGame() {
    return {score: loveLove}
}

const fifteenLove = {score: '15-love'};
const love15 = {score: 'love-15'};
const thirtyLove = {score: '30-love'};
const fifteenAll = {score: '15-15'};
const fortyLove = {score: '40-love'};
const thirty15 = {score: '30-15'};
const gamePlayer1 = {score: 'game player 1'};
const forty15= {score: '40-15'};

function score(command, gameState) {
    const scoreGraph = {
        'love-love': {
            player1Scored: fifteenLove,
            player2Scored: love15
        },
        '15-love': {
            player1Scored: thirtyLove,
            player2Scored: fifteenAll
        },
        '30-love': {
            player1Scored: fortyLove,
            player2Scored: thirty15
        },
        '40-love': {
            player1Scored: gamePlayer1,
            player2Scored: forty15
        }
    }

    if(!(gameState.score in scoreGraph)){
        throw `No commands for score: ${gameState.score}`
    }

    const scoreGraphElement = scoreGraph[gameState.score];
    if (!(command in scoreGraphElement)) {
        throw `invalid command: ${command}, ${gameState.score}`
    }
    return scoreGraphElement[command]


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
            expect(toConsole(gameResult)).toEqual('30-love')
        })
        test('player 2 scores then 15-15', () => {
            const gameResult = score(commands.player2Scored, fifteenLove)
            expect(toConsole(gameResult)).toEqual('15-15')
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

        describe('given game player 1 when ', () => {
            test('player 1 scores then invalid command exception', () => {
                expect(() => score(commands.player1Scored, gamePlayer1)).toThrow('No commands for score: game player 1')
            })
            test('player 2 scores then invalid command exception', () => {
                expect(() => score(commands.player2Scored, gamePlayer1)).toThrow('No commands for score: game player 1')
            })
        })
    })
})

