class Player {
    constructor(control) {
        this.player = e('#id-audio-player')
        this.control = control
    }

    changeSrc() {
        let id = this.control.id
        this.player.src = `audios/${id + 1}.mp3`
    }

    doPlay() {
        this.player.play()
    }

    doPause() {
        this.player.pause()
    }

    doStop() {
        this.doPause()
        this.changeSrc()
    }
}