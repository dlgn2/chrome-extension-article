const User = require("../models/User");
const Partner = require("../models/Partner")
const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const Cookies = require("universal-cookie");
dotenv.config();

//update user
router.post('/ekle', async (req, res) => {
    console.log(req.body)

    try {

        const newHelp = await new Help({
            yardim_isteyen: req.body.yardim_isteyen,
            yardim_turu: req.body.yardim_turu,
            yardim_miktari: req.body.yardim_miktari,
            yardim_veren:req.body.yardim_veren,
            kurye:req.body.kurye,
            yardim_adres:req.body.yardim_adres,
            status:req.body.status,

        });
        const help = await newHelp.save();

        return res.status(200).json(help);
    } catch (err) {
        console.log(err)
        return res.status(404).json(err);
    }
});

router.get("/check/:id",  async (req, res) => {
    try {
        const help = await Help.findOne({
            yardim_isteyen: req.params.id
        });
        res.status(200).json(help);
    } catch (err) {
        return res.status(500).json(err);
    }
});

router.get("/yardimlar",  async (req, res) => {
    try {
        const help= await Help.find().populate('yardim_isteyen').populate('yardim_veren').populate('kurye')
        .exec(function(err, details) {
            if(err){return handleError(err)}
            
           return res.status(200).json(details)
        });
    } catch (err) {
        return res.status(500).json(err);
    }
});

router.post("/yardimFonlandi/:id",  async (req, res) => {
    try {
        const help = await Help.findOne({
            _id: req.params.id
        });
         
        let helpTemp = help;
        helpTemp.yardim_veren = [`${req.body.yardim_veren}`];
        helpTemp.status = 2;

        const helpUpdate = await Help.findByIdAndUpdate(req.params.id, {
            $set: helpTemp,
        });

        res.status(200).json(helpTemp);
    } catch (err) {
        return res.status(500).json(err);
    }
});


router.post("/ulastir/:id",  async (req, res) => {
    try {
        const help = await Help.findOne({
            _id: req.params.id
        });
         
        let helpTemp = help;
        helpTemp.kurye = [`${req.body.kurye}`];
        helpTemp.status = 3;

        const helpUpdate = await Help.findByIdAndUpdate(req.params.id, {
            $set: helpTemp,
        });

        res.status(200).json(helpTemp);
    } catch (err) {
        return res.status(500).json(err);
    }
});

router.post("/ulastirdim/:id",  async (req, res) => {
    try {
        const help = await Help.findOne({
            _id: req.params.id
        });
         
        let helpTemp = help;
        helpTemp.status = 4;
        const helpUpdate = await Help.findByIdAndUpdate(req.params.id, {
            $set: helpTemp,
        });

        res.status(200).json(helpTemp);
    } catch (err) {
        return res.status(500).json(err);
    }
});

router.post("/kuryeYardimlar",  async (req, res) => {
    try {
        const help = await Help.findOne({
            _id: req.params.id
        });
         
        let helpTemp = help;
        helpTemp.yardim_veren = [`${req.body.yardim_veren}`];
        helpTemp.status = 2;

        const helpUpdate = await Help.findByIdAndUpdate(req.params.id, {
            $set: helpTemp,
        });

        res.status(200).json(helpTemp);
    } catch (err) {
        return res.status(500).json(err);
    }
});


router.post("/yardimOnayla/:id",  async (req, res) => {
    try {
        const help = await Help.findOne({
            _id: req.params.id
        });
    
        let helpTemp = help;
        helpTemp.status = 5;

        const helpUpdate = await Help.findByIdAndUpdate(helpTemp._id, {
            $set: helpTemp,
        });

        res.status(200).json(helpTemp);
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

router.get("/yardimOnay", async (req, res) => {
    try {
        const yardim = await Help.find({status:0
        });
        console.log(yardim)
        res.status(200).json(yardim);
    } catch (err) {
        return res.status(500).json(err);
    }
});


router.post("/yardimOnaylaT/:id", async (req, res) => {
    try {
        const yardim = await Help.findOne({
            _id: req.params.id
        });
        console.log("yardim ilk basta",yardim)
        let yardimTemp = yardim;
        yardimTemp.status = 1;
console.log("yardimTemp",yardimTemp)
        const yardimUpdate = await Help.findByIdAndUpdate(req.params.id, {
            $set: yardimTemp,
        });

        res.status(200).json(yardimUpdate);
    } catch (err) {
        return res.status(500).json(err);
    }
});

router.delete("/yardimDeleteT/:id", async (req, res) => {
    try {
        const yardim = await Help.findByIdAndDelete({
            _id: req.params.id
        });

        res.status(200).json("silindi");
    } catch (err) {
        return res.status(500).json(err);
    }
});



module.exports = router;