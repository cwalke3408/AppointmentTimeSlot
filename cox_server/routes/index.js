var express = require('express');
var router = express.Router();

let timeSlots = [];
for(let i=9; i <= 18; i++) {
  if(i <= 11) {
    timeSlots.push({
      time: (i % 13) +':00 am',
      name: '',
      phone: ''
    }) 
  } else if(i === 12 || i > 13) {
    timeSlots.push({
      time: (i % 13) +':00 pm',
      name: '',
      phone: ''
    })
  }
}


router.get('/allTimeSlots', function (req, res, next) {
  res.json({slots: timeSlots});
});

router.get('/specificSlotInfo/:time', function(req, res, next) {
  timeSlots.filter(timeObj => {
    if(timeObj.time === req.params.time) {
      res.json(timeObj);
    }
  })
});

router.post('/timeSubmit', function (req, res, next) {

  let timeSlot = req.body.time;
  timeSlots.filter(obj => {
    if(obj.time === timeSlot) {
      obj.name = req.body.name;
      obj.phone = req.body.phone;
    }
  })

  res.end("Time slot saved!");
});

module.exports = router;
