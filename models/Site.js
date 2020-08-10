const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SiteSchema = new Schema({
  home: {
    featured: {
      required: true,
      type: Array,
      default: []
    }
  },
  siteFooterInfo: [
    {
      aboutTitle: {
        type: String,
        required: true
      },
      livestreamLink: {
        type: String,
        required: true
      },
      aboutReonLink: {
        type: String,
        required: true
      },
      usefulLinkTitle: {
        type: String,
        required: true
      },
      rhapsodyLink: {
        type: String,
        required: true
      },
      prayerNetworkLink: {
        type: String,
        required: true
      },
      ambassadorNetworkLink: {
        type: String,
        required: true
      },
      aboutTheAuthorLink: {
        type: String,
        required: true
      },
      contactUsTitle: {
        type: String,
        required: true
      },
      unitedStateLink: {
        type: String,
        required: true
      },
      unitedKingdomLink: {
        type: String,
        required: true
      },
      nigeriaLink: {
        type: String,
        required: true
      },
      supportLink: {
        type: String,
        required: true
      },
      followUsTitle: {
        type: String,
        required: true
      },
      kingschatLink: {
        type: String,
        required: true
      },
      facebookLink: {
        type: String,
        required: true
      },
      instagramLink: {
        type: String,
        required: true
      },
      youtubeLink: {
        type: String,
        required: true
      }
    }
  ]
});

module.exports = mongoose.model('Site', SiteSchema);
