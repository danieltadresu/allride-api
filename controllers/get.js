const axios = require('axios');
const geolib = require('geolib');
const moment = require('moment');

const token = '250bd75493c59e8146798e43fff8370893b1bd76052533a7428a4e182eddd8b4fd1eed201dbfdd19491b0595cd9b2acda44fc47fff0f0e28d5fe17c662ace665';

exports.get = async (req, res, next) => {
  try {
    const response = await axios.get('https://stage.allrideapp.com/ext/api/v1/recruiting/points', {
      headers: {"Authorization" : `Bearer ${token}`}
    });

    const result = response.data
      .map((item) => {
        return {
          ...item,
          dif: geolib.getDistance(
            { latitude: item.lat, longitude: item.lon },
            { latitude: -33.437673, longitude: -70.650479 }
          ),
        };
      })
      .sort((a, b) => a.dif - b.dif);

    res.status(200).json({
      DISTRICT_NAME: result,
    });

  } catch (error) {
    console.log(`error`, error);
    res.status(500).json({
      code: 500,
      message: "Something went wrong on the server.",
    });
  }
};