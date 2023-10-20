const express = require("express");
const cors = require("cors");
require("dotenv").config();

const { sequelize } = require("./config/db");
const { Userroute } = require("./routes/userRoute");
const { Venderroute } = require("./routes/venderRoute");
const { Tockenroute } = require("./routes/tockenRoute");
const { logger } = require("./middleware/logger");
const { errorHandler } = require("./middleware/errorhandler");

const app = express();
const PORT = process.env.PORT || 4000

app.use(express.json());
app.use(logger);
app.use(errorHandler);
app.use(cors({
    origin:"*"
}));

app.get("/",(req,res)=>{
    res.status(200).json({"Gretting" : "Welcome"})
})

app.use("/tocken",Tockenroute);
app.use("/user",Userroute);
app.use("/vender",Venderroute);


// Handle invalid routes
app.use(logger,(req, res) => {
    res.status(404).send({ error: 'Not found' });
});


app.listen(PORT,async()=>{
    try {

        // await client.connect();
        // console.log('Redis:', client.isReady);

        await sequelize;
        console.log("Data base is connected")
    } catch (error) {
        console.log(error.message);
        console.log("Data base is not connected")
    }
    console.log(`server is running over 4000`)
})