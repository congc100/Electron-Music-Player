const log = console.log.bind(console)

const e = (selector) => document.querySelector(selector)

const appendHtml = (element, html) => element.insertAdjacentHTML('beforeend', html)

const fs = require('fs')

const readdir = (path) => {
    let p = new Promise((resolve, reject) => {
        fs.readdir(path, (error, files) => {
            if (error !== null) {
                reject(error)
            } else {
                resolve(files)
            }
        })
    })
    return p
}

const readFile = (path) => {
    let p = new Promise((resolve, reject) => {
        fs.readFile(path, 'utf-8', (error, data) => {
            if (error !== null) {
                reject(error)
            } else {
                resolve(data)
            }
        })
    })
    return p
}