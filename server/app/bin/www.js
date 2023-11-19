"use strict";

const dotenv = require("dotenv");
dotenv.config({ path: '../../.env' });
const app = require("../app");
const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
