const mongoose = require("mongoose");

const stripeCheckoutSessionSchema = new Schema({
  id: String,
  object: String,
  after_expiration: { type: Schema.Types.Mixed, default: null },
  allow_promotion_codes: { type: Schema.Types.Mixed, default: null },
  amount_subtotal: Number,
  amount_total: Number,
  automatic_tax: { type: Schema.Types.Mixed, default: {} }, // Assuming an object structure, adjust as necessary
  billing_address_collection: { type: Schema.Types.Mixed, default: null },
  cancel_url: String,
  client_reference_id: { type: Schema.Types.Mixed, default: null },
  client_secret: String,
  consent: { type: Schema.Types.Mixed, default: null },
  consent_collection: { type: Schema.Types.Mixed, default: null },
  created: Number,
  currency: String,
  currency_conversion: { type: Schema.Types.Mixed, default: null },
  // Add other fields as necessary...
  customer: String,
  customer_email: String,
  expires_at: Number,
  invoice: String,
  line_items: { type: Schema.Types.Mixed, default: {} }, // Assuming an object structure, adjust as necessary
  livemode: Boolean,
  mode: String,
  payment_status: String,
  subscription: String,
  success_url: String,
  total_details: { type: Schema.Types.Mixed, default: {} } // Assuming an object structure, adjust as necessary
}, { _id: false }); // Prevents Mongoose from creating an _id for this subdocument


const userSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId },
  name: { type: String },
  email: { type: String },
  image: { type: String },
  authType: { type: String },
  password: { type: String },
  emailVerified: { type: Date },
  createdAt: { type: Date },
  updatedAt: { type: Date },
  inviteCodeId: { type: mongoose.Schema.Types.ObjectId },
  tokens: { type: Number },
  role: { type: String },
  stripeCheckoutSession: stripeCheckoutSessionSchema,
  desc: {
    identity: { type: String },
    proficiency: { type: String },
    content: { type: String },
  },
  renewTokens: { type: Date },
  cancelled: { type: Date },
  audiosLiked: { type: Number },
  preferences: {
    privatePrompts: { type: Boolean },
  },
  notifications: [
    {
      notificationId: { type: mongoose.Schema.Types.ObjectId },
      read: { type: Boolean },
      new: { type: Boolean },
      _id: { type: mongoose.Schema.Types.ObjectId },
    },
  ],
  onboarding: {
    studioTourViewed: { type: Boolean },
  },
  appsumo_user: { type: Boolean },
  additionalTokens: { type: Number },
});

const User = mongoose.model("User", userSchema, "users");

module.exports = User;
