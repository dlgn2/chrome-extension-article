const mongoose = require("mongoose");
const { Schema } = mongoose;

const PartnerSchema = Schema(
  {
    url: {
      type: String,
    },

    bannerImage: {
      type: String,
    },

    title: {
      type: String,
    },
    desc: {
      type: String,
    },
    registered_users: { type: [{ type: Schema.Types.ObjectId, ref: "User" }] },
  },

  { timestamps: true }
);

module.exports = mongoose.model("Partner", PartnerSchema);
