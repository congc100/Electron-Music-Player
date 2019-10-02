// 进度条效果
class Progress {
    constructor() {
        this.timerStart = 0
        this.timerPause = 0
        this.progress = $('.progress')
    }

    initProgress() {
        this.progress.css('width', '0')
    }

    startProgress(control, nextCallback) {
        let song = control.music[control.id]
        readFile(song.audio).then((audio) => {
            let length = 0
            if (this.timerStart === 0) {
                this.timerStart = Date.now()
                length = audio.length / 10
            } else {
                let played = this.timerPause - this.timerStart
                length = audio.length / 10 - played
            }
            this.progress.animate({ width: '100%' }, length, 'linear', nextCallback)
        })
    }

    pauseProgress() {
        this.progress.stop()
        this.timerPause = Date.now()
    }

    stopProgress() {
        this.progress.stop()
        this.timerStart = 0
        this.timerPause = 0
    }
}