"use strict";

const express = require('express');
const router = express.Router();
const { verifyAuth } = require("../../utils/verifyAuth");
const ctrl = require("./user.ctrl");

router.get("/", ctrl.view.home);
router.get("/login", ctrl.view.login);
router.get("/signup", ctrl.view.signup);

// JWT 토큰 설정을 위한 endpoint 동민님 나중에 편하신 곳으로 이동 부탁드립니다 
router.post("/user", ctrl.api.user)
router.post('/logout', ctrl.api.logout)
router.post("/login", ctrl.api.login);
router.post("/signup", ctrl.api.signup);
router.post("/verifyauth", verifyAuth);

module.exports = router;
