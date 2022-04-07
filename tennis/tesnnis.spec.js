const NEW_GAME_SCORE = 'love-love'
const player1Scored = 'player1Scored';
const player2Scored = 'player2Scored';
const commands = {
    player1Scored: player1Scored,
    player2Scored: player2Scored
}

test('when score 0-0 then "love-love"', ()=>{
    expect(toConsole(startNewGame())).toEqual('love-love')
})

function startNewGame() {
    return {score:'love-love'}
}

function score(command, gameState) {
    const scoreGraph = {
        'love-love':{
            player1Scored: {score:'15-love'},
            player2Scored: {score:'love-15'}
        },
        '15-love':{
            player1Scored:{score:'30-love'},
            player2Scored:{score:'15-15'}
        },
        '30-love':{
            player1Scored:{score:'40-love'},
            player2Scored:{score:'30-15'}
        }
    }
    
    return scoreGraph[gameState.score][command]
}

function toConsole(gameResult) {
    return gameResult.score
}

describe('given a new game', ()=>{
    const newGame = startNewGame()

    test('when player 1 scores then score is 15 love', ()=>{
        const gameResult = score(commands.player1Scored, newGame)
        expect(toConsole(gameResult)).toEqual('15-love')
    })

    test('when player 2 scores then score is  love 15', ()=>{
        const gameResult = score(commands.player2Scored, newGame)
        expect(toConsole(gameResult)).toEqual('love-15')
    })

    describe('given 15-love when ', ()=>{
        const fifteenLove = score(commands.player1Scored, newGame)
        test('player 1 scores then 30-love', ()=>{
            const gameResult = score(commands.player1Scored, fifteenLove)
            expect(toConsole(gameResult)).toEqual('30-love')
        })
        test('player 2 scores then 15-15', ()=>{
            const gameResult = score(commands.player2Scored, fifteenLove)
            expect(toConsole(gameResult)).toEqual('15-15')
        })

        describe('given 30-love when ', ()=>{
            const thirtyLove = score(commands.player1Scored, fifteenLove)
            test('player 1 scores then 40-love', ()=>{
                const gameResult = score(commands.player1Scored, thirtyLove)
                expect(toConsole(gameResult)).toEqual('40-love')
            })
            test('player 2 scores then 30-15', ()=>{
                const gameResult = score(commands.player2Scored, thirtyLove)
                expect(toConsole(gameResult)).toEqual('30-15')
            })
        })
    })
})

