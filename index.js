const express = require("express");
const bodyParser = require('body-parser');
const app = express();
methodOverride = require("method-override");
mongoose = require("mongoose");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());

var router = express.Router();

router.get("/", function (req, res) {
    res.send("Hello World!");
});

let Car = {
    id: 1,
    year: 2019,
    make: "Toyota",
    model: "Camry",
    color: "RED",
    plate: "ABC123",
    vin: "12345ABCDEFG6789"
};
let respuesta = {
    error: false,
    codigo: 200,
    mensaje: ''
};
app.get('/', function (req, res) {
    respuesta = {
        error: true,
        codigo: 200,
        mensaje: 'Punto de inicio'
    };
    res.send(respuesta);
});
app.get('/Car', function (req, res) {
    respuesta = {
        error: false,
        codigo: 200,
        mensaje: ''
    };
    if (Car.make === '' || Car.model === '') {
        respuesta = {
            error: true,
            codigo: 501,
            mensaje: 'El Car no ha sido creado'
        };
    } else {
        respuesta = {
            error: false,
            codigo: 200,
            mensaje: 'respuesta del Car',
            respuesta: Car
        };
    }
    res.send(respuesta);
});
app.post('/Car', function (req, res) {
    if (!req.body.make || !req.body.model) {
        respuesta = {
            error: true,
            codigo: 502,
            mensaje: 'El campo Marca y Modelo son requeridos'
        };
    } else {
        if (Car.make !== '' || Car.model !== '') {
            respuesta = {
                error: true,
                codigo: 503,
                mensaje: 'El Car ya fue creado previamente'
            };
        } else {
            Car = {
                make: req.body.make,
                model: req.body.model
            };
            respuesta = {
                error: false,
                codigo: 200,
                mensaje: 'Car creado',
                respuesta: Car
            };
        }
    }

    res.send(respuesta);
});
app.put('/Car', function (req, res) {
    if (!req.body) {
        respuesta = {
            error: true,
            codigo: 404,
            mensaje: 'Cuerpo incorrecto'
        };
    }
    if (!req.body.make || !req.body.model) {
        respuesta = {
            error: true,
            codigo: 502,
            mensaje: 'El campo marca y modelo son requeridos'
        };
    } else {
        if (Car.mark === '' || Car.model === '') {
            respuesta = {
                error: true,
                codigo: 501,
                mensaje: 'El Car no ha sido creado'
            };
        } else {
            Car = {
                make: req.body.make,
                model: req.body.model
            };
            respuesta = {
                error: false,
                codigo: 200,
                mensaje: 'Car actualizado',
                respuesta: Car
            };
        }
    }

    res.send(respuesta);
});
app.delete('/Car', function (req, res) {
    if (Car.make === '' || Car.model === '') {
        respuesta = {
            error: true,
            codigo: 501,
            mensaje: 'El Car no ha sido creado'
        };
    } else {
        respuesta = {
            error: false,
            codigo: 200,
            mensaje: 'Car eliminado'
        };
        Car = {
            make: '',
            model: ''
        };
    }
    res.send(respuesta);
});
app.use(function (req, res, next) {
    respuesta = {
        error: true,
        codigo: 404,
        mensaje: 'URL no encontrada'
    };
    res.status(404).send(respuesta);
});

exports.addTVShow = function (req, res) {
    console.log("POST");
    console.log(req.body);

    var tvshow = new TVShow({
        title: req.body.title,
        year: req.body.year,
        country: req.body.country,
        poster: req.body.poster,
        seasons: req.body.seasons,
        genre: req.body.genre,
        summary: req.body.summary,
    });

    tvshow.save(function (err, tvshow) {
        if (err) return res.status(500).send(err.message);
        res.status(200).jsonp(tvshow);
    });
};
exports.updateTVShow = function (req, res) {
    TVShow.findById(req.params.id, function (err, tvshow) {
        tvshow.title = req.body.petId;
        tvshow.year = req.body.year;
        tvshow.country = req.body.country;
        tvshow.poster = req.body.poster;
        tvshow.seasons = req.body.seasons;
        tvshow.genre = req.body.genre;
        tvshow.summary = req.body.summary;

        tvshow.save(function (err) {
            if (err) return res.status(500).send(err.message);
            res.status(200).jsonp(tvshow);
        });
    });
};
exports.deleteTVShow = function (req, res) {
    TVShow.findById(req.params.id, function (err, tvshow) {
        tvshow.remove(function (err) {
            if (err) return res.status(500).send(err.message);
            res.status(200).send();
        });
    });
};
app.use(router);
mongoose.connect("mongodb://localhost/tvshows", function (err, res) {
    if (err) {
        console.log("ERROR: connecting to Database. " + err);
    }
    app.listen(3000, function () {
        console.log("Node server running on http://localhost:3000");
    });
});
app.listen(3000, () => {
    console.log("El servidor está inicializado en el puerto 3000");
});