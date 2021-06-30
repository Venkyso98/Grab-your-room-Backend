const moment = require("moment");
const roomModel = require("../Models/RoomModel");

exports.registerRoom = async (request, response) => {
  const room = await new roomModel({
    roomCategory: request.body.roomCategory,
    roomPrice: request.body.roomPrice,
    roomImages: request.body.roomImages,
    roomDescription: request.body.roomDescription,
    roomSize: request.body.roomSize,
    maxpersons: request.body.maxpersons,
    extraFacilities: request.body.extraFacilities,
    bookingStart: request.body.bookingStart,
    bookingEnd: request.body.bookingEnd,
  });

  // saves in the mongodb
  room.save();
  try {
    response.status(200).json({ message: "Room Created Successfully!" });
  } catch (error) {
    response.status(400).json({ message: "Something Went Wrong!" });
  }
};

exports.getAllRooms = async (request, response, next) => {
  const checkIn = request.params.checkIn;
  const checkInDate = new Date(checkIn);
  // const checkInDate = moment(new Date(checkIn)).format('YYYY-MM-DD[T00:00:00.000Z]');

  // const checkOutDate = new Date(checkOut);

  // const renderAllRooms = await roomModel.find({
  //   "$and" :[{
  //     "availableFrom": {
  //       "$lte": checkInDate
  //     }
  //   }, {
  //     "availableTo": {
  //       "$gte": checkOutDate
  //     }
  //   }]
  // });

  const renderAllRooms = await roomModel.find({
    $and: [
      {
        bookingStart: {
          $lt: new Date(checkInDate),
        },
      },
      {
        bookingEnd: {
          $lt: new Date(checkInDate),
          // "$gte": checkOutDate
        },
      },
    ],
  });

  console.log("REnder:", renderAllRooms);
  // console.log("CheckIn:", typeof checkIn, "checkOyt:", checkOut);

  // let getResult = await roomModel.find({}, "avaliableFrom avaliableTo", function (err, someValue) {
  //   if (err) return next(err);
  //   // res.send(someValue);
  //   // let parseData = someValue;
  //   // console.log("parseData:", parseData);
  //   // filteredArray.push(...someValue);
  //   return someValue;
  // });

  try {
    response.status(200).json(renderAllRooms);
  } catch (error) {
    console.log("Error:", error);
    response.status(400).json({ message: "Can't fetch Rooms" });
  }
};

exports.getRoomById = async (request, response) => {
  const roomId = request.params.id;
  const roomData = await roomModel.findById(roomId);

  try {
    response.status(200).json(roomData);
  } catch (error) {
    console.log("Error:", error);
    response.status(400).json({ message: "Can't fetch room by provided data" });
  }
};

// update room 
exports.updateRoom = async (request, response) => {
  const roomId = request.params.id;
  const checkIn = request.body.checkIn;
  const checkOut = request.body.checkOut;
  const checkInDate = new Date(checkIn);
  const checkOutDate = new Date(checkOut);

  const roomData = await roomModel
    .findByIdAndUpdate(
      { _id: roomId },

      { $set: { bookingStart: checkInDate, bookingEnd: checkOutDate } }
    )
    .then(() => {
      roomModel.findOne({ _id: roomId }).then((room) => {
        response.send(room);
        console.log("Updated room", room);
      });
    });

  console.log("Rommdata:", roomData);
};
