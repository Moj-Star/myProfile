const express = require('express');
const fileUpload = require('express-fileupload')
const router = require('./routes/route');
const app = express();


app.use(express.static('./public'))
app.use(express.urlencoded({ extended: true }))
app.use(router)
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: './temp/'
}))


app.get('', (req, res) => {
    res.render('home')
    res.status(200)
})

app.post('', async (req, res) => {
    if (req.files) {
        let photo = req.files.photo
        let ext = photo.name.split('.').pop()
        let allowed = ['jpg', 'jpeg', 'png']
        if (!allowed.includes(ext))
            return res.redirect('back')
        if (photo.size > 1024 * 1024 * 5)
            return res.redirect('back')
        let filename = `/home/${home.name.replace(/\s+/g, '-')}-${Number(new Date())}.${ext}`
        try {
            await photo.mv(__dirname + `/../uploads${filename}`)
            home.photo = filename
        } catch (error) {
            return res.status(400).send('No files were uploaded')
        }


    }
})

    app.set('view engine', 'ejs')
    app.set('path', './views')

    app.listen(3000, () => {
        console.log('server is listen on http://localhost:3000');
    })