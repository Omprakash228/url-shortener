const express = require('express');
const router = new express.Router();
const Urls = require('../models/urlEntity');
const getValidId = require('../helpers/shortener');

router.post("/process", async (req, res) => {
    const userReqString = req.body.shortUrl;

    if (userReqString) {
        const match = await Urls.where({_shortUrl: userReqString});
        if (match.length > 0) {
            return res.status(409).send({
                message: "Url already taken!"
            });
        } else {
            const newUrl = new Urls({
                fullUrl: req.body.fullUrl,
                _shortUrl: req.body.shortUrl
            });

            Urls.insertMany(newUrl, (error) => {
                if (error) {
                    return res.status(500).send({
                        message: "Server Error. Please try again"
                    });
                } else {
                    return res.status(200).send({
                        message: "Success"
                    });
                }
            });
        }
    } else {
        const newUrl = new Urls({
            fullUrl: req.body.fullUrl,
            _shortUrl: getValidId()
        });

        Urls.insertMany(newUrl, (error) => {
            if (error) {
                return res.status(500).send({
                    message: "Server Error. Please try again"
                });
            } else {
                return res.status(200).send({
                    message: "Success"
                })
            }
        })
    }
});

router.get("/redirect/:shorturl", async(req, res) => {
    const shortUrl = req.params.shorturl;

    await Urls.findOne((error, result) => {
        if(error){
            return res.status(500).send({ message: "Invalid Url" });
        }
        else {
            Urls.findOneAndUpdate({ _shortUrl: shortUrl }, {$inc:{count: 1}},{new:true}, (updateError, updateResult) => {
                if(updateError){
                    return res.status(500).send({ message: "Update Failed" });
                } else {
                    const fullUrl = result ? result.fullUrl: "";
                    return res.status(200).send({ message: fullUrl });
                }
            });
        }

    }).where({ _shortUrl: shortUrl });
});

module.exports = router;

