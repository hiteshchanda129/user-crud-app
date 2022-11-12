const router = require('express').Router()
const User = require('../config/models/User')

// Add user
router.post('/form', async (req, res) => {
    let { userName, userMobNo, userEmail, userAdd } = req.body;

    User.find({ userName }).then(async (result) => {
        if (result.length) {
            res.json({
                status: "error",
                error: "userName is already exist"
            })
            console.log("user is already exist")
            return;
        } else {
            try {
                const response = await User.create({
                    userName, userMobNo, userEmail, userAdd
                })
                res.json({ status: "ok" })
                console.log("created successfully", response);
                return;
            }
            catch (err) {
                if (err.code === 11000) {
                    return res.json({ status: "error", error: "duplicate username" })
                    console.log("haha");
                }
            }
        }
    })
    console.log(userName, userMobNo, userEmail, userAdd);
})

// Get all users
router.get('/', async (req, res) => {
    User.find().then(result => {
        res.json({
            userdata: result
        })
    })
})

// Get single user
router.get('/:id', async (req, res) => {
    User.findOne({ _id: req.params.id }).then(result => {
        res.status(200).json({
            userdata: result
        })
    }).catch(e => {
        res.status(404).json({ error: e.message })
    })
})

// Delete single user
router.delete('/:id', (req, res, next) => {
    User.deleteOne({ _id: req.params.id })
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            res.status(500).json({ error: err })
        })
})

// Update single user
router.put("/:id", (req, res, next) => {
    User.findOneAndUpdate({ _id: req.params.id }, {
        $set: {
            userName: req.body.userName,
            userMobNo: req.body.userMobNo,
            userEmail: req.body.userEmail,
            userAdd: req.body.userAdd,
        }
    }, { new: true }).then(result => {
        res.status(200).json(result)
    }).catch(err => {
        res.status(500).json({ error: err })
    })
})

module.exports = router