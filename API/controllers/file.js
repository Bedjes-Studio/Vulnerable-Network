const fs = require("fs");

exports.updateConfig = (req, res, next) => {
    if (req.body.path != "config.json") {
        fs.readFile(__dirname + "/../" + req.body.path, "utf8", (error, data) => {
            if (error) {
                console.error(error);
                res.status(500).json({ error: error });
                return;
            }
            console.log(data);
            res.status(500).json({ error: "File is not a JSON", message: data });
        });
    } else {
        res.status(200).json({ message: "Config updated" });
    }
};
