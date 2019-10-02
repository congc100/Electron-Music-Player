const show = (control) => {
    let song = control.music[control.id]
    $('.artist').html(song.artist)
    $('.title').html(song.title)
    $('.cover').css('background-image', `url(${song.cover})`)
}

const showHeader = () => {
    let header = $('.header')
    header.addClass('show')
    setTimeout(() => header.removeClass('show'), 2000)
}

const startProgressWithMode = (control) => {
    control.jquery.progress.startProgress(control, () => {
        let mode = control.mode
        if (mode === 'normal') {
            next(control)
        } else if (mode === 'loop') {
            loop(control)
        } else if (mode === 'shuffle') {
            shuffle(control)
        }
    })
}

const play = (control) => {
    show(control)
    showHeader()
    control.jquery.playBox.removeClass('paused').addClass('playing')
    control.jquery.playButton.removeClass('fi-play').addClass('fi-pause')
    startProgressWithMode(control)
    control.player.doPlay()
}

const pause = (control) => {
    control.jquery.playBox.removeClass('playing').addClass('paused')
    control.jquery.playButton.removeClass('fi-pause').addClass('fi-play')
    control.jquery.progress.pauseProgress()
    control.player.doPause()
}

const togglePlay = (control) => {
    let playBox = control.jquery.playBox
    if (playBox.hasClass('playing') && !playBox.hasClass('paused')) {
        pause(control)
    } else {
        play(control)
    }
}

const stop = (control) => {
    control.id = 0
    control.jquery.playBox.removeClass('paused').removeClass('playing')
    control.jquery.playButton.removeClass('fi-pause').addClass('fi-play')
    control.jquery.progress.stopProgress()
    control.jquery.progress.initProgress()
    control.player.doStop()
}

const cutover = (control) => {
    show(control)
    showHeader()
    control.jquery.progress.stopProgress()
    control.jquery.progress.initProgress()
    control.jquery.playBox.removeClass('paused').addClass('playing')
    control.jquery.playButton.removeClass('fi-play').addClass('fi-pause')
    startProgressWithMode(control)
    control.player.changeSrc()
    control.player.doPlay()
}

const nextId = (control) => {
    if (control.id >= control.music.length - 1) {
        control.id = 0
    } else {
        control.id += 1
    }
}

const prevId = (control) => {
    if (control.id <= 0) {
        control.id = control.music.length - 1
    } else {
        control.id -= 1
    }
}

const shuffleId = (control) => {
    let a = Math.random()
    a = a * control.music.length
    let index = Math.floor(a)
    control.id = index
}

const next = (control) => {
    nextId(control)
    cutover(control)
}

const prev = (control) => {
    prevId(control)
    cutover(control)
}

const loop = (control) => {
    cutover(control)
}

const shuffle = (control) => {
    shuffleId(control)
    cutover(control)
}

const bindEvents = (control) => {
    $('.play').click(() => { togglePlay(control) })
    $('.stop').click(() => { stop(control) })
    $('.prev').click(() => { prev(control) })
    $('.next').click(() => { next(control) })

    e('.loop').addEventListener('click', (event) => {
        let self = event.target
        if (!self.classList.contains('active')) {
            // loop 模式和 shuffle 模式不能同时起作用
            let shuffle = e('.shuffle')
            if (shuffle.classList.contains('active')) {
                shuffle.classList.remove('active')
            }
            self.classList.add('active')
            control.mode = 'loop'
        } else {
            self.classList.remove('active')
            control.mode = 'normal'
        }
    })

    e('.shuffle').addEventListener('click', (event) => {
        let self = event.target
        if (!self.classList.contains('active')) {
            // loop 模式和 shuffle 模式不能同时起作用
            let loop = e('.loop')
            if (loop.classList.contains('active')) {
                loop.classList.remove('active')
            }
            self.classList.add('active')
            control.mode = 'shuffle'
        } else {
            self.classList.remove('active')
            control.mode = 'normal'
        }
    })
}

const init = (control) => {
    show(control)
    setTimeout(() => {
        showHeader()
        play(control)
    }, 1000)
}

const __main = function() {
    let jquery = {
        player: $('#id-audio-player'),
        playButton: $('.controls .play'),
        playBox: $('.player'),
        progress: new Progress(),
    }
    let control = {
        jquery: jquery,
        mode: 'normal',
        id: 0,
    }
    bindEvents(control)
    loadAudio().then(() => {
        loadInfo().then((musicInfo) => {
            control.player = new Player(control)
            control.music = musicInfo
            init(control)
        })
    })
}

__main()