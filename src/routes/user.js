const express = require('express')
const multer = require('multer')
const sharp = require('sharp')

const User = require('../models/user')
const auth = require('../middleware/auth')
const router = new express.Router()



router.post('/users', async (req, res) => {
    const user = new User(req.body)
    try {
        const token = await user.generateAuthToken()
        await user.save()
        res.status(201).send({ user, token })
    }
    catch (e) {
        res.status(400).send()

    }
})

router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.status(200).send({ user, token })

    } catch (e) {
        console.log(e)
        res.status(400).send()
    }
})

router.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => req.token !== token.token)
        await req.user.save()

        res.send()
    } catch (e) {
        res.status(500).send()
    }
})

router.post('/users/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()

        res.send()
    } catch (e) {
        res.status(500).send()
    }
})

router.get('/users/me', auth, async (req, res) => {
    try {
        res.send(req.user)
        // console.log(req.user)
    }
    catch (e) {
        res.status(500).send()
    }
})

router.get('/users/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const user = await User.findById(_id)
        if (!user) {
            return res.status(404).send()
        }

        res.send(user)
    }
    catch (e) {
        res.status(500).send()
    }

})



router.patch('/users/me', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid Updates' })
    }

    try {

        const user = req.user

        updates.forEach((update) => user[update] = req.body[update])

        await user.save()

        // const user = await User.findByIdAndUpdate(req.params.id, req.body, {new : true, runValidators : true, useFindAndModify : false})




        res.send(user)


    } catch (e) {
        res.status(404).send(e)
    }

})

router.delete('/users/me', auth, async (req, res) => {


    try {
        await req.user.remove()

        res.send(user)


    } catch (e) {
        res.status(400).send()
    }
})
const upload = multer({
    
    limits: {
        fileSize : 1000000
    },
    fileFilter(req, file, cb) {
        if(!file.originalname.match(/\.(jpg|png|jpeg)$/)){
            return cb(new Error('Please upload an Image'))
        }
        cb(undefined, true)
    }
})

router.post('/me/avatar', auth ,upload.single('avatar'), async (req, res) => {
    
    const buffer = await sharp(req.file.buffer).resize({width : 250, height : 250}).png().toBuffer()
    req.user.avatar = buffer
    await req.user.save()
    res.send({message : 'Picture Uploaded'})

},(error, req, res, next) => {
    res.status(400).send({error : error.message })
}
)

router.delete('/me/avatar', auth, async (req, res) => {
    req.user.avatar = undefined
    

    await req.user.save()
    res.send({message : 'Picture Deleted'})
})

router.get('/users/:id/avatar', async (req, res) => {
    try {
        const user = await User.findById(req.params.id)

        if (!user || !user.avatar) {
            throw new Error()
        }

        res.set('Content-Type', 'image/jpg')
        res.send(user.avatar)

    } catch (e) {
        res.status(404).send()
    }
})
module.exports = router