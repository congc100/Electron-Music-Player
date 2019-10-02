const templateAudio = (audio) => {
    let t = `<li class="song" data-href="${audio}">${audio}</li>`
    return t
}

const insertAudio = (audio) => {
    let container = e('#id-ul-song-list')
    let html = templateAudio(audio)
    appendHtml(container, html)
}

const insertAudios = (audios) => {
    for (let a of audios) {
        insertAudio(a)
    }
}

const loadAudio = () => {
    let p = readdir('audios').then((files) => {
        // files 是 audios 目录下的文件
        // 从这些文件中筛选以 .mp3 结尾的文件, 也就是 mp3 文件
        let audios = files.filter((e) => e.endsWith('.mp3'))
        insertAudios(audios)
    })
    return p
}

const loadInfo = function() {
    let p = readFile('static/audios.json').then((data) => {
        let musicInfo = JSON.parse(data.toString())
        return musicInfo
    })
    return p
}