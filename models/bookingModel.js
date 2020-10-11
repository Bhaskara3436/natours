const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  tour: {
    type: mongoose.Schema.ObjectId,
    reference: 'Tour',
    required: [true, 'Booking must belong to a tour!']
  },
  user: {
    type: mongoose.Schema.ObjectId,
    reference: 'User',
    required: [true, 'Booking must belong to a user!']
  },
  price: {
    type: Number,
    required: [true, 'Booking must have a price!']
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  paid: {
    type: Boolean,
    default: true
  }
});

// A small bug to fix
// bookingSchema.pre(/^find/, function(next) {
//   const a = this.populate('user');
//   console.log(a);
//   next();
// });

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
