const User = require("../models/User");
const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const Cookies = require("universal-cookie");
dotenv.config();

//update user
router.put("/:id",  async (req, res) => {
    //currentpass gircek , kontorl yapılacak , öyle yollanacak dbye
    // if(req.body.userId === req.params.id){
    console.log(req.body.password);
    if (req.body.password) {
        try {
            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password, salt);
        } catch (err) {
            return res.status(500).json(err);
        }
    }
    try {
        const user = await User.findByIdAndUpdate(req.params.id, {
            $set: req.body,
        });
        return res.status(200).json("User Updated!");
    } catch (err) {
        return res.status(500).json(err);
    }
});

router.post("/kuryeUpdate/:id", async (req, res) => {
    try {
        const kurye = await User.findOne({
            _id: req.params.id
        });
        let kuryeTemp = kurye;
        kuryeTemp.geoLocation = req.body.geoLocation;

        const userUpdate = await User.findByIdAndUpdate(req.params.id, {
            $set: kuryeTemp,
        });

        res.status(200).json(userUpdate);
    } catch (err) {
        return res.status(500).json(err);
    }
});


router.post("/belge/:id", async (req, res) => {
    // 0 -> yollamadı
    // 1 -> yolladı 
    // 2-> onaylandı
    // 3 -> reddedildi
    try {
        const kisi = await User.findOne({
            _id: req.params.id
        });
        let kisiTemp = kisi;
        kisiTemp.belge = req.body.belgeImage;
        kisiTemp.status = 1;

        const userUpdate = await User.findByIdAndUpdate(req.params.id, {
            $set: kisiTemp,
        });

        res.status(200).json(userUpdate);
    } catch (err) {
        return res.status(500).json(err);
    }
});


router.get("/getUser/:id",  async (req, res) => {
    try {
        const kisi = await User.findOne({
            _id: req.params.id
        });
        res.status(200).json(kisi);
    } catch (err) {
        return res.status(500).json(err);
    }
});


router.get("/belgeOnayi",  async (req, res) => {
    try {
        const kisi = await User.find({user_role:1, status:"1"
        });
        res.status(200).json(kisi);
    } catch (err) {
        return res.status(500).json(err);
    }
});

router.get("/uyelikOnayi",  async (req, res) => {
    try {
        const kisi = await User.find({status:"0"
        });
        res.status(200).json(kisi);
    } catch (err) {
        return res.status(500).json(err);
    }
});




router.post("/uyeOnayla/:id", async (req, res) => {
    try {
        const uye = await User.findOne({
            _id: req.params.id
        });
        let uyeTemp = uye;
        uyeTemp.status = "1";

        const userUpdate = await User.findByIdAndUpdate(req.params.id, {
            $set: uyeTemp,
        });

        res.status(200).json(userUpdate);
    } catch (err) {
        return res.status(500).json(err);
    }
});

router.delete("/uyeDelete/:id", async (req, res) => {
    try {
        const uye = await User.findByIdAndDelete({
            _id: req.params.id
        });

        res.status(200).json("silindi");
    } catch (err) {
        return res.status(500).json(err);
    }
});


router.post("/belgeOnayla/:id", async (req, res) => {
    try {
        const uye = await User.findOne({
            _id: req.params.id
        });
        let uyeTemp = uye;
        uyeTemp.status = "2";

        const userUpdate = await User.findByIdAndUpdate(req.params.id, {
            $set: uyeTemp,
        });

        res.status(200).json(userUpdate);
    } catch (err) {
        return res.status(500).json(err);
    }
});

router.post("/belgeReddet/:id", async (req, res) => {
    try {
        const uye = await User.findOne({
            _id: req.params.id
        });
        let uyeTemp = uye;
        uyeTemp.status = "3";

        const userUpdate = await User.findByIdAndUpdate(req.params.id, {
            $set: uyeTemp,
        });

        res.status(200).json(userUpdate);
    } catch (err) {
        return res.status(500).json(err);
    }
});
module.exports = router;